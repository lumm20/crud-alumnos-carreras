const express = require('express');
const router = express.Router();
const {getCarrera, addCarrera, getCarreras, deleteCarrera, putCarrera} = require('../controllers/carreraController');



router.get('/', getCarreras);
router.get('/:id', getCarrera);
router.post('/', addCarrera);
router.delete('/:id', deleteCarrera);
router.put('/:id',putCarrera);
module.exports = router;