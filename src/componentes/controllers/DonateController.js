import ProyectoEntidad from "../entities/ProjectsEntity";
import UsuarioEntidad from "../entities/UserEntity";
import DonacionEntidad from "../entities/DonationsEntity";

import Usuario from "../models/Users";
import Donacion from "../models/Donations";

export default class Donate_Ctrl {
    #usuarioActual;
    #idProyecto;
    #monto;
    #donacion;

    /**
     * Constructor de clase Donate_Ctrl
     * @param {Usuario} usuarioActual           - Usuario el cual hizo la donación en el sistema
     * @param {string}  idProyecto              - ID de reconocimiento del proyecto al cual se hace la donación
     * @param {float}  monto                    - Monto de dinero de donación hecho
    */
    constructor(
        usuarioActual = null,
        idProyecto = "",
        monto = 0.0,
    ){
        this.#usuarioActual = usuarioActual;
        this.#idProyecto = idProyecto;
        this.#monto = monto
        this.#donacion = new Donacion("", usuarioActual.getIdUsuario, idProyecto, "", monto);
    }

    async modifyProject() {
        try {
            const proyectoEntidad = new ProyectoEntidad();
            const proyecto = proyectoEntidad.createProyectoFromData(await proyectoEntidad.getProyectoByID(this.#idProyecto));

            //Modificamos los fondos recaudados del proyecto
            proyecto.setFondosRecaudados = proyecto.getFondosRecaudados + this.#monto;

            //Ahora hacemos la modificación dentro de la base de datos
            await proyectoEntidad.editProyecto(
                this.#idProyecto,
                {
                    fondos_recaudados: proyecto.getFondosRecaudados
                }
            );
            console.log("Se modificaron los fondos recaudados del proyecto: ", proyecto.getNombre);
        } catch (error) {
            console.error("Error dentro de la capa de entidad modificando el proyecto: ", error);
            throw error;
        }
    }

    async modifyUser(){
        try {
            const usuarioEntidad = new UsuarioEntidad();

            // Resta el monto de la cartera del usuario
            this.#usuarioActual.setCantDineroBolsillo = this.#usuarioActual.getCantDineroBolsillo - this.#monto;

            // Una vez restado de la cartera del usuario, vamos a guardar los cambios en el sistema
            await usuarioEntidad.editUsuario(
                this.#usuarioActual.getIdUsuario,
                {
                    cantidad_bolsillo: this.#usuarioActual.getCantDineroBolsillo
                }
            );

            //Retornamos el usuario actual modificado
            console.log("Retornamos usuario modificado: ", this.#usuarioActual);
            return this.#usuarioActual;
        } catch (error){
            console.error("Error dentro de la capa de entidad modificando el usuario: ", error);
            throw error;
        }
    }

    async crearDonacion(){
        try {
            //Se guarda la donación en la base de datos
            const donacionEntidad = new DonacionEntidad();
            await donacionEntidad.addDonacion(this.#donacion);

            //Ahora modificamos ambos usuario y proyecto

            await this.modifyProject();
            const usuarioActualizado = await this.modifyUser();

            console.log("Donación creada desde controlador: ");
            return usuarioActualizado;
        } catch (error) {
            console.error("Error desde la capa controlador: ", error);
            throw error;
        }
    }

}

