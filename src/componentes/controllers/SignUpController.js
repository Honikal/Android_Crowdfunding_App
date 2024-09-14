import Usuario from "../models/Users"
import UsuarioEntidad from "../entities/UserEntity";
import EmailSender from "../entities/EmailSender";

import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

export default class SignUp_Ctrl{
    #usuario
    /**
     * Constructor de clase SignUp_Ctrl
     * @param {string} nombreCompleto       - Nombre completo del usuario
     * @param {string} cedula               - Número de cédula del usuario
     * @param {string} areaTrabajo          - Especialidad o trabajo al que se dedica
     * @param {float} cantDineroInicial     - Monto inicial con el que se registra el usuario
     * @param {string} telefono             - Número de teléfono del usuario
     * @param {string} correo               - Correo electrónico de trabajo
     * @param {string} password             - Contraseña de login
    */
    constructor(
        nombreCompleto = '',
        cedula = '',
        areaTrabajo = '',
        cantDineroInicial = 0.0,
        telefono = '',
        correo = '',
        password = '',
        admin = false
    ){
        this.#usuario = new Usuario('', nombreCompleto, cedula, areaTrabajo, cantDineroInicial, telefono,
        correo, password, admin);
    }

    //Manejo en base de datos
    async validarExistenciaUsuarioDB(){
        try {
            const usuarioEntidad = new UsuarioEntidad();
            const usuarios = usuarioEntidad.getUsuarios();

            if (usuarios.length > 0){
                const usuario = usuarios.find(user => 
                    (user.correo.toLowerCase() === this.#usuario.getCorreo.toLowerCase()) || 
                    (user.cedula === this.#usuario.getCedula)
                )
                return !!usuario;
                //Convertimos valor a booleano, si es NAN, entonces retorna false, que significa no está dentro
                //del sistema
            }
        } catch (error) {
            console.error('Error en capa de controlador: ', error);
            throw error;
        }
        //No se encontró ningún usuario en el sistema
        return false;
    }
    
    async registrarUsuarioDB(){
        try {
            const usuarioEntidad = new UsuarioEntidad();
            await usuarioEntidad.addUsuario(this.#usuario);
        } catch (error) {
            console.error("Error en el controlador registrando al usuario en la base de datos");
            throw error;
        }
    }

    //Manejo en el sistema de firebase
    async registrarUsuarioFirebase(){
        const auth = getAuth();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, this.#usuario.getCorreo,
                this.#usuario.getPassword);
            const user = userCredential.user;

            console.log("UID del usuario a la hora de registrarse: ", user.uid);
            await sendEmailVerification(user);
        } catch (error) {
            console.error('Error en capa de controlador: ', error);
            
            //Customizamos los errores posibles ha suceder
            if (error.code ==='auth/email-already-in-use'){
                throw new Error("El usuario a registrar ya se encontraba en el sistema");
            } else if (error.code === 'auth/invalid-email'){
                throw new Error("El correo electrónico proporcionado no es válido");
            } else if (error.code === 'auth/weak-password'){
                throw new Error("La contraseña proporcionada es demaisado débil");
            } else {
                throw new Error("Error desconocido al registrar el usuario: " + error.message);
            }
        }
    }

    //Registrar en el sistema
    async registrarUsuario(){
        try {
            const userExists = await this.validarExistenciaUsuarioDB();
            if (!userExists){
                await this.registrarUsuarioFirebase();
                await this.registrarUsuarioDB();
                console.log("El usuario ha sido registrado de manera exitosa");

                console.log("Usuario creado desde controlador: ");
                console.log(this.#usuario.showData());

                //Enviamos el correo una vez se ha registrado el usuario
                const emailSender = new EmailSender();

                /*
                emailSender.sendEmail(
                    this.#usuario.getCorreo, 
                    'Bienvenido a Crowdfounder',
                    'Bienvenido a Crowdfounder, una aplicación que busca facilitar a aquellas personas con grandes ideas, ' +
                    'mostrarlas al mundo y poder tener una oportunidad grande y sponsors que faciliten cumplir el objetivo ' +
                    'de su proyecto. Por favor, siéntase cómodo usando nuestra aplicación y observando distintas posibilidades. ' +
                    'Y una vez más, muchas gracias por unirse a la plataforma.'
                );
                */

                return this.#usuario;
            } else {
                console.error("Error encontrado en controlador, usuario ya registrado en el sistema");
                throw new Error("El usuario ya se encuentra registrado en el sistema");
            }
        } catch (error) {
            console.error('Error en capa controlador registrando al usuario: ', error);
            throw error;
        }
    }

}
