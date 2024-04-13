import { Request, Response } from 'express';
import { EmployeeService } from '../../core/app/services/employee.service';

async function createUser(req: Request, res: Response) {
  try {
    if (!req.employee || !req.employee.email) {
      return res.status(401).json({ message: 'User is not authorize' });
    }
    req.body = req.employee;
    const employee = await EmployeeService.create(req.body);

    res.status(201).json({ data: employee });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const EmployeeController = { createUser };



// const createUser = async (req: Request, res: Response) => {
//   try {
//     // Verifica si los detalles del empleado del middleware de autenticación están presentes y son válidos
//     if (!req.employee || !req.employee.email) {
//       return res.status(401).json({ message: 'La información de autorización está incompleta o falta.' });
//     }

//     // Recopila datos adicionales del cuerpo de la solicitud si es necesario
//     const employeeData = {
//       ...req.body,
//       email: req.employee.email,  // Asegura usar el email del token verificado
//       name: req.employee.name || req.body.name,  // Opcional: Prefiere el nombre del token, alternativa del cuerpo de la solicitud
//       user_id: req.employee.uid,  // Incluye el ID de usuario único de la autenticación de Firebase
//     };

//     // Crea el empleado usando el servicio
//     const employee = await EmployeeService.create(employeeData);

//     // Devuelve los datos del empleado creado con un código de estado 201
//     res.status(201).json({ data: employee });
//   } catch (error) {
//     // Maneja diferentes tipos de errores adecuadamente
//     if (error instanceof ValidationError) {
//       return res.status(400).json({ message: error.message });
//     }
//     // Respaldo de error genérico
//     res.status(500).json({ message: 'Error interno del servidor: ' + error.message });
//   }
// };

// export const EmployeeController = { createUser };
