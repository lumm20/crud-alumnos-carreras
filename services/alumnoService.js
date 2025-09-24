const Alumno = require('../models/alumno');
const { buscarCarrera } = require('./carreraService');

const buscarAlumno = async (idAlumno) => {
    try {
        const alumno = await Alumno.findByPk(idAlumno) || {};
        console.log('alumno encontrado:',alumno);
        // if (!alumno) return null;
        return alumno;
    } catch (error) {
        console.error('Error al buscar al alumno:', error);
        throw new Error('Hubo un error al buscar al alumno');
    }
};

const buscarAlumnosPorCarrera = async (idCarrera) => {
    try {
        const resultados = await Alumno.findAll({ where: { id_carrera: idCarrera } });
        if (!resultados[0]) return [];
        const alumnos = resultados.map(alumno=>({nombre:alumno.nombre,id:alumno.id, id_carrera:alumno.id_carrera}));
        return alumnos;
    } catch (error) {
        console.error('Error al buscar los alumnos por carrera:', error);
        throw new Error('Hubo un error al buscar los alumnos');
    }
};
const buscarAlumnos = async () => {
    try {
        const resultados = await Alumno.findAll();
        if (!resultados[0]) return [];
        const alumnos = resultados.map(alumno=>({nombre:alumno.nombre,id:alumno.id, id_carrera:alumno.id_carrera}));
        return alumnos;
    } catch (error) {
        console.error('Error al buscar los alumnos:', error);
        throw new Error('Hubo un error al buscar los alumnos');
    }
};

const obtenerSiguienteIdAlumno = async () => {
    try {
        const cantidadAlumnos = await Alumno.count();
        return `alu-${cantidadAlumnos + 1}`;
    } catch (error) {
        console.error('Error al obtener el siguiente ID de alumno:', error);
        throw new Error('No se pudo obtener el siguiente ID de alumno.');
    }
};

const agregarAlumno = async (alumno) => {
    const carreraId = alumno.carreraId  || null;
    if (carreraId) {
        const carrera = await buscarCarrera(carreraId);
        if (!carrera) return null;
    }

    try {
        const nuevoId = await obtenerSiguienteIdAlumno();
        // console.log('ID generado en el controlador:', nuevoId);

        const newAlumno = {nombre: alumno.nombre, id: nuevoId, id_carrera: carreraId};
        await Alumno.create(newAlumno);
        return newAlumno;
    } catch (error) {
        console.error('Hubo un error al agregar el alumno:', error);
        throw new Error('Hubo un error al agregar el alumno');
    }
};

const eliminarAlumno = async (idAlumno) => {
    try {
        const alumnoExistente = await buscarAlumno(idAlumno);
        if (!alumnoExistente) return null;
        await alumnoExistente.destroy();
        return idAlumno;
    } catch (error) {
        console.error('Hubo un error al eliminar el alumno:', error);
        throw new Error('Hubo un error al eliminar el alumno');
    }
}

const modificarAlumno = async (idAlumno, datos) => {
    try {
        const alumnoExistente = await buscarAlumno(idAlumno);
        if (!alumnoExistente) return null;
        await alumnoExistente.update({nombre:datos.nombre, id_carrera:datos.carreraId});
        return {id:alumnoExistente.id,nombre:alumnoExistente.nombre};
    } catch (error) {
        console.error('Hubo un error al modificar el alumno:', error);
        throw new Error('Hubo un error al modificar el alumno');
    }
}
module.exports = {
    buscarAlumno,
    buscarAlumnos,
    buscarAlumnosPorCarrera,
    agregarAlumno,
    eliminarAlumno,
    modificarAlumno,
};
