const {carreraModel} = require('../models/carrera');

const buscarCarrera = async(idCarrera)=> {
    try {
        const carreraEncontrada = await carreraModel.findOne({id:idCarrera});
        // console.log('carrera encontrada:',carreraEncontrada);
        // if (!carreraEncontrada) return null;
        return carreraEncontrada;
    } catch (error) {
        console.error(`Error al buscar la carrera con id ${idCarrera}`, error);
        throw new Error('Hubo un error al buscar la carrera');
    }
}
const buscarCarreras = async()=> {
    try {
        const res = await carreraModel.find({});
        // console.log(res);
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
        const cantidadCarreras= await carreraModel.countDocuments();
        // console.log('cantidad carreras', cantidadCarreras);
        return `car-${cantidadCarreras + 1}`;
    } catch (error) {
        console.error('Error al obtener el siguiente ID para la carrera',error);
        throw new Error('No se pudo obtener el siguiente ID de la carrera.');
    }
};


const agregarCarrera = async(nombreCarrera) =>{
    try {
        const carreraExistente = await carreraModel.findOne({nombre:nombreCarrera});
        if(carreraExistente)return null;

        const nuevoId = await obtenerSiguienteIdCarrera();
        const newCarrera = { nombre: nombreCarrera, id: nuevoId };

        await carreraModel.create(newCarrera);
        return newCarrera;
    } catch (error) {
        console.error('Hubo un error al agregar la carrera:', error);
        throw new Error('Hubo un error al agregar la carrera');
    }
}

const eliminarCarrera = async (idCarrera) => {
    try {
        const carreraEliminada = await carreraModel.findOneAndDelete({id:idCarrera});
        return carreraEliminada ? carreraEliminada.id:null;
    } catch (error) {
        console.error('Hubo un error al eliminar la carrera:', error);
        throw new Error('Hubo un error al eliminar la carrera');
    }
}

const modificarCarrera = async (idCarrera, datos) => {
    try {
        const carreraModificada = await carreraModel.findOneAndUpdate({id:idCarrera},datos);
        // console.log(carreraModificada);
        return {id:carreraModificada.id,nombre:carreraModificada.nombre};
    } catch (error) {
        console.error('Hubo un error al modificar la carrera:', error);
        throw new Error('Hubo un error al modificar la carrera');
    }
}

module.exports = {buscarCarrera,buscarCarreras, agregarCarrera, eliminarCarrera, modificarCarrera};