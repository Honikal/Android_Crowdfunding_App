import DonacionEntidad from "../entities/DonationsEntity";
import ProyectoEntidad from "../entities/ProjectsEntity";
import UsuarioEntidad from "../entities/UserEntity";

import Usuario from "../models/Users";

export default class DonationsExtract_Ctrl {
    #usuarioActual;
    /**
     * Constructor de clase Donate_Ctrl
     * @param {Usuario} usuarioActual           - Usuario el cual hizo la donación en el sistema
    */
    constructor(
        usuarioActual = null,
    ){
        this.#usuarioActual = usuarioActual;
    }

    async formatDonacion( donacionData ){
        const {
            idDonacion,
            id_donador,
            id_proyecto_beneficiado,
            monto,
            info_donante,
            fecha_donacion
        } = donacionData;

        try {
            const usuarioEntidad = new UsuarioEntidad();
            const proyectoEntidad = new ProyectoEntidad();

            const donadorData = usuarioEntidad.createUsuarioFromData(await usuarioEntidad.getUsuarioByID(id_donador));
            const proyectoData = proyectoEntidad.createProyectoFromData(await proyectoEntidad.getProyectoByID(id_proyecto_beneficiado));

            const donadorName = donadorData.getNombre
            const projectoName= proyectoData.getNombre

            const donacionEnriquecida = {
                idDonacion,
                id_donador,
                id_proyecto_beneficiado,
                donadorName,
                projectoName,
                monto,
                fecha_donacion
            }

            return donacionEnriquecida;
        } catch (error) {
            console.error("Error desde la capa de control creando un objeto práctico: ");
            throw error;
        }
    }

    async extraerDonaciones(){
        const donacionesRetornar = [];
        let donaciones = [];
        try {
            const donacionEntidad = new DonacionEntidad();
            

            if (this.#usuarioActual.isAdmin){
                donaciones = await donacionEntidad.getDonations();
            } else {
                donaciones = await donacionEntidad.getDonacionesByIdUsuario();
            }

            for (const donacionData of donaciones) {
                const donacion = await this.formatDonacion(donacionData);
                donacionesRetornar.push(donacion);
            }

            return donacionesRetornar;
        } catch (error) {
            console.error("Error desde la capa controlador: ", error);
            throw error;
        }
    }

}

