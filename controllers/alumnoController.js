const Alumno = require("../models/alumno.js");
const AlumnoDao = require("../dao/alumnoDao.js");
const { buscarCarrera } = require("./carreraController.js");

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
    try {
        const cantidadAlumnos = await AlumnoDao.obtenerCantidadAlumnos();
        return cantidadAlumnos;
    } catch (error) {
        console.error('Error al obtener la cantidad de alumnos:', error);
        throw new Error('Hubo un error al procesar la solicitud!!!');
    }
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
    if (!alumno || !alumno.nombre) {
        console.warn('No se ingresó la informacion del alumno');
        throw new Error('No se ingresó la informacion del alumno');
    }
    
    const nuevoId = await obtenerSiguienteIdAlumno();
    
    console.log('ID generado en el controlador:', nuevoId);
    
    const alumnoExistente = await buscarAlumno(nuevoId);

    if (alumnoExistente) {
        console.warn('Ya hay un alumno registrado con el mismo ID');
        throw new Error('Ya hay un alumno registrado con el mismo ID');
    }

    const carreraId = alumno.carreraId;
    if (carreraId) {
        const carrera = await buscarCarrera(carreraId);
        if (!carrera) throw new Error('No existe una carrera con el ID ingresado');
    }

    const newAlumno = new Alumno(nuevoId, alumno.nombre, carreraId);
    try {
        await AlumnoDao.agregarAlumno(newAlumno);
        return newAlumno;
    } catch (error) {
        console.error('Hubo un error al agregar el alumno:', error);
        throw new Error('Hubo un error al agregar el alumno');
    }
}

module.exports.addAlumno = exports.addAlumno;
module.exports.buscarAlumnos = exports.buscarAlumnos;
module.exports.obtenerCantidadAlumnos = obtenerCantidadAlumnos;
module.exports.buscarAlumno = buscarAlumno;