const {
    agregarCarrera, 
    buscarCarreras,
    obtenerCantidadCarreras,} = require('../controllers/carreraController');
const express = require('express');
const router = express.Router();



router.get('/', async (req, res) => {
    try {
        const carrerasActuales = await buscarCarreras();
        
        res.json({carreras:carrerasActuales});
    } catch (error) {
        res.status(500).json({error});
    }
});

router.get('/count', async (req, res) => {
    try {
        const cantidadCarreras = await obtenerCantidadCarreras();
        
        res.json({cantidadCarreras});
    } catch (error) {
        res.status(500).json({error});
    }
});

router.post('/', async (req, res) => {
    const { id, nombre } = req.body;
    
    if (!id || !nombre) {
        return res.status(400).json({ error: 'ID y nombre son requeridos' });
    }
    
    try {
        const carrera = await agregarCarrera({id, nombre});
        console.log('Carrera agregada exitosamente:', carrera);
        res.status(201).json(carrera);
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = router;
