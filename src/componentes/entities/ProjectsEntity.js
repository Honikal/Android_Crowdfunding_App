import { getDatabase, ref as dbRef, get, push, set, update } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes } from 'firebase/storage';
import { app } from "../../../firebaseConfig.js";


import Proyecto from "../models/Projects.js"

export default class ProyectoEntidad {
    #db;
    #dbRef;

    constructor(){
        this.#db = getDatabase(app);
        this.#dbRef = dbRef(this.#db, "projects");
    }

    //GET Proyecto
    /**
     * Función encargada de retornar todos los objetos en la tabla de Proyectos de la Base de Datos
     * @returns {Promise<Proyecto[]>}                    
     */
    async getProyectos(){
        try {
            const snapshot = await get(this.#dbRef);
            if (snapshot.exists()){
                const proyectosData = snapshot.val();
                const proyectos = Object.keys(proyectosData).map(id => {
                    return {
                        ...proyectosData[id],
                        idProyecto: id
                    }
                })
            }
        } catch (error) {
            console.error("Error desde la capa entidad extrayendo los proyectos del sistema: ", error);
            throw error;
        }
    }

    //ADD Proyecto
    /**
     * Se encarga de recibir los datos del Objeto proyecto y crear uno en el sistema, con base a éstos
     * @async
     * @param {Proyecto} proyecto        Proyecto cuyos datos han sido creados en la página crear proyecto
     * @throws {Error}                   Si existe un error durante la creación del proyecto
    */
    async addProyecto(proyecto){
        try {
            //Creamos el valor de referencia al nuevo nodo de usuario usando push
            const newProyectoRef = push(this.#dbRef) //Generamos una nueva id de proyecto

            await set(newProyectoRef, {
                id_creador: proyecto.getIdCreador,
                nombre: proyecto.getNombre,
                descripcion: proyecto.getDescripcion,
                categoria: proyecto.getCategoria,
                objetivo_financiero: proyecto.getObjetivoFinanciero,
                fondos_recaudados: proyecto.getFondosRecaudados,
                fecha_creacion: proyecto.getFechaCreacion,
                fecha_limite: proyecto.getFechaLimite,
                media: proyecto.getMedia
            });

            return newProyectoRef;
        } catch (error) {
            console.error("Error desde la capa entidad intentando crear el proyecto: ", proyecto);
            throw error;
        }
    }

    async uploadMediaToStorage(idProyecto, media) {
        try {
            const storage = getStorage();

            for (const uri of media) {
                //Creamos referencias únicas por cada archivo basado en proyecto ID y un nombre único
                const response = await fetch(uri);
                const blob = await response.blob();

                const fileName = `${idProyecto}_${new Date().getTime()}`; //Nombre del archivo a guardar
                const storageR = storageRef(storage, `projects/${idProyecto}/${fileName}`);

                //Cargamos la imagen en el Storage de Firebase
                await uploadBytes(storageR, blob);
            }        
        } catch (error) {
            console.error("Error desde la capa entidad guardando las imágenes en storage: ", error);
            throw error;
        }
    }

    //EDIT Proyecto
    /**
     * Función encargada de aplicar cambios en el sistema al proyecto
     * @async
     * @param {string} idProyecto            - ID del proyecto a modificar
     * @param {data}   datosActualizar       - Struct con distintos datos del objeto a modificar
     * @returns {void} No retorna nada, nada más aplica los cambios e imprime un console.log() verificando los cambios
     */
    async editProyecto(idProyecto, datosActualizar){
        try {
            const proyectoRef = dbRef(this.#db, `projects/${idProyecto}`);
            await update(proyectoRef, datosActualizar);
            console.log("Confirmación capa entidad de actualización del proyecto");
        } catch (error) {
            console.error("Error desde la capa entidad intentando modificar el proyecto: ", error);
            throw error;
        }
    }


}

