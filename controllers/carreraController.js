const Carrera = require("../models/carrera.js");
const CarreraDao = require("../dao/carreraDao.js");

async function obtenerCantidadCarreras(){
    try {
        const cantidadCarreras = await CarreraDao.obtenerCantidadCarreras();
        return cantidadCarreras;
    } catch (error) {
        console.error('Error al obtener la cantidad de carreras:', error);
        throw new Error('Hubo un error al procesar la solicitud');
    }
}

async function buscarCarreras(){
    try {
        const carreras = await CarreraDao.buscarCarreras();
        return carreras;
    } catch (error) {
        console.error('Error al buscar las carreras:', error);
        throw new Error('Hubo un error al buscar las carreras');
    }
}

async function buscarCarrera(idCarrera){
    try {
        const {id, nombre} = await CarreraDao.buscarCarrera(idCarrera);
        if(!id) return null;

        const carrera = new Carrera(nombre,id);
        return carrera;
    } catch (error) {
        console.error(`Error al buscar la carrera con id ${idCarrera}`, error);
        throw new Error('Hubo un error al buscar la carrera ');
    }
}

async function agregarCarrera( carrera){
    if(!carrera) throw new Error('No se ingresó la información de la carrera');
    let carreraExistente;
    try {
        carreraExistente = await buscarCarrera(carrera.id);
    } catch (error) {
        console.error(`Error al buscar la carrera con id ${id}:`,error);
        throw new Error('Hubo un error al buscar la carrera ingresada');
    }
    if(carreraExistente) throw new Error('Ya hay una carrera registrada con ese ID');

    const newCarrera = new Carrera(carrera.nombre, carrera.id);
    try {
        await CarreraDao.agregarCarrera(newCarrera);
        return newCarrera;
    } catch (error) {
        console.error('Hubo un error al agregar la carrera:',error);
        throw new Error('Hubo un error al agregar la carrera');
    }
}

module.exports.agregarCarrera= agregarCarrera;
module.exports.buscarCarrera = buscarCarrera;
module.exports.buscarCarreras = buscarCarreras;
module.exports.obtenerCantidadCarreras = obtenerCantidadCarreras;