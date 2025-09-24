const {addAlumno, getAlumno, getAlumnos, deleteAlumno, putAlumno} = require('../controllers/alumnoController');
const express = require('express');
const router = express.Router();

router.get('/', getAlumnos);
router.get('/:id', getAlumno);
router.post('/', addAlumno);
router.delete('/:id', deleteAlumno);
router.put('/:id', putAlumno);

module.exports = router;