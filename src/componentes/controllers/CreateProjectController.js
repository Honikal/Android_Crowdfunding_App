import Proyecto from "../models/Projects";
import ProyectoEntidad from "../entities/ProjectsEntity";


export default class CreateProject_Ctrl {
    #proyecto;
    /**
     * Constructor de clase CreateProject_Ctrl
     * @param {string} idCreador            - ID del usuario creador del proyecto
     * @param {string} nombre               - Nombre completo del proyecto
     * @param {string} descripcion          - Descripción del proyecto
     * @param {string} categoria            - Método de clasificación de un proyecto por áreas
     * @param {float} objetivoFinanciero    - Monto inicial con el que se registra el usuario
     * @param {float} fondosRecaudados      - Fondos reacuadados actuales (se toman como 0 inicialmente)
     * @param {string} fechaCreacion        - Fecha de creación del proyecto
     * @param {string} fechaLimite          - Fecha límite a esperado de alcanzar las metas del proyecto
     * @param {[string]} media
    */

    constructor(
        idCreador = '',
        nombre = '',
        descripcion = '',
        categoria = '',
        objetivoFinanciero = 0.0,
        fechaCreacion = '',
        fechaLimite = '',
        media = []
    ){
        this.#proyecto = new Proyecto('', idCreador, nombre, descripcion, categoria,
        objetivoFinanciero, 0, fechaCreacion, fechaLimite, media);
    }

    //Registrar el proyecto
    async crearProyecto(){
        try {
            const proyectoEntidad = new ProyectoEntidad();
            const proyectoId = await proyectoEntidad.addProyecto(this.#proyecto);
            this.#proyecto.setIdProyecto = proyectoId;

            //Guardamos en la base de datos de storage
            await proyectoEntidad.uploadMediaToStorage(proyectoId, this.#proyecto.getMedia);

            console.log("Proyecto creado desde controlador: ");
            console.log(this.#proyecto.showData());
            return this.#proyecto;
        } catch (error) {
            console.error("Error desde la capa controlador: ", error);
            throw error;
        }
    }
}

