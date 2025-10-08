const {alumnoModel} = require('../models/alumno');
const { buscarCarrera } = require('./carreraService');

const buscarAlumno = async (idAlumno) => {
    try {
        const alumno = await alumnoModel.findOne({id:idAlumno}).populate('id_carrera');
        // console.log(alumno);
        // if (!alumno) return null;
        return alumno;
    } catch (error) {
        console.error('Error al buscar al alumno:', error);
        throw new Error('Hubo un error al buscar al alumno');
    }
};

const buscarAlumnosPorCarrera = async (idCarrera) => {
    try {
        const carrera = await buscarCarrera(idCarrera);
        if(!carrera) return null;
        const resultados = await alumnoModel.find({id_carrera:idCarrera});
        // console.log(resultados);
        if (!resultados[0]) return [];
        const alumnos = resultados.map(alumno=>({nombre:alumno.nombre,id:alumno.id, id_carrera:carrera.id}));
        return alumnos;
    } catch (error) {
        console.error('Error al buscar los alumnos por carrera:', error);
        throw new Error('Hubo un error al buscar los alumnos');
    }
};
const buscarAlumnos = async () => {
    try {
        const resultados = await alumnoModel.find({}).populate('id_carrera');
        if (!resultados[0]) return [];
        const alumnos = resultados.map(alumno=>({nombre:alumno.nombre,id:alumno.id, id_carrera:alumno.id_carrera.id ||null}));
        return alumnos;
    } catch (error) {
        console.error('Error al buscar los alumnos:', error);
        throw new Error('Hubo un error al buscar los alumnos');
    }
};

const obtenerSiguienteIdAlumno = async () => {
    try {
        const cantidadAlumnos = await alumnoModel.countDocuments();
        return `alu-${cantidadAlumnos + 1}`;
    } catch (error) {
        console.error('Error al obtener el siguiente ID de alumno:', error);
        throw new Error('No se pudo obtener el siguiente ID de alumno.');
    }
};

const agregarAlumno = async (alumno) => {
    const carreraId = alumno.id_carrera  || null;
    let carrera;
    if (carreraId) {
        carrera = await buscarCarrera(carreraId);
        if (!carrera) return null;
    }

    try {
        const nuevoId = await obtenerSiguienteIdAlumno();

        const newAlumno = {nombre: alumno.nombre, id: nuevoId, id_carrera: carrera._id||null};
        await alumnoModel.create(newAlumno);
        newAlumno.id_carrera = carreraId;
        return newAlumno;
    } catch (error) {
        console.error('Hubo un error al agregar el alumno:', error);
        throw new Error('Hubo un error al agregar el alumno');
    }
};

const eliminarAlumno = async (idAlumno) => {
    try {
        const alumnoEliminado = await alumnoModel.findOneAndDelete({id:idAlumno});
        // console.log(alumnoEliminado);
        return alumnoEliminado ? alumnoEliminado.id:null;
    } catch (error) {
        console.error('Hubo un error al eliminar el alumno:', error);
        throw new Error('Hubo un error al eliminar el alumno');
    }
}

const modificarAlumno = async (idAlumno, datos) => {
    try {
        const idCarrera = datos.id_carrera|| null;
        if(idCarrera){
            const carrera = await buscarCarrera(idCarrera);
            if(!carrera) return null;
            datos.id_carrera= carrera._id;
        }

        const alumnoModficado = await alumnoModel.findOneAndUpdate({id:idAlumno},datos);
        // console.log(alumnoModficado);
        return alumnoModficado ? 
        {id:alumnoModficado.id,nombre:alumnoModficado.nombre, id_carrera:idCarrera} :
        null;
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
