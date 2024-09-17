import DonacionEntidad from "../entities/DonationsEntity";

import Usuario from "../models/Users";
import Donacion from "../models/Donations";

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
                const donacion = donacionEntidad.createDonacionFromData(donacionData);
                donacionesRetornar.push(donacion);
            }

            return donacionesRetornar;
        } catch (error) {
            console.error("Error desde la capa controlador: ", error);
            throw error;
        }
    }

}

