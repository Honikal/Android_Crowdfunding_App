import Usuario from "../models/Users";
import Proyecto from "../models/Projects";

import ProyectoEntidad from "../entities/ProjectsEntity";

export default class MyProjects_Ctrl{
    #usuario;
    /**
     * Constructor de clase PaginaInicial_Ctrl
     * @param {Usuario} usuario
     */
     constructor(
        usuario
    ){
        this.#usuario = usuario;
    }

    async getProyectosXID(){
        const proyectosRetornar = [];
        let listaProyectos;
        try {
            const proyectoEntidad = new ProyectoEntidad();
            listaProyectos = await proyectoEntidad.getProyectosByIdUsuario(this.#usuario.getIdUsuario);

            console.log("Lista proyectos de usuario size: ", listaProyectos.length)
            for (const proyectData of listaProyectos) {
                const proyecto = proyectoEntidad.createProyectoFromData(proyectData);
                proyectosRetornar.push(proyecto);
            }

            return proyectosRetornar;
        } catch (error){
            console.error("Error capa controlador extrayendo proyectos: ", error);
            throw error;
        }
    }

}


