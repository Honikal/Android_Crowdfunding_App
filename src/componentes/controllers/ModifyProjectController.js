import ProyectoEntidad from "../entities/ProjectsEntity";
import Proyecto from "../models/Projects";

export default class ModifyProject_Ctrl {
    #proyecto;
    #nombreNuevo;
    #descripcionNueva;
    #objetivoFinancieroNuevo;
    #categoriaNueva;
    #fechaInicioNueva;
    #fechaFinNueva;
    #mediaNueva;

    /**
     * Constructor de clase ModifyAccount_Ctrl
     * @param {Proyecto} proyecto               - Proyecto al que se le aplicarán todos los cambios
     * @param {string}  nombreNuevo             - Nombre nuevo del proyecto
     * @param {string}  descripcionNueva        - Descripción nueva del proyecto
     * @param {float}  objetivoFinancieroNuevo  - Nuevo monto o meta financiera del proyecto
     * @param {string}  categoriaNueva          - Categoría nueva del proyecto
     * @param {string}  fechaInicioNueva        - Fecha de inicio del proyecta nueva
     * @param {string}  fechaFinNueva           - Fecha de finalización del proyecto nueva
     * @param {[string]} mediaNueva             - Lista de archivos multimedia nuevos
    */
    constructor(
        proyecto = null,
        nombreNuevo = "",
        descripcionNueva = "",
        objetivoFinancieroNuevo = 0.0,
        categoriaNueva = "",
        fechaInicioNueva = "",
        fechaFinNueva = "",
        mediaNueva = []
    ){
        this.#proyecto = proyecto;
        this.#nombreNuevo = nombreNuevo;
        this.#descripcionNueva = descripcionNueva;
        this.#objetivoFinancieroNuevo = objetivoFinancieroNuevo;
        this.#categoriaNueva = categoriaNueva;
        this.#fechaInicioNueva = fechaInicioNueva;
        this.#fechaFinNueva = fechaFinNueva;
        this.#mediaNueva = mediaNueva;
    }

    async modifyProject() {
        try {
            const proyectoEntidad = new ProyectoEntidad();
            await proyectoEntidad.editProyecto(
                this.#proyecto.getIdProyecto,
                {
                    nombre: this.#nombreNuevo,
                    descripcion: this.#descripcionNueva,
                    objetivo_financiero: this.#objetivoFinancieroNuevo,
                    categoria: this.#categoriaNueva,
                    fecha_creacion: this.#fechaInicioNueva,
                    fecha_limite: this.#fechaFinNueva,
                    media: this.#mediaNueva
                }
            );

            //Modificamos el proyecto al retornar
            this.#proyecto.setNombre              = this.#nombreNuevo;
            this.#proyecto.setDescripcion         = this.#descripcionNueva;
            this.#proyecto.setObjetivoFinanciero  = this.#objetivoFinancieroNuevo;
            this.#proyecto.setCategoria           = this.#categoriaNueva;
            this.#proyecto.setFechaCreacion       = this.#fechaInicioNueva;
            this.#proyecto.setFechaLimite         = this.#fechaFinNueva;
            this.#proyecto.setMedia               = this.#mediaNueva;

            console.log("Retornamos proyecto modificado: ", this.#proyecto);
            return this.#proyecto;

        } catch (error) {
            console.error("Error dentro de la capa de entidad modificando el proyecto: ", error);
            throw error;
        }
    }
}

