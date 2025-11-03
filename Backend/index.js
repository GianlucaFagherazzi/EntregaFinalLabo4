const express = require('express');
const cors = require('cors');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());

const userRouter = require('./src/routes/users');
const productRouter = require('./src/routes/products');
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

// Puerto
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'http://localhost';

app.listen(PORT, () => {
  console.log(`Servidor escuchando en ${"" + HOST + ":" + PORT + ""}`);
});
