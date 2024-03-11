import express, { Express } from 'express';
import swaggerJSDoc, { OAS3Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import baseRouter from './api/routes/index.routes'; // Asegúrate de que la ruta sea correcta
import { swaggerOptions } from './config/swagger-api.config'; // Asegúrate de que la ruta sea correcta
import { EnvConfigKeys } from './utils/constants'; // Asegúrate de que la ruta sea correcta

const app: Express = express();

const HOST: string = process.env[EnvConfigKeys.HOST] || 'localhost';
const PORT: number = process.env[EnvConfigKeys.PORT] ? parseInt(process.env[EnvConfigKeys.PORT]) : 4000;

app.use(express.json());

// Corrige la ruta para incluir el slash inicial
app.use(baseRouter);

// Genera la especificación de Swagger utilizando las opciones configuradas
const swaggerSpec = swaggerJSDoc(swaggerOptions as OAS3Options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
  console.log(`Swagger Docs available on http://${HOST}:${PORT}/docs`);
});
