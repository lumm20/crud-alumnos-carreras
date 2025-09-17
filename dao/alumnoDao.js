const Alumno = require("../models/alumno.js");
const AlumnoDao = require("../dao/alumnoDao.js");
const { buscarCarrera } = require('../controllers/carreraController.js');


// Controlador para manejar la solicitud POST para agregar un alumno.
exports.addAlumno = async (req, res) => {
    try {
        const { nombre, carreraId } = req.body;
        const nuevoAlumno = { nombre, carreraId };
        
        const alumnoAgregado = await agregarAlumno(nuevoAlumno);
        res.status(201).json(alumnoAgregado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.buscarAlumnos = async (req, res) => {
    try {
        const alumnos = await AlumnoDao.buscarAlumnos();
        res.status(200).json(alumnos);
    } catch (error) {
        console.error('Error al buscar los alumnos:', error);
        res.status(500).json({ error: 'Hubo un error al buscar los alumnos' });
    }
};

async function obtenerCantidadAlumnos() {
    return new Promise((resolve, reject) => {
        const countQuery = `SELECT COUNT(*) AS cantidad FROM alumnos`;
        db.query(countQuery, (err, result) => {
            if (err) {
                reject(err);
            } else {
                if (result.length > 0) {
                    resolve(result[0].cantidad);
                } else {
                    resolve(0);
                }
            }
        });
    });
}
async function buscarAlumno(idAlumno) {
    try {
        const { id, nombre, nombre_carrera, id_carrera } = await AlumnoDao.buscarAlumno(idAlumno);
        if (!id) return null;
        const alumno = new Alumno(id, nombre, { nombre: nombre_carrera, id: id_carrera });
        return alumno;
    } catch (error) {
        console.error(`Error al buscar al alumno con id ${idAlumno}`, error);
        throw new Error('Hubo un error al buscar al alumno');
    }
}

async function obtenerSiguienteIdAlumno() {
    try {
        const cantidadAlumnos = await AlumnoDao.obtenerCantidadAlumnos();
        return `alu-${cantidadAlumnos + 1}`;
    } catch (error) {
        throw new Error('No se pudo obtener el siguiente ID de alumno.');
    }
}

async function agregarAlumno(alumno) {
    return new Promise((resolve, reject) => {
        console.log('DAO - Objeto recibido:', alumno);
        console.log('DAO - ID a insertar:', alumno.id);

        const insertQuery = `INSERT INTO alumnos (id, nombre, id_carrera) VALUES (?, ?, ?)`;
        const values = [alumno.id, alumno.nombre, alumno.carreraId];

        db.query(insertQuery, values, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports.addAlumno = exports.addAlumno;
module.exports.buscarAlumnos = exports.buscarAlumnos;
module.exports.obtenerCantidadAlumnos = obtenerCantidadAlumnos;
module.exports.buscarAlumno = buscarAlumno;