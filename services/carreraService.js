const Carrera = require('../models/carrera');
const CarreraDao = require('../dao/carreraDao');

const buscarCarrera = async(idCarrera)=> {
    try {
        const carreraEncontrada = await CarreraDao.buscarCarrera(idCarrera);
        if (!carreraEncontrada) return null;
        const { id, nombre } = carreraEncontrada;
        const carrera = new Carrera(nombre, id);
        return carrera;
    } catch (error) {
        console.error(`Error al buscar la carrera con id ${idCarrera}`, error);
        throw new Error('Hubo un error al buscar la carrera');
    }
}
const buscarCarreras = async()=> {
    try {
        const res = await CarreraDao.buscarCarreras();
        const carreras = res.map(carrera => new Carrera(carrera.nombre, carrera.id));
        return carreras;
    } catch (error) {
        console.error('Error al buscar las carreras', error);
        throw new Error('Hubo un error al buscar las carreras');
    }
}

const obtenerSiguienteIdCarrera = async () => {
    try {
        const cantidadCarreras= await CarreraDao.obtenerCantidadCarreras();
        return `car-${cantidadCarreras + 1}`;
    } catch (error) {
        console.error('Error al obtener el siguiente ID para la carrera',error);
        throw new Error('No se pudo obtener el siguiente ID de la carrera.');
    }
};


const agregarCarrera = async(nombreCarrera) =>{
    if (!nombreCarrera) throw new Error('No se ingresó el nombre de la carrera');
    
    try {
        const nuevoId = await obtenerSiguienteIdCarrera();
        // const carreraExistente = await buscarCarrera(nuevoId);
        
        // if (carreraExistente) {
        //     throw new Error('Ya hay una carrera registrada con ese ID');
        // }

        const newCarrera = new Carrera(nombreCarrera, nuevoId);
        await CarreraDao.agregarCarrera(newCarrera);
        return newCarrera;
    } catch (error) {
        console.error('Hubo un error al agregar la carrera:', error);
        throw new Error('Hubo un error al agregar la carrera');
    }
}

module.exports = {buscarCarrera,buscarCarreras, agregarCarrera};