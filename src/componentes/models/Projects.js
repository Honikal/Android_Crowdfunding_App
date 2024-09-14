export default class Proyecto{
    #idProyecto
    #idCreador
    #nombre
    #descripcion
    #objetivoFinanciero
    #fondosRecaudados
    #fechaLimite
    #media

    /**
     * Constructor de clase Proyectos
     * @param {string} idProyecto            - ID única generada al ser guardado en RealTime Database de firebase
     * @param {string} idCreador             - ID única generada en RDB Firebase, referenciando al usuario creador
     * @param {string} nombre                - Nombre completo del proyecto
     * @param {string} descripcion           - Descripción del proyecto a realizarse
     * @param {float} objetivoFinanciero     - Objetivo financiero o dinero esperado a recolectarse
     * @param {string} fechaLimite           - Fecha en la que se espera llegar a recaudar el objetivo financiero antes de cerrar el proyecto
     * @param {Array[string]} media          - Grupos de id's o distintos valores de identificación para tomar fotos o videos del proyecto
    */

     constructor (
        idProyecto = '',
        idCreador = '',
        nombre = '',
        descripcion = '',
        objetivoFinanciero = 0.0,
        fondosRecaudados = 0.0,
        fechaLimite = '',
        media = []
    ){
        this.#idProyecto = idProyecto,
        this.#idCreador = idCreador,
        this.#nombre = nombre,
        this.#descripcion = descripcion,
        this.#objetivoFinanciero = objetivoFinanciero,
        this.#fondosRecaudados = fondosRecaudados,
        this.#fechaLimite = fechaLimite,
        this.#media = media
    }

    //Getters
    get getIdProyecto(){
        return this.#idProyecto;
    }
    get getIdCreador(){
        return this.#idCreador;
    }
    get getNombre() {
        return this.#nombre;
    }
    get getDescripcion() {
        return this.#descripcion;
    }
    get getObjetivoFinanciero() {
        return this.#objetivoFinanciero;
    }
    get getFondosRecaudados() {
        return this.#fondosRecaudados;
    }
    get getFechaLimite() {
        return this.#fechaLimite;
    }
    get getMedia() {
        return this.#media;
    }

    //Setters
    set setIdUsuario(value){
        /**
         * setter usuario_id
         * @param {string} value     - Valor de entrada generado criptográficamente como id
        */
        this.#idProyecto = value
    }
    set setNombre(value){
        /**
         * setter nombre
         * @param {string} value     - Valor de entrada a reemplazar nombre del proyecto
        */
        this.#nombre = value
    }
    set setDescripcion(value){
        /**
         * setter descripcion
         * @param {string} value     - Valor de entrada a reemplazar la descripción del proyecto
        */
        this.#descripcion = value
    }
    set setObjetivoFinanciero(value){
        /**
         * setter objetivo financiero
         * @param {float} value     - Valor de entrada a reemplazar el monto del objetivo financiero
        */
        this.#objetivoFinanciero = value
    }
    set setFondosRecaudados(value){
        /**
         * setter fondos recaudados
         * @param {float} value     - Valor de entrada a reemplazar el monto de los fondos del proyecto recaudados
        */
        this.#fondosRecaudados = value
    }
    set setFechaLimite(value){
        /**
         * setter fecha límite
         * @param {string} value     - Valor de entrada a reemplazar la fecha de finalización de los fondos del proyecto
        */
        this.#fechaLimite = value
    }
    set setMedia(value){
        /**
         * setter media codes
         * @param {Array[string]} value   - Valor de entrada a reemplazar un array de códigos que simbolizan los objetos de galería guardados
        */
        this.#media = value
    }

    //To String
    showData(){
        const proyectoData = `
            Proyecto ID: ${this.#idProyecto}
            Id del creador: ${this.#idCreador}
            Nombre Proyecto: ${this.#nombre}
            Descripcion: ${this.getDescripcion}
            Monto esperado a alcanzar: ${this.getAreaTrabajo}
            Fondos actuales: ${this.getFondosRecaudados}
            Fecha límite de entrega del proyecto: ${this.getFechaLimite}
            Lista de códigos de media: ${this.getMedia}
        `;
        console.log(proyectoData);
    }
}

