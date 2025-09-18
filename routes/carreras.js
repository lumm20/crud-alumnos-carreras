const express = require('express');
const router = express.Router();
const {getCarrera, addCarrera, getCarreras, eliminarCarrera} = require('../controllers/carreraController');



//Ruta GET para obtener todas las carreras.
router.get('/', getCarreras);
router.get('/:id', getCarrera);

//Ruta GET para obtener la cantidad de carreras.

// router.get('/count', carreraController.obtenerCantidadCarreras);

//Ruta POST para agregar una nueva carrera.
router.post('/', addCarrera);

//Ruta para eliminar una carrera machin
router.delete('/:id', eliminarCarrera);
module.exports = router;