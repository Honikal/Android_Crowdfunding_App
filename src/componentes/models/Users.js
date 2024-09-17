export default class Usuario{
    //A diferencia, acá no podemos asignar más de 1 constructor, pero se pueden definir valores default
    #idUsuario
    #admin
    #activa
    #nombre
    #cedula
    #areaTrabajo
    #cantDineroBolsillo
    #telefono
    #correo
    #password


    /**
     * Constructor de clase Usuario
     * @param {string} idUsuario            - ID única generada al ser guardado en RealTime Database de firebase
     * @param {string} admin                - Nombre completo del usuario
     * @param {string} nombre               - Nombre completo del usuario
     * @param {string} cedula               - Valor id del usuario para identificar
     * @param {string} areaTrabajo          - Departamento en el cual está trabajando
     * @param {string} cantDineroInicial    - Departamento en el cual está trabajando
     * @param {string} telefono             - Correo electrónico de trabajo
     * @param {string} correo               - Correo electrónico de trabajo
     * @param {string} password             - Correo electrónico de trabajo
    */

    constructor (
        idUsuario = '',
        nombre = '',
        cedula = '',
        areaTrabajo = '',
        cantDineroInicial = 0.0,
        telefono = '',
        correo = '',
        password = '',
        admin = false,
        activa = true
    ){
        this.#idUsuario = idUsuario,
        this.#admin = admin
        this.#nombre = nombre,
        this.#cedula = cedula
        this.#areaTrabajo = areaTrabajo,
        this.#cantDineroBolsillo = cantDineroInicial,
        this.#telefono = telefono,
        this.#correo = correo,
        this.#password = password,
        this.#activa = activa
    }

    //Getters
    get getIdUsuario(){
        return this.#idUsuario;
    }
    get getNombre(){
        return this.#nombre;
    }
    get getCedula(){
        return this.#cedula;
    }
    get getCorreo(){
        return this.#correo;
    }
    get getPassword(){
        return this.#password;
    }
    get getTelefono(){
        return this.#telefono;
    }
    get getAreaTrabajo(){
        return this.#areaTrabajo;
    }
    get getCantDineroBolsillo(){
        return this.#cantDineroBolsillo;
    }
    get isAdmin(){
        return this.#admin
    }
    get isActiva(){
        return this.#activa;
    }


    //Setters
    set setIdUsuario(value){
        /**
         * setter usuario_id
         * @param {string} value     - Valor de entrada generado criptográficamente como id
        */
        this.#idUsuario = value
    }
    set setCorreo(value) {
        /**
         * setter correo electronico
         * @param {string} value     - Valor de entrada que debe ser el nuevo correo electrónico
        */
        this.#correo = value
    }
    set setPassword(value){
        /**
         * setter estado de usuario en proyectos
         * @param {string} value     - Valor de entrada que debe ser la nueva contraseña
        */
        this.#password = value;
    }
    set setTelefono(value){
        /**
         * setter numero de teléfono
         * @param {string} value     - Valor de entrada que debe ser el nuevo número de teléfono
        */
        this.#telefono = value
    }
    set setAreaTrabajo(value){
        /**
         * setter departamento de trabajo
         * @param {string} value     - Valor de entrada que debe ser el nuevo departamento en el que trabaja
        */
        this.#areaTrabajo = value
    }
    set setCantDineroBolsillo(value){
        /**
         * setter cantidad de dinero en el bolsillo
         * @param {float} value     - Valor de entrada que debe ser un aproximado al dinero inicial que tiene un usuario en el bolsillo
        */
        this.#cantDineroBolsillo = value;
    }
    set setAdmin(value){
        /**
         * setter tipo de usuario según proyectos
         * @param {boolean} value     - Valor de entrada para indicar si es admin o no
        */
         this.#admin = value;
    }
    set setActiva(value){
        /**
         * setter estado de cuenta
         * @param {boolean} value     - Valor de entrada para indicar si la cuenta está activa o no
        */
         this.#activa = value;
    }

    showData(){
        const usuarioData = `
            Admin: ${this.isAdmin}
            Cuenta activa: ${this.isActiva}
            Usuario ID: ${this.#idUsuario}
            Nombre Completo: ${this.#nombre}
            Cédula: ${this.getCedula}
            Departamento de Trabajo: ${this.getAreaTrabajo}
            Correo: ${this.getCorreo}
            Dinero en bolsillo: ${this.getCantDineroBolsillo}
            Número de Teléfono: ${this.getTelefono}
        `;
        console.log(usuarioData);
    }

}



