import { sequelize } from "./src/config/database.js";
import { errorHandler } from './src/middleware/error.handler.js'
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './src/routes/index.routes.js';

const app = express();
dotenv.config();

// Middlewares
app.use(cors({
  origin: "*"
}));

app.use(express.json());

// Usamos rutas centralizadas
app.use('/api', routes);
app.use('/', (req, res) => { res.send(' Api funcionando, revisar a que ruta estás entrando'); }); // Respuesta por defecto en caso de que entren a una ruta no definida
app.use(errorHandler);

// Se sincroniza la base de datos
try {
  await sequelize.authenticate()
  console.log('Conexión a la base de datos establecida con éxito.')
  await sequelize.sync() // { Alter:true } para actualizar tablas sin perder datos, { force:true } para eliminar y recrear tablas
  console.log('Tablas sincronizadas correctamente.')
} catch (error) {
  console.error('Error al conectar con la base de datos:', error)
}

app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
  console.log("Server running");
});
