const express = require('express');
const app = express();
const alumnosRoutes = require('./routes/alumnos.js');
const carrerasRoutes = require('./routes/carreras.js');
const db = require('./config/db');
const path = require('path');
const PORT = 3000;

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos.');


    // db.end((err) => {
    //     if (err) {
    //         console.error('Error al desconectar de la base de datos:', err);
    //     } else {
    //         console.log('Desconexión exitosa de la base de datos.');
    //     }
    // });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/alumnos',alumnosRoutes);
app.use('/carreras',carrerasRoutes);

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});