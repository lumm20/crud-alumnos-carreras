const {addAlumno, getAlumno, getAlumnos} = require('../controllers/alumnoController');

const express = require('express');
const router = express.Router();

//Ruta GET para obtener todos los alumnos.
router.get('/', getAlumnos);
router.get('/:id', getAlumno);

//Ruta POST para agregar un nuevo alumno.
router.post('/', addAlumno);

module.exports = router;