const { agregarCarrera, buscarCarrera, buscarCarreras} = require('../services/carreraService');

const addCarrera = async (req, res) => {
    try {
        const { nombre } = req.body; 
        if(!nombre) return res.status(400).json({error:'No se ingresó el nombre de la carrera'});

        const carreraAgregada = await agregarCarrera(nuevaCarrera);
        
        res.status(201).json(carreraAgregada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCarreras = async (req, res) => {
    try {
        const carreras = await buscarCarreras();
        if(!carreras[0]) return res.status(200).json({msj:'No hay carreras registradas',carreras:carreras});
        return res.status(200).json({carreras:carreras});
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al buscar las carreras' });
    }
};

const getCarrera = async(req, res)=> {
    const { id } = req.params;
    try {
        const carrera = await buscarCarrera(id);
        if (!carrera) return res.status(404).json({error:'No se encontró la carrera con el ID ingresado'});
        return res.status(200).json(carrera);
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al buscar la carrera' });
    }
}

module.exports = {addCarrera, getCarreras,getCarrera};