import UsuarioEntidad from "../entities/UserEntity";

export default class UserManagement_Ctrl{
    #usuario
    /**
     * Constructor de clase UserManagement_Ctrl
     * @param {Usuario} usuario
    */
    constructor(
        usuario = null
    )
    {
        this.#usuario = usuario
    }

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
    };

    async updateStateOfAccount(){
        const usuarioEntidad = new UsuarioEntidad();
        await usuarioEntidad.editUsuario(this.#usuario.getIdUsuario,
            {
                activa: this.#usuario.isActiva
            }
        );
        console.log("Cuenta de usuario restringida");
    }
}


