import { getDatabase, ref as dbRef, get, push, set, update } from 'firebase/database';
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from 'firebase/storage';
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
                return proyectos;
            } else {
                return [];
            }
        } catch (error) {
            console.error("Error desde la capa entidad extrayendo los proyectos del sistema: ", error);
            throw error;
        }
    }

    /**
     * Función encargada de retornar todos los proyectos de la tabla, que estén conectados con el idUsuario
     * @param {String} idUsuario
     * @returns {Promise<Proyecto[]>}                    
     */
    async getProyectosByIdUsuario(idUsuario){
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

                //Checamos que el usuario esté en la lista de colaboradores
                const proyectos_usuario = proyectos.filter(proj => proj.id_creador === idUsuario);
                return proyectos_usuario
            } else {
                return [];
            }
        } catch (error) {
            console.error("Error desde la capa entidad extrayendo los proyectos del sistema: ", error);
            throw error;
        }
    }

    /**
     * Función encargada de retornar la información de un proyecto específico como tal
     * @async
     * @param {String} idProyecto    - Id del presunto proyecto a buscar 
     * @returns {Promise<Usuario>}   - Retorna true si encuentra un usuario con ese correo, sino, no retorna false
     */
    async getProyectoByID(idProyecto) {
        //Buscamos directamente en el punto de referencia
        try {
            const proyectoRef = dbRef(this.#db, `projects/${idProyecto}`);

            //Buscamos la posibilidad de dicha ruta
            const snapshot = await get(proyectoRef);

            if (snapshot.exists()){
                proyecto = snapshot.val();
                console.log("proyecto encontrado y extraído al sistema");
                return proyecto;
            } else {
                console.error("Error al encontrar al usuario");
                throw new Error(`No existe el usuario en el sistema, problemas internos desconocidos`);
            }
        } catch (error) {
            console.error("Error desde la capa entidad encontrando el proyecto a modificar: ", error);
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
                fecha_limite: proyecto.getFechaLimite
            });

            return newProyectoRef.key;
        } catch (error) {
            console.error("Error desde la capa entidad intentando crear el proyecto: ", proyecto);
            throw error;
        }
    }

    async uploadMediaToStorage(idProyecto, media) {
        try {
            const storage = getStorage();
            const mediaUrls = []; //Guardamos las URLS de archivos media

            console.log("Data from idProyecto: ", idProyecto);

            for (const uri of media) {
                //Creamos referencias únicas por cada archivo basado en proyecto ID y un nombre único
                const response = await fetch(uri);
                const blob = await response.blob();

                const fileName = `${idProyecto}_${new Date().getTime()}`; //Nombre del archivo a guardar
                const storageR = storageRef(storage, `projects/${idProyecto}/${fileName}`);

                //Cargamos la imagen en el Storage de Firebase
                await uploadBytes(storageR, blob);

                //Tomamos los URL de descarga del archivo subido
                const downloadURL = await getDownloadURL(storageR);
                mediaUrls.push(downloadURL);
            }        

            //Guardamos los archivos de media o las URL en nuestro Realtime Database
            console.log("Data from idProyecto again before pushing to db: ", idProyecto);

            const proyectoRef = dbRef(this.#db, `projects/${idProyecto}/media`);
            await set(proyectoRef, mediaUrls); //Guardamos las url dentro de la base de datos de firebase
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

    /**
     * Función encargada de aplicar formato de base de datos a proyecto clase
     * @async
     * @param {Object} proyectoData           - Objeto de usuario extraído del sistema
     * @returns {Proyecto}                    - Retorna la clase usuario como tal
     */
    createProyectoFromData ( proyectoData ){
        //Extraemos la data de la base de datos como tal
        const { idProyecto, id_creador, nombre, descripcion, categoria, objetivo_financiero, fondos_recaudados,
            fecha_creacion, fecha_limite, media } = proyectoData;

        const proyecto = new Proyecto(idProyecto, id_creador, nombre, descripcion, categoria, objetivo_financiero,
            fondos_recaudados, fecha_creacion, fecha_limite, media);

        return proyecto;
    }

}

