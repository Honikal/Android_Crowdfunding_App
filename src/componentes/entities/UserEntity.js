import { getDatabase, ref, get, push, set, update } from 'firebase/database'
import app from "../../../firebaseConfig.js"

import Usuario from '../models/Users.js'

export default class UsuarioEntidad {
    #db;
    #dbRef;

    constructor(){
        this.#db = getDatabase(app);
        this.#dbRef = ref(this.#db, "users");
    }

    /**
     * Función encargada de retornar la lista completa de usuarios dentro del sistema como tal
     * @returns {Promise<Usuario>}                    - Retorna true si encuentra un usuario con ese correo, sino, no retorna false
     */
    async getUsuarios() {
        try {
            const snapshot = await get(this.#dbRef)
            
            if (snapshot.exists()) {
                const userData = snapshot.val();
                const usuarios = Object.keys(userData).map(id => {
                    return {
                        ...userData[id],
                        idUsuario: id
                    }
                })
                return usuarios;
            } else {
                return [];
            }

        } catch (error) {
            console.error('Error dentro de entidad intentando leer los datos', error);
            throw error;
        }
    }

    /**
     * Función encargada de agregar un usuario a la base de datos
     * @async
     * @param {Usuario} usuario   - Objeto tipo usuario
     * @returns {void}                    
     */
    async addUsuario(usuario) {
        try {
            //Creamos el valor de referencia al nuevo nodo de usuario usando push
            const newUsuarioRef = push(this.#dbRef) //Generamos una nueva id de usuario

            await set(newUsuarioRef, 
                {
                    admin: usuario.isAdmin,
                    nombre_completo: usuario.getNombre,
                    cedula: usuario.getCedula,
                    area_trabajo: usuario.getAreaTrabajo,
                    cantidad_bolsillo: usuario.getCantDineroBolsillo,
                    telefono: usuario.getTelefono,
                    correo: usuario.getCorreo,
                    password: usuario.getPassword
                }
            );
        } catch (error) {
            console.error("Error en capa entidad agregando al usuario: ", error);
            throw error;
        }
    }
}
