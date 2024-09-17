import Usuario from "../models/Users";
import Proyecto from "../models/Projects";

import ProyectoEntidad from "../entities/ProjectsEntity";
import UsuarioEntidad from "../entities/UserEntity";

export default class SearchPage_Ctrl{
    /**
     * Constructor de clase SearchPage_Ctrl
     */
    constructor(
    ){
    }

    //Convertimos el tipo de fecha a Date
    parseDate(dateString) {
        const [day, month, year] = dateString.split('/');
        return new Date(`${year}-${month}-${day}`);
    }

    //Calcular diferencia de fechas
    calculateDaysDifference(startDate, endDate) {
        const diffTime = endDate - startDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays;
    }

    //Calcular porcentaje de fondos recaudados
    calculateFundraisingPercentage(fondosRecaudados, objetivoFinanciero) {
        const percentage = (fondosRecaudados / objetivoFinanciero) * 100;
        return Math.round(percentage); //Redondeamos el porcentaje al entero más cercano
    }

    /**
     * Se encarga de retornar true si observa que un query cumple una similitud al texto del projecto
     * @async
     * @param {String} projectName       Nombre del proyecto a checar
     * @param {String} query             Query a buscar de la página
     * @returns {Boolean}                Retorna true si encuentra similitudes, false si no
    */
    static checkQueryInProjectName = function(projectName, query) {
        const q = query.toLowerCase();
        console.log("Value of query to test: ", q);

        return projectName.toLowerCase().includes(q);
    }

    async createProyectoFromData ( proyectoData ) {
        //Extraemos la data de la base de datos de la manera
        const {
            idProyecto,
            id_creador,
            nombre,
            descripcion,
            categoria,
            objetivo_financiero,
            fondos_recaudados,
            fecha_creacion,
            fecha_limite,
            media
        } = proyectoData;

        try {
            const usuarioEntidad = new UsuarioEntidad();
            const creadorData = usuarioEntidad.createUsuarioFromData(await usuarioEntidad.getUsuarioByID(id_creador))
            
            const creadorNombre = creadorData.getNombre;

            //Manejamos las fechas
            const today = new Date();
            const fechaInicio = this.parseDate(fecha_creacion);
            const fechaFin = this.parseDate(fecha_limite);
            
            let estado_proyecto = true;
            let diasRestantes = 0;

            if (fechaInicio > today){
                estado_proyecto = false;  //Proyecto no ha iniciado aún
            } else {
                estado_proyecto = true;
                diasRestantes = this.calculateDaysDifference(fechaInicio, fechaFin);
            }

            //Calcular el porcentaje alcanzado
            const porcentajeFondos = this.calculateFundraisingPercentage(fondos_recaudados, objetivo_financiero);

            //Retornamos un proyecto nuevo
            const proyectoEnriquecido = {
                idProyecto,
                id_creador,
                nombre,
                descripcion,
                categoria,
                creadorNombre,
                estado_proyecto,
                diasRestantes,
                porcentajeFondos,
                media
            }

            return proyectoEnriquecido;
        } catch (error) {
            console.error("Error desde la capa de control creando un objeto práctico: ");
            throw error;
        }
    }

    async getTodosLosProyectos(){
        const proyectosRetornar = [];
        let listaProyectos;
        try {
            const proyectoEntidad = new ProyectoEntidad();
            listaProyectos = await proyectoEntidad.getProyectos();

            console.log("Lista proyectos size: ", listaProyectos.length)

            for (const proyectData of listaProyectos) {
                const proyecto = await this.createProyectoFromData(proyectData);
                proyectosRetornar.push(proyecto);
            }

            return proyectosRetornar;
        } catch (error){
            console.error("Error capa controlador extrayendo proyectos: ", error);
            throw error;
        }
    }


    //Métodos de filtro de proyectos
    /**
     * Se encarga de filtrar una lista de proyectos con base al tipo de query recibido
     * @async
     * @param {[Proyecto]} proyectos      Lista de proyectos previamente extraídos
     * @param {String} query              Query de búsqueda a realizar
     * @returns {Error}                   Si existe un error durante la creación del proyecto
    */
    static filterProyectosWithQuery(proyectos, query){
        return proyectos.filter(proyecto => {
            return this.checkQueryInProjectName(proyecto.nombre, query);
        })
    }

    /**
     * Se encarga de filtrar una lista de proyectos con base al tipo de query recibido
     * @async
     * @param {[Proyecto]} proyectos      Lista de proyectos previamente extraídos
     * @param {String} category           Categorización de proyectos a buscar
     * @returns {Error}                   Si existe un error durante la creación del proyecto
    */
    static filterProyectosByCategory(proyectos, category){
        return proyectos.filter(proyecto => proyecto.categoria.toLowerCase() === category.toLowerCase());
    }
}


