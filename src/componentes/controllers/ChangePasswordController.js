//Import sistemas de firebase
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';

import UsuarioEntidad from '../entities/UserEntity';
import Usuario from '../models/Users';

export default class ChangePassword_Ctrl{
    #correo;
    #passwordNuevo;

    /**
     * Constructor de clase ModifyAccount_Ctrl
     * @param {string}  correo               - Correo electrónico al cual se le aplica el cambio
     * @param {string}  passwordNuevo        - Contraseña de login nueva
    */
    constructor(
        correo,
        passwordNuevo
    ){
        this.#correo = correo,
        this.#passwordNuevo = passwordNuevo
    }

    async reauthenticateAndChangePassword(oldPassword, newPassword){
        const auth = getAuth();
        
        try{
            //Paso uno, hacer el login 
            const userCredential = await signInWithEmailAndPassword(auth, this.#correo, oldPassword);
            const user = userCredential.user; //Tomamos el usuario autenticado y su credencial

            //Paso 2, reautenticación de usuario
            const credential = EmailAuthProvider.credential(this.#correo, oldPassword);
            await reauthenticateWithCredential(user, credential);
            console.log("Usuario reautenticado de forma exitosa");

            //Paso 3, realizar cambio de contraseña en authenticación de firebase
            await updatePassword(user, newPassword);
            console.log("Contraseña actualizada de forma exitosa en Firebase.");
            return user; 
        } catch (error){
            console.error("Error durante la reautenticación del usuario", error);
            throw new Error("Error durante la reautenticación del usuario")
        }
    }

    async modifyPassword() {
        try {
            //// Actualización de base de datos ////
            const usuarioEntidad = new UsuarioEntidad();
            const usuario = usuarioEntidad.createUsuarioFromData(await usuarioEntidad.getUsuarioByEmail(this.#correo));
        
            if (!usuario){
                throw new Error("No existe ningún usuario registrado con éste correo");
            }

            console.log("Usuario extraído: ", usuario);

            console.log("Password anterior: ", usuario.getPassword);
            console.log("Password nuevo: ", this.#passwordNuevo);

            if (usuario.getPassword === this.#passwordNuevo){
                throw new Error("No se puede cambiar la contraseña a una igual a la anterior");
            }

            //Cambio de contraseña en firebase
            const user = await this.reauthenticateAndChangePassword(usuario.getPassword, this.#passwordNuevo);

            //Ejercemos el cambio en la base de datos
            await usuarioEntidad.editUsuario(usuario.getIdUsuario,
                {
                    password: this.#passwordNuevo
                }
            );

            //Modificamos al usuario
            usuario.setPassword = this.#passwordNuevo;
            console.log("Retornamos usuario modificado: ", usuario);
        } catch (error) {
            console.error("Error dentro de la capa de entidad modificando contraseña del usuario ", error);
            throw error;
        }
    }
}