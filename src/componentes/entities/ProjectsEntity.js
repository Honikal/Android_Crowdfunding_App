import { getDatabase, ref, get, push, set, update } from 'firebase/database';
import app from "../../../firebaseConfig.js";

import Proyecto from "../models/Projects.js"

export default class ProyectoEntidad {
    #db;
    #dbRef;

    constructor(){
        this.#db = getDatabase(app);
        this.#dbRef = ref(this.#db, "projects");
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
                objetivo_financiero: proyecto.getObjetivoFinanciero,
                fondos_recaudados: proyecto.getFondosRecaudados,
                fecha_limite: proyecto.getFechaLimite,
                media: proyecto.getMedia
            });
        } catch (error) {
            console.error("Error desde la capa entidad intentando crear el proyecto: ", proyecto);
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
            const proyectoRef = ref(this.#db, `projects/${idProyecto}`);
            await update(proyectoRef, datosActualizar);
            console.log("Confirmación capa entidad de actualización del proyecto");
        } catch (error) {
            console.error("Error desde la capa entidad intentando modificar el proyecto: ", error);
            throw error;
        }
    }


}

