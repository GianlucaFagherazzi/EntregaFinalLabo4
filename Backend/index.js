import { sequelize } from "./src/config/database.js";

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Importar rutas
import userRouter from './src/routes/users.routes.js'
import productRouter from './src/routes/products.routes.js'

const app = express();
dotenv.config();

// Configuraciones del servidor
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'http://localhost';

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/', (req, res) => {
  res.send('Respuesta por defecto');
});

// Sincronizar la base de datos
try {
  await sequelize.authenticate()
  console.log('Conexión a la base de datos establecida con éxito.')
  await sequelize.sync({ /*alter: true */})
  console.log('Tablas sincronizadas correctamente.')
} catch (error) {
  console.error('Error al conectar con la base de datos:', error)
}

app.listen(PORT, () => {
  console.log(`Servidor escuchando en ${"" + HOST + ":" + PORT + ""}`);
});
