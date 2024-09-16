import { getDatabase, ref, get, push, set, update } from 'firebase/database';
import { app } from "../../../firebaseConfig.js";

import Donacion from '../models/Donations.js';

export default class DonacionEntidad {
    #db;
    #dbRef;

    constructor(){
        this.#db = getDatabase(app);
        this.#dbRef = ref(this.#db, "donations");
    }

    //GET Proyecto
    /**
     * Función encargada de retornar todos los objetos en la tabla de Donaciones de la Base de Datos
     * @returns {Promise<Donacion[]>}                    
     */
    async getDonations(){
        try {
            const snapshot = await get(this.#dbRef);
            if (snapshot.exists()){
                const donacionData = snapshot.val();
                const donaciones = Object.keys(donacionData).map(id => {
                    return {
                        ...donacionData[id],
                        idDonacion: id
                    }
                })
                return donaciones;
            } else {
                return [];
            }
        } catch (error) {
            console.error("Error desde la capa entidad extrayendo las donaciones del sistema: ", error);
            throw error;
        }
    }

    /**
     * Función encargada de retornar todas las donaciones de la tabla que hayan sido hechas por el idUsuario
     * @param {String} idUsuario
     * @returns {Promise<Donacion[]>}                    
     */
    async getDonacionesByIdUsuario(idUsuario){
        try {
            const snapshot = await get(this.#dbRef);
            if (snapshot.exists()){
                const donacionData = snapshot.val();
                const donaciones = Object.keys(donacionData).map(id => {
                    return {
                        ...donacionData[id],
                        idDonacion: id
                    }
                })

                //Checamos que el usuario haya sido el encargado de realizar la donación
                const donaciones_usuario = donaciones.filter(donat => donat.getIdDonador === idUsuario);
                return donaciones_usuario
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
     * @param {String} idProyecto
     * @returns {Promise<Donacion[]>}                    
    */
    async getDonacionesToIdProyecto(idProyecto){
        try {
            const snapshot = await get(this.#dbRef);
            if (snapshot.exists()){
                const donacionData = snapshot.val();
                const donaciones = Object.keys(donacionData).map(id => {
                    return {
                        ...donacionData[id],
                        idDonacion: id
                    }
                })

                //Checamos que el usuario haya sido el encargado de realizar la donación
                const donaciones_proyecto = donaciones.filter(donat => donat.getIdProyectoBeneficiado === idProyecto);
                return donaciones_proyecto
            } else {
                return [];
            }
        } catch (error) {
            console.error("Error desde la capa entidad extrayendo los proyectos del sistema: ", error);
            throw error;
        }
    }

    //ADD Donación
    /**
     * Se encarga de recibir los datos del Objeto proyecto y crear uno en el sistema, con base a éstos
     * @async
     * @param {Donacion} donacion        Donacion cuyos datos han sido creados en la página Donate
     * @throws {Error}                   Si existe un error durante la creación del proyecto
    */
    async addDonacion(donacion){
        try {
            //Creamos el valor de referencia al nuevo nodo de usuario usando push
            const newProyectoRef = push(this.#dbRef) //Generamos una nueva id de proyecto

            await set(newProyectoRef, {
                id_donador: donacion.getIdDonador,
                id_proyecto_beneficiado: donacion.getIdProyectoBeneficiado,
                monto: donacion.getMonto,
                fecha_donacion: donacion.getFechaDonacion,
            });
        } catch (error) {
            console.error("Error desde la capa entidad intentando crear el proyecto: ", proyecto);
            throw error;
        }
    }

    //EDIT Donacion
    /**
     * Función encargada de aplicar cambios en el sistema a una donación
     * @async
     * @param {string} idDonacion            - ID del proyecto a modificar
     * @param {data}   datosActualizar       - Struct con distintos datos del objeto a modificar
     * @returns {void} No retorna nada, nada más aplica los cambios e imprime un console.log() verificando los cambios
     */
    async editDonacion(idDonacion, datosActualizar){
        try {
            const donacionRef = ref(this.#db, `projects/${idDonacion}`);
            await update(donacionRef, datosActualizar);
            console.log("Confirmación capa entidad de actualización del proyecto");
        } catch (error) {
            console.error("Error desde la capa entidad intentando modificar el proyecto: ", error);
            throw error;
        }
    }

    /**
     * Función encargada de aplicar formato de base de datos a la clase donación
     * @async
     * @param {Object} donacionData           - Objeto de usuario extraído del sistema
     * @returns {Donacion}                    - Retorna la clase usuario como tal
     */
    createDonacionFromData ( donacionData ){
        //Extraemos la data de la base de datos como tal
        const { id_donacion, id_donador, id_proyecto_beneficiado, monto, info_donante,
            fecha_donacion } = proyectoData;

        const donacion = new Donacion(id_donacion, id_donador, id_proyecto_beneficiado, monto, info_donante, fecha_donacion);
        return donacion;
    }

}

