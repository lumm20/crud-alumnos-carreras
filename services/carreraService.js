const Carrera = require('../models/carrera');

const buscarCarrera = async(idCarrera)=> {
    try {
        const carreraEncontrada = await Carrera.findByPk(idCarrera);
        console.log('carrera encontrada:',carreraEncontrada);
        // if (!carreraEncontrada) return null;
        return carreraEncontrada;
    } catch (error) {
        console.error(`Error al buscar la carrera con id ${idCarrera}`, error);
        throw new Error('Hubo un error al buscar la carrera');
    }
}
const buscarCarreras = async()=> {
    try {
        const res = await Carrera.findAll();
        if (!res[0]) return [];
        const carreras = res.map(carrera =>({nombre:carrera.nombre, id:carrera.id}));
        return carreras;
    } catch (error) {
        console.error('Error al buscar las carreras', error);
        throw new Error('Hubo un error al buscar las carreras');
    }
}

const obtenerSiguienteIdCarrera = async () => {
    try {
        const cantidadCarreras= await Carrera.count();
        console.log('cantidad carreras', cantidadCarreras);
        return `car-${cantidadCarreras + 1}`;
    } catch (error) {
        console.error('Error al obtener el siguiente ID para la carrera',error);
        throw new Error('No se pudo obtener el siguiente ID de la carrera.');
    }
};


const agregarCarrera = async(nombreCarrera) =>{
    try {
        const carreraExistente = await Carrera.findOne({where: {nombre:nombreCarrera}});
        if(carreraExistente)return null;

        const nuevoId = await obtenerSiguienteIdCarrera();
        const newCarrera = { nombre: nombreCarrera, id: nuevoId };

        await Carrera.create(newCarrera);
        return newCarrera;
    } catch (error) {
        console.error('Hubo un error al agregar la carrera:', error);
        throw new Error('Hubo un error al agregar la carrera');
    }
}

const eliminarCarrera = async (idCarrera) => {
    try {
        const carreraExistente = await buscarCarrera(idCarrera);
        if (!carreraExistente) return null;
        await carreraExistente.destroy();
        return idCarrera;
    } catch (error) {
        console.error('Hubo un error al eliminar la carrera:', error);
        throw new Error('Hubo un error al eliminar la carrera');
    }
}

const modificarCarrera = async (idCarrera, datos) => {
    try {
        const carreraExistente = await buscarCarrera(idCarrera);
        if (!carreraExistente) return null;
        await carreraExistente.update(datos);
        return {id:carreraExistente.id,nombre:carreraExistente.nombre};
    } catch (error) {
        console.error('Hubo un error al modificar la carrera:', error);
        throw new Error('Hubo un error al modificar la carrera');
    }
}

module.exports = {buscarCarrera,buscarCarreras, agregarCarrera, eliminarCarrera, modificarCarrera};