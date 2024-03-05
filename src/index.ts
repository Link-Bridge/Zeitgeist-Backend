import express from 'express';

const app = express();
const port = 4000;

app.get('/', (req, res) => {
  res.send('Hola Mundo con Express y TypeScript!');
});

app.listen(port, () => {
  console.log(`Running in http://localhost:${port}`);
});
