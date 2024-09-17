//Import sistemas de firebase
import { getAuth, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

import UsuarioEntidad from '../entities/UserEntity';
import Usuario from '../models/Users';

export default class ModifyAccount_Ctrl{
    #usuario;
    #correoNuevo;
    #areaTrabajoNuevo;
    #telefonoNuevo;
    #passwordNuevo;
    #dineroBolsilloNuevo;

    /**
     * Constructor de clase ModifyAccount_Ctrl
     * @param {Usuario} usuario              - Usuario al que se le aplicarán todos los cambios
     * @param {string}  correoNuevo          - Correo electrónico a reemplazar al antiugo
     * @param {string}  passwordNuevo        - Contraseña de login nueva
     * @param {string}  telefonoNuevo        - Número de teléfono de nuevo
     * @param {string}  areaTrabajoNuevo     - Área de trabajo nueva
     * @param {string}  dineroBolsilloNuevo  - Monto de dinero de bolsillo actual
     * 
    */
    constructor(
        usuario = null,
        correoNuevo = "",
        passwordNuevo = "",
        telefonoNuevo = "",
        areaTrabajoNuevo = "",
        dineroBolsilloNuevo = 0.0
    ){
        this.#usuario = usuario,
        this.#correoNuevo = correoNuevo,
        this.#passwordNuevo = passwordNuevo,
        this.#telefonoNuevo = telefonoNuevo
        this.#areaTrabajoNuevo = areaTrabajoNuevo
        this.#dineroBolsilloNuevo = dineroBolsilloNuevo
    }

    async reauthenticate(user){
        try{
            const authCredential = EmailAuthProvider.credential(this.#usuario.getCorreo, this.#usuario.getPassword);
            await reauthenticateWithCredential(user, authCredential);
            //console.log("Usuario reautenticado de forma exitosa");
        } catch (error){
            console.error("Error durante la reautenticación del usuario", error);
            throw new Error("Error durante la reautenticación del usuario")
        }
    }

    async modifyUser() {
        try {
            //// Autenticación y actualización por firebase authentication ////
            const auth = getAuth();
            const user = auth.currentUser;

            if (!user){
                console.error("No existía el usuario");
                throw new Error("No se encontró el usuario en firebase");
            }

            //Por si pide solicitud de reautenticarse
            await this.reauthenticate(user);

            //Actualizar correo
            if (this.#correoNuevo && this.#correoNuevo !== this.#usuario.getCorreo) {
                try {
                    await updateEmail(user, this.#correoNuevo);
                    console.log("Correo actualizado en la autenticación de firebase")
                } catch (error) {
                    throw error;
                }
            }

            //Actualizar password
            if (this.#passwordNuevo && this.#passwordNuevo !== this.#usuario.getPassword) {
                try{
                    await updatePassword(user, this.#passwordNuevo);
                    console.log("Contraseña modificada en la autenticación de firebase")
                } catch (error){
                    throw error;
                }
            }

            //// Actualización de base de datos ////
            const usuarioEntidad = new UsuarioEntidad();
            await usuarioEntidad.editUsuario(
                this.#usuario.getIdUsuario,
                {
                    correo: this.#correoNuevo,
                    password: this.#passwordNuevo,
                    telefono: this.#telefonoNuevo,
                    area_trabajo: this.#areaTrabajoNuevo,
                    cantidad_bolsillo: this.#dineroBolsilloNuevo
                }
            )

            //Modificamos el usuario al retornar
            this.#usuario.setCorreo = this.#correoNuevo;
            this.#usuario.setPassword = this.#passwordNuevo;
            this.#usuario.setTelefono = this.#telefonoNuevo;
            this.#usuario.setAreaTrabajo = this.#areaTrabajoNuevo;
            this.#usuario.setCantDineroBolsillo = this.#dineroBolsilloNuevo;
            
            console.log("Retornamos usuario modificado: ", this.#usuario);
            return this.#usuario;
        } catch (error) {
            console.error("Error dentro de la capa de entidad modificando el usuario: ", error);
            throw error;
        }
    }
}