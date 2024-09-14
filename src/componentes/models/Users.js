export default class Usuario{
    //A diferencia, acá no podemos asignar más de 1 constructor, pero se pueden definir valores default
    #idUsuario
    #admin
    #nombreCompleto
    #cedula
    #areaTrabajo
    #cantidadBolsillo
    #telefono
    #correo
    #password


    /**
     * Constructor de clase Usuario
     * @param {string} idUsuario            - ID única generada al ser guardado en RealTime Database de firebase
     * @param {string} admin                - Nombre completo del usuario
     * @param {string} nombre_completo      - Nombre completo del usuario
     * @param {string} cedula               - Valor id del usuario para identificar
     * @param {string} areaTrabajo          - Departamento en el cual está trabajando
     * @param {string} cantidad_bolsillo    - Departamento en el cual está trabajando
     * @param {string} telefono             - Correo electrónico de trabajo
     * @param {string} correo               - Correo electrónico de trabajo
     * @param {string} password             - Correo electrónico de trabajo
    */

    constructor (
        idUsuario = '',
        nombre_completo = '',
        cedula = '',
        areaTrabajo = '',
        cantidad_bolsillo = 0.0,
        telefono = '',
        correo = '',
        password = '',
        admin = false
    ){
        this.#idUsuario = idUsuario,
        this.#admin = admin
        this.#nombreCompleto = nombre_completo,
        this.#cedula = cedula
        this.#areaTrabajo = areaTrabajo,
        this.#cantidadBolsillo = cantidad_bolsillo,
        this.#telefono = telefono,
        this.#correo = correo,
        this.#password = password
    }

    //Getters
    get getIdUsuario(){
        return this.#idUsuario;
    }
    get getNombreCompleto(){
        return this.#nombreCompleto;
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
    get getCantidadBolsillo(){
        return this.#cantidadBolsillo;
    }
    get getTelefono(){
        return this.#telefono
    }
    get isAdmin(){
        return this.#admin
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

    set setPassword(value){
        /**
         * setter estado de usuario en proyectos
         * @param {string} value     - Valor de entrada que debe ser la nueva contraseña
        */
        this.#password = value;
    }

    set setAdmin(value){
        /**
         * setter estado de usuario en proyectos
         * @param {string} value     - Valor de entrada que debe ser la nueva contraseña
        */
         this.#admin = value;
    } 

    showData(){
        const usuarioData = `
            Admin: ${this.isAdmin}
            Usuario ID: ${this.#idUsuario}
            Nombre Completo: ${this.#nombreCompleto}
            Cédula: ${this.getCedula}
            Departamento de Trabajo: ${this.getAreaTrabajo}
            Correo: ${this.getCorreo}
            Dinero en bolsillo: ${this.getCantidadBolsillo}
            Número de Teléfono: ${this.getTelefono}
        `;
        console.log(usuarioData);
    }

}



