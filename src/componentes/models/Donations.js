export default class Donacion{
    #idDonacion
    #idDonador
    #idProyectoBeneficiado
    #infoDonante   //veremos si es email, nombre y correo, o esto es más simple
    #fecha_donacion
    #monto

    /**
     * Constructor de clase Proyectos
     * @param {string} idDonacion            - ID única generada al ser guardado en RealTime Database de firebase
     * @param {string} idDonador             - ID única generada en RDB Firebase, referenciando al usuario creador
     * @param {string} idProyectoBeneficiado - ID única generada en RDB Firebase, referenciando al proyecto
     * @param {string} fecha_donacion        - Fecha en la que se realizó la donación
     * @param {string} infoDonante           - Información de contacto del donante
     * @param {float}  monto                 - Cantidad de dinero en dólares que se piensa donar al proyecto
    */
     constructor (
        idDonacion = '',
        idDonador = '',
        idProyectoBeneficiado = '',
        infoDonante = '',
        monto = 0.0
    ){
        this.#idDonacion = idDonacion,
        this.#idDonador = idDonador,
        this.#idProyectoBeneficiado = idProyectoBeneficiado,
        this.#infoDonante = infoDonante,
        this.#monto = monto
    }

    //Getters
    get getIdDonacion(){
        return this.#idDonacion;
    }
    get getIdDonador(){
        return this.#idDonador;
    }
    get getIdProyectoBeneficiado() {
        return this.#idProyectoBeneficiado;
    }
    get getInfoDonante() {
        return this.#infoDonante;
    }
    get getMonto(){
        return this.#monto;
    }

    //Setters
    set setIdDonacion(value){
        /**
         * setter id_donacion
         * @param {string} value     - Valor de entrada generado criptográficamente como id (PK)
        */
        this.#idDonacion = value
    }
    set setIdDonador(value){
        /**
         * setter id_donador
         * @param {string} value     - Valor de entrada generado criptográficamente como id (FK)
        */
        this.#idDonador = value
    }
    set setIdProyectoBeneficiado(value){
        /**
         * setter id_proyecto_beneficiado
         * @param {string} value     - Valor de entrada generado criptográficamente como id (FK)
        */
        this.#idProyectoBeneficiado = value
    }
    set setInfoDonante(value){
        /**
         * setter info_donante
         * @param {string} value     - Valor de entrada a reemplazar la información de donante
        */
        this.#infoDonante = value
    }
    set setMonto(value){
        /**
         * setter monto
         * @param {float} value     - Valor de entrada a reemplazar el monto monetario a donar
        */
        this.#monto = value
    }

    showData(){
        const proyectoData = `
            Donación ID: ${this.#idProyecto}
            Creador ID: ${this.#idCreador}
            Proyecto ID: ${this.#idCreador}
            Info del donante: ${this.#infoDonante}
            Monto de donación: ${this.#monto}
        `;
        console.log(proyectoData);
    }

}