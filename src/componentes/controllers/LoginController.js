//Import sistemas de firebase
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import UsuarioEntidad from '../entities/UserEntity';
import Usuario from '../models/Users';

export default class IniciarSesion_Ctrl{
    #correo;
    #password;

    /**
     * Constructor de clase IniciarSesion_CTrl
     * @param {string} correo   - Correo electrónico de trabajo
     * @param {string} password             - Contraseña de login
    */
    constructor(
        correo = "",
        password = ""
    ){
        this.#correo = correo,
        this.#password = password
    }

    validarFirebaseAutenticacion(){
        return new Promise((resolve, reject) => {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, this.#correo, this.#password)
                .then((userCredential) => {
                    // Hicimos sign in
                    const user = userCredential.user;
                    console.log(`Se encontraron datos del usuario en el sistema: ${user}`);
                    resolve(); // Resolve the promise since authentication was successful
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    reject(new Error(`El usuario no está registrado en la aplicación`)); // Reject the promise with an error
                });
        });
    }

    async validarBaseDatosAutenticacion(){
        try {
            const usuarioEntidad = new UsuarioEntidad();
            const usuarios = await usuarioEntidad.getUsuarios();

            if (usuarios.length > 0) {
                const usuario = usuarios.find(user => 
                    user.correo === this.#correo && user.password === this.#password    
                )

                if (usuario) {
                    console.log("Usuario encontrado en la base de datos: ", usuario);
                    return usuario;
                } else {
                    console.error("El usuario no se encuentra en la base de datos");
                    throw new Error("El usuario no está registrado en la aplicación");
                }
            }   
        } catch (error) {
            throw new Error("Error en la validación de la base de datos: ", error);
        }
    }

    createUsuarioFromData ( usuarioData ){
        //Extraemos la data de la base de datos como tal
        const { idUsuario, admin, nombre_completo, cedula, area_trabajo, cantidad_bolsillo, telefono, correo, password} =
        usuarioData;

        const usuario = new Usuario(idUsuario, nombre_completo, cedula, area_trabajo,
            cantidad_bolsillo, telefono, correo, password, admin);
        return usuario;
    }

    async validarIniciarSesion(){
        //Primero llamamos a la autenticación de firebase
        return this.validarFirebaseAutenticacion()
            .then(() => {
                //Si la autenticación funciona, vamos con la siguiente
                return this.validarBaseDatosAutenticacion();
            })
            .then((usuarioData) => {
                //Ambas validaciones son correctas
                console.log("Las validaciones funcionan correctamente");

                //Realizamos cualquier lógica principal acá
                const usuario = this.createUsuarioFromData(usuarioData);
                return usuario;
            })
            .catch((error) => {
                //Manejamos los errores como cualquier método de validación
                throw error;
            })
    }


    /**
     * Función encargada de salir de sesión o sacar de sesión al usuario
    */
    async logOut(){
        //Primero que todo, tomamos la autenticación del usuario como tal en el sistema
        const auth = getAuth();
        try{
            await signOut(auth);
            console.log("El usuario salió de sesión");
        } catch (error) {
            console.error("Error en CONTROLLER a la hora de salir de sesión");
            throw error;
        }
    }
}