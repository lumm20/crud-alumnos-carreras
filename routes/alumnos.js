// const express =require('express');
// const {agregarAlumno, obtenerCantidadAlumnos} = require('../controllers/alumnoController');


// const router = express.Router();

// router.get('/', async (req, res) => {
//     try {
//         const alumnosActuales = await obtenerCantidadAlumnos();        

//         res.json({cantidadAlumnos:alumnosActuales});
//     } catch (error) {
//         res.status(500).json({error})
//     }
// });

// router.post('/', async (req, res) => {
//     const { id, nombre, carreraId } = req.body;
    
//     if (!nombre || !id ) {
//         return res.status(400).json({ error: 'ID y nombre son requeridos' });
//     }
//     console.log('body: ',id,nombre,carreraId);
//     try {
//         const alumno = await agregarAlumno({id, nombre, carreraId});
//         console.log(alumno);
//         res.status(201).json(alumno);

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({error:'Hubo un error al agregar el alumno'});
//     }
// });
// module.exports= router;


const express = require('express');
const router = express.Router();
const alumnoController = require('../controllers/alumnoController');

//Ruta GET para obtener todos los alumnos.
router.get('/', alumnoController.buscarAlumnos);

//Ruta POST para agregar un nuevo alumno.
router.post('/', alumnoController.addAlumno);

module.exports = router;