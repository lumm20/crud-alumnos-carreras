const AlumnoDao = require('../dao/alumnoDao');
const Alumno = require('../models/alumno');
const { buscarCarrera } = require('./carreraService');

const buscarAlumno = async (idAlumno) => {
    try {
        const { id, nombre, id_carrera } = await AlumnoDao.buscarAlumno(idAlumno);
        if (!id) return null;
        const alumno = new Alumno( nombre,id, id_carrera);
        return alumno;
    } catch (error) {
        throw new Error('Hubo un error al buscar al alumno');
    }
};

const buscarAlumnos = async () => {
    try {
        const resultados = await AlumnoDao.buscarAlumnos();
        if (!resultados[0]) return [];
        const alumnos = resultados.map(alumno=>new Alumno(alumno.nombre,alumno.id, alumno.id_carrera));
        return alumnos;
    } catch (error) {
        console.log(error);
        throw new Error('Hubo un error al buscar los alumnos');
    }
};

const obtenerSiguienteIdAlumno = async () => {
    try {
        const cantidadAlumnos = await AlumnoDao.obtenerCantidadAlumnos();
        return `alu-${cantidadAlumnos + 1}`;
    } catch (error) {
        throw new Error('No se pudo obtener el siguiente ID de alumno.');
    }
};

const agregarAlumno = async (alumno) => {
    if (!alumno || !alumno.nombre) {
        console.warn('No se ingresó la informacion del alumno');
        throw new Error('No se ingresó la informacion del alumno');
    }

    const carreraId = alumno.carreraId  || null;
    if (carreraId) {
        const carrera = await buscarCarrera(carreraId);
        if (!carrera) throw new Error('No existe una carrera con el ID ingresado');
    }

    try {
        const nuevoId = await obtenerSiguienteIdAlumno();
        // console.log('ID generado en el controlador:', nuevoId);

        const newAlumno = new Alumno( alumno.nombre, nuevoId, carreraId);
        await AlumnoDao.agregarAlumno(newAlumno);
        return newAlumno;
    } catch (error) {
        console.error('Hubo un error al agregar el alumno:', error);
        throw new Error('Hubo un error al agregar el alumno');
    }
};

const eliminarAlumno = async (idAlumno) => {
    try {
        const id = await AlumnoDao.eliminar(idAlumno);
        return id;
    } catch (error) {
        console.error('Hubo un error al eliminar el alumno:', error);
        throw new Error('Hubo un error al eliminar el alumno');
    }
}

const modificarAlumno = async (idAlumno, datos) => {
    try {
        if(!datos.carrera) datos.carrera=null;
        const id = await AlumnoDao.modificar(idAlumno,datos);
        return id;
    } catch (error) {
        console.error('Hubo un error al modificar el alumno:', error);
        throw new Error('Hubo un error al modificar el alumno');
    }
}
module.exports = {
    buscarAlumno,
    buscarAlumnos,
    agregarAlumno,
    eliminarAlumno,
    modificarAlumno,
};
