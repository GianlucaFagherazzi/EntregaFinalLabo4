// Configuracion necesaria para que sequelizerc pueda leer las variables de entorno y usarlas para las migraciones y seeders
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql"
  }
};
