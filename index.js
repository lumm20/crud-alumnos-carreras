const express = require('express');
const app = express();
const alumnosRoutes = require('./routes/alumnos.js');
const carrerasRoutes = require('./routes/carreras.js');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db');
connectDB();

// const { sequelize } = require('./models');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/alumnos',alumnosRoutes);
app.use('/carreras',carrerasRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🚀 Servidor iniciado en http://localhost:${port}`);
});

// (async () => {
//     try {
//         await sequelize.authenticate();
//         console.log(' Conectado a la DB');
//         app.listen(port, () => console.log(` Servidor iniciado en http://localhost:${port}`));
//     } catch (e) {
//         console.error(' Error al conectar DB:', e.message);
//         process.exit(1);
//     }
// })();