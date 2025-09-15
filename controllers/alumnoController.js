const Alumno = require("../models/alumno.js");
const AlumnoDao = require("../dao/alumnoDao.js");
const {buscarCarrera} = require("./carreraController.js");

async function obtenerCantidadAlumnos(){
    try {
        const cantidadAlumnos = await AlumnoDao.obtenerCantidadAlumnos();
        return cantidadAlumnos;
    } catch (error) {
        console.error('Error al obtener la cantidad de alumnos:', error);
        throw new Error('Hubo un error al procesar la solicitud!!!');
    }
}

async function buscarAlumno(idAlumno){
    try {
        const { id, nombre, nombre_carrera, id_carrera } = await AlumnoDao.buscarAlumno(idAlumno);
        if(!id) return null;
        const alumno = new Alumno(id, nombre, {nombre:nombre_carrera,id:id_carrera});
        return alumno;
    } catch (error) {
        console.error(`Error al buscar al alumno con id ${idAlumno}`, error);
        throw new Error('Hubo un error al buscar al alumno');
    }
}

async function agregarAlumno( alumno){
    if(!alumno) {
        console.warn('No se ingresó la informacion del alumno');
        throw new Error('No se ingresó la informacion del alumno');
    }
    const alumnoExistente = await buscarAlumno(alumno.id);

    if(alumnoExistente) {
        console.warn('Ya hay un alumno registrado con el mismo ID');
        throw new Error('Ya hay un alumno registrado con el mismo ID');
    }
    
    const carreraId = alumno.carreraId;
    if(carreraId){
        const carrera = await buscarCarrera(carreraId);
        if(!carrera) throw new Error('No existe una carrera con el ID ingresado');
    }
    
    //se le agrega el carreraID para guardarse como FK en la bd
    const newAlumno = new Alumno(alumno.nombre, alumno.id, carreraId);
    try {
        await AlumnoDao.agregarAlumno(newAlumno);
        return newAlumno;
    } catch (error) {
        console.error('Hubo un error al agregar el alumno:',error);
        throw new Error('Hubo un error al agregar el alumno');
    } 

}

module.exports.agregarAlumno = agregarAlumno;
module.exports.obtenerCantidadAlumnos = obtenerCantidadAlumnos;
