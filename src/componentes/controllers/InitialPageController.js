import Usuario from "../models/Users";
import Proyecto from "../models/Projects";

import ProyectoEntidad from "../entities/ProjectsEntity";
import UsuarioEntidad from "../entities/UserEntity";

export default class InitialPage_Ctrl{
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

    
}


