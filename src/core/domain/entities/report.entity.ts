import { Task } from './task.entity';
import { Project } from './project.entity';

/**
 * @brief Esta clase establece la estructura de la entidad Statistics
 *
 * @param total: Number
 * @param done: Number
 * @param in_progress: Number
 * @param under_revision: Number
 * @param delayed: Number
 * @param postponed: Number
 * @param not_started: Number
 * @param cancelled: Number
 *
 * @return void
 *
 * @description La estructura contempla el estatus que puede tener una tarea.
 * Está pensada para hacer un conteo global y por fase, facilitando la 
 * creación de reportes y el análisis del progreso en un proyecto.
 * 
 */

export interface Statistics {
    /**
     * @param total: Number - Numero de tareas totales de un proyecto
     */    
      total: Number
  
    /**
     * @param done: Number - Numero de tareas en estatus de 'done' de un proyecto
     */    
      done: Number,
  
    /**
     * @param in_progress: Number - Numero de tareas en estatus de 'in progress' de un proyecto
     */   
      in_progress: Number,
      
    /**
     * @param under_revision: Number - Numero de tareas en estatus de 'under_revision' de un proyecto
     */   
      under_revision: Number,
  
    /**
     * @param delayed: Number - Numero de tareas en estatus de 'delayed' de un proyecto
     */   
      delayed: Number,
  
    /**
     * @param postponed: Number - Numero de tareas en estatus de 'postponed' de un proyecto
     */   
      postponed: Number,
  
    /**
     * @param not_started: Number - Numero de tareas en estatus de 'not started' de un proyecto
     */   
      not_started: Number,
  
    /**
     * @param cancelled: Number - Numero de tareas en estatus de 'cancelled' de un proyecto
     */   
      cancelled: Number
  }


/**
 * @brief Esta clase establece la estructura de la entidad Report
 *
 * @param project: Project
 * @param tasks: Task[]
 * @param statistics: Statistics
 *
 * @return void
 *
 * @description La estructura pretende englobar en un solo objeto 
 * la información que integra un reporte.
 * 
 */

export interface Report {
    /**
     * @param project: Project - Datos de un proyecto
     */   
      project: Project;
  
   /**
     * @param tasks: Task[] - Arreglo de las tareas que corresponden al proyecto
     */   
      tasks?: Task[] | null;
  
    /**
     * @param statistics: Statistics - Estadísticas de las tareas del proyecto
     */   
      statistics?: Statistics | null;
  }