import UsuarioEntidad from "../entities/UserEntity";

export default class UserManagement_Ctrl{
    /**
     * Constructor de clase UserManagement_Ctrl
    */
    constructor(){}

    async getUsuariosPrograma(){
        const usuariosRetornar = []
        let listaUsuarios = [];
        try {
            const usuarioEntidad = new UsuarioEntidad();
            listaUsuarios = await usuarioEntidad.getUsuarios();

            for (const usuarioData of listaUsuarios){
                const usuario = usuarioEntidad.createUsuarioFromData(usuarioData);
                usuariosRetornar.push(usuario);
            }

            return usuariosRetornar;
        } catch (error) {
            console.error("Error capa controlador extrayendo usuarios del sistema: ", error);
            throw error;
        }
    }
}


