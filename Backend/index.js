import { sequelize } from "./src/config/database.js";
import { errorHandler } from './src/middleware/error.handler.js'
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './src/routes/index.routes.js';

const app = express();
dotenv.config();

// Configuraciones del servidor
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'http://localhost';

// Middlewares
app.use(cors());
app.use(express.json());

// Usar rutas centralizadas
app.use('/api', routes);
app.use(errorHandler);

// Sincronizar la base de datos
try {
  await sequelize.authenticate()
  console.log('Conexión a la base de datos establecida con éxito.')
  await sequelize.sync(/*{ alter: true }*/)
  // await sequelize.sync({ force:true})
  console.log('Tablas sincronizadas correctamente.')
} catch (error) {
  console.error('Error al conectar con la base de datos:', error)
}

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en ${"" + HOST + ":" + PORT + ""}`);
});
