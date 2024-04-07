import { PrismaClient } from '@prisma/client';
import express, { Express } from 'express';
import swaggerJSDoc, { OAS3Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import baseRouter from './api/routes/index.routes';
import { swaggerOptions } from './config/swagger-api.config';
import { EnvConfigKeys } from './utils/constants';
import { Server as SocketServer } from 'socket.io';
import { createServer, Server as HTTPServer } from 'http';

export const Prisma: PrismaClient = new PrismaClient(); // Instancia de Prisma Client, uso global
const app: Express = express();
const httpServer: HTTPServer = createServer(app);
const io: SocketServer = new SocketServer(httpServer, {
  cors: {
    origin: '*', // Asegúrate de configurar el origen correcto en producción
    methods: ['GET', 'POST'],
  },
});

const HOST: string = process.env[EnvConfigKeys.HOST] || 'localhost';
const PORT: number = process.env[EnvConfigKeys.PORT] ? parseInt(process.env[EnvConfigKeys.PORT]) : 4000;

app.use(express.json());

app.use(baseRouter);

const swaggerSpec = swaggerJSDoc(swaggerOptions as OAS3Options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

io.on('connection', socket => {
  console.log('Cliente conectado:', socket.id);

  let secondsPassed = 0;
  const interval = setInterval(() => {
    secondsPassed++;
    socket.emit('status', `Conectado! ${secondsPassed} segundos han pasado.`);

    if (secondsPassed >= 300) {
      // Detener después de 5 minutos (300 segundos)
      clearInterval(interval);
      socket.emit('status', 'Finalizando conexión...');
      socket.disconnect(true);
    }
  }, 1000);

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

// app.listen(PORT, () => {
//   console.log(`Server running on http://${HOST}:${PORT}`);
//   console.log(`Swagger Docs available on http://${HOST}:${PORT}/docs`);
// });

httpServer.listen(PORT, () => {
  console.log(`HTTP and Socket.IO server running on http://${HOST}:${4000}`);
  console.log(`Swagger Docs available on http://${HOST}:${PORT}/docs`);
});
