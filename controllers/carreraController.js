const Carrera = require("../models/carrera.js");
const CarreraDao = require("../dao/carreraDao.js");

// Función del controlador para agregar una carrera.
// Recibe los objetos de solicitud (req) y respuesta (res) de Express.
exports.addCarrera = async (req, res) => {
    try {
        const { nombre } = req.body; 
        const nuevaCarrera = { nombre }; 

        const carreraAgregada = await agregarCarrera(nuevaCarrera);
        
        res.status(201).json(carreraAgregada);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.buscarCarreras = async (req, res) => {
    try {
        const carreras = await CarreraDao.buscarCarreras();
        res.status(200).json(carreras);
    } catch (error) {
        console.error('Error al buscar las carreras:', error);
        res.status(500).json({ error: 'Hubo un error al buscar las carreras' });
    }
};

async function obtenerCantidadCarreras() {
    try {
        const cantidadCarreras = await CarreraDao.obtenerCantidadCarreras();
        return cantidadCarreras;
    } catch (error) {
        console.error('Error al obtener la cantidad de carreras:', error);
        throw new Error('Hubo un error al procesar la solicitud');
    }
}

async function buscarCarrera(idCarrera) {
    try {
        const carreraEncontrada = await CarreraDao.buscarCarrera(idCarrera);
        if (!carreraEncontrada) {
            return null;
        }
        const { id, nombre } = carreraEncontrada;
        const carrera = new Carrera(nombre, id);
        return carrera;
    } catch (error) {
        console.error(`Error al buscar la carrera con id ${idCarrera}`, error);
        throw new Error('Hubo un error al buscar la carrera');
    }
}

async function obtenerSiguienteIdCarrera() {
    try {
        const cantidadCarreras = await CarreraDao.obtenerCantidadCarreras();
        return `car-${cantidadCarreras + 1}`;
    } catch (error) {
        throw new Error('No se pudo obtener el siguiente ID de carrera.');
    }
}

async function agregarCarrera(carrera) {
    if (!carrera.nombre) {
        throw new Error('No se ingresó el nombre de la carrera');
    }
    
    const nuevoId = await obtenerSiguienteIdCarrera();
    const carreraExistente = await buscarCarrera(nuevoId);
    
    if (carreraExistente) {
        throw new Error('Ya hay una carrera registrada con ese ID');
    }

    const newCarrera = new Carrera(carrera.nombre, nuevoId);
    try {
        await CarreraDao.agregarCarrera(newCarrera);
        return newCarrera;
    } catch (error) {
        console.error('Hubo un error al agregar la carrera:', error);
        throw new Error('Hubo un error al agregar la carrera');
    }
}

// Exporta las funciones que serán utilizadas por el enrutador.
module.exports.addCarrera = exports.addCarrera;
module.exports.buscarCarreras = exports.buscarCarreras;
module.exports.buscarCarrera = buscarCarrera;
module.exports.obtenerCantidadCarreras = obtenerCantidadCarreras;