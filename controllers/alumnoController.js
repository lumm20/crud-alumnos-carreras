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
    console.log('alumno en controller: ', alumno);
    let alumnoExistente;
    try {
        alumnoExistente = await buscarAlumno(alumno.id);
        console.log(alumnoExistente);
    } catch (error) {
        console.error('Error al buscar el alumno:', error);
        throw new Error('Hubo un error al buscar al alumno');
    }
    if(alumnoExistente) {
        console.warn('Ya hay un alumno registrado con el mismo ID');
        throw new Error('Ya hay un alumno registrado con el mismo ID');
    }
    const carreraId = alumno.carreraId;
    console.log(carreraId);
    let carrera;
    if(carreraId){
        try {
            carrera = await buscarCarrera(carreraId);
        } catch (error) {
            throw error;
        }
        if(!carrera) throw new Error('No existe una carrera con el ID ingresado');
    }
    
    const newAlumno = new Alumno(alumno.nombre, alumno.id, carreraId);
    console.log('nuevo alumno: ',newAlumno);
    try {
        await AlumnoDao.agregarAlumno(newAlumno);
        newAlumno.setCarrera(carrera);
        return newAlumno;
    } catch (error) {
        console.error('Hubo un error al agregar el alumno:',error);
        throw new Error('Hubo un error al agregar el alumno');
    } 

}

module.exports.agregarAlumno = agregarAlumno;
module.exports.obtenerCantidadAlumnos = obtenerCantidadAlumnos;
