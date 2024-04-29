import { TaskStatus } from '../../../utils/enums/index';

/**
 * @brief This class defines the structure of the Task entity
 *
 * @param id: string - Unique identifier of the task
 * @param title: string - Title of the task
 * @param description: string - Description of the task
 * @param status: TaskStatus - Status of the task
 * @param waitingFor: string - Employee needed to proceed with the task (optional)
 * @param startDate: Date - Start date of the task
 * @param endDate: Date - End date of the task (optional)
 * @param workedHours: number - Hours worked on the task (optional)
 * @param createdAt: Date - Task creation date
 * @param updatedAt: Date - Last modification date (optional)
 * @param idProject: string - Unique identifier of the associated project
 *
 * @return void
 *
 * @description The structure contains the schema data of a Task, with some attributes identified as optional, which are not required for a task.
 */

export interface Task {
  /**
   * @param id: string - Unique identifier of the task
   */
  id: string;

  /**
   * @param title: string - Title of the task
   */
  title: string;

  /**
   * @param description: string - Description of the task
   */
  description: string;

  /**
   * @param status: TaskStatus - Status of the task
   */
  status: TaskStatus;

  /**
   * @param startDate: Date - Start date of the task
   */
  startDate: Date;

  /**
   * @param endDate: Date - End date of the task (optional)
   */
  endDate?: Date;

  /**
   * @param workedHours: number - Hours worked on the task (optional)
   */
  workedHours?: number;

  /**
   * @param createdAt: Date - Task creation date
   */
  createdAt: Date;

  /**
   * @param updatedAt: Date - Last modification date (optional)
   */

  updatedAt?: Date;

  /**
   * @param idProject: string - Unique identifier of the associated project
   */
  idProject: string;
}

/**
 * Interface representing the payload from the client to create a task
 *
 * @param title: string - Title of the task
 * @param description: string - Description of the task
 * @param status: TaskStatus - Status of the task
 * @param startDate: Date - Start date of the task
 * @param dueDate: Date | null - Due date of the task
 * @param workedHours: number | null - Worked hours of the task
 * @param idProject: string - Project id of the task
 * @param employeeId: string - Employee id of the task
 */
export interface BareboneTask {
  title: string;
  description: string;
  status: TaskStatus;
  startDate: Date;
  dueDate: Date | null;
  workedHours: number | null;
  idProject: string;
  idEmployee: string;
}

/**
 * @brief This class defines the structure of a Task that will be updated
 *
 * @param id: string
 * @param title: string
 * @param description: string
 * @param status: TaskStatus
 * @param startDate: Date
 * @param endDate: Date
 * @param workedHours: Number
 * @param createdAt: Date
 * @param updatedAt: Date
 * @param idProject: string
 *
 * @return void
 *
 * @description The structure contains the schema data of an UpdatedtTask, with all attributes identified as optional, because the user can update any of them.
 */

export interface UpdatedTask {
  /**
   * @param id: string - The unique identifier of the task
   */
  id: string;

  /**
   * @param title: string - The title of the task
   */
  title?: string;

  /**
   * @param description: string - The description of the task
   */
  description?: string;

  /**
   * @param status: TaskStatus - The status of the task
   */
  status?: TaskStatus;

  /**
   * @param startDate: Date - Start date of the task
   */
  startDate?: Date;

  /**
   * @param endDate: Date - End date of the task
   */
  endDate?: Date;

  /**
   * @param workedHours: number - Number of hours worked on the task
   */
  workedHours?: number;

  /**
   * @param createdAt: Date - The creation date of the task
   */
  createdAt?: Date;

  /**
   * @param updatedAt: Date - The last modification date of the task
   */

  updatedAt?: Date;

  /**
   * @param idProject: string - The project associated with the task
   */
  idProject?: string;

  /**
   * @param idEmployee: string - The employee associated with the task
   */
  idEmployee?: string;
}
