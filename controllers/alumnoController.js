const { buscarAlumno, agregarAlumno} = require("../services/alumnoService.js");

const addAlumno = async (req, res) => {
    try {
        const { nombre, carreraId } = req.body;
        if(!nombre) return res.status(400).json({error:'No se ingresó el nombre del alumno'});

        const nuevoAlumno = { nombre, carreraId };
        const alumnoAgregado = await agregarAlumno(nuevoAlumno);
        return res.status(201).json(alumnoAgregado);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getAlumnos = async (req, res) => {
    try {
        const alumnos = await AlumnoDao.buscarAlumnos();
        res.status(200).json(alumnos);
    } catch (error) {
        console.error('Error al buscar los alumnos:', error);
        res.status(500).json({ error: 'Hubo un error al buscar los alumnos' });
    }
};

const getAlumno = async (req,res) =>{
    const {id} = req.params;
    if(!id) return res.status(401).json({error:'No se ingresó el ID del alumno'});
    try {

        const alumno = await buscarAlumno(id);
        if (!id) return res.status(404).json({error:'No se encontró el alumno con el ID ingresado'});

        return res.status(200).json(alumno);
    } catch (error) {
        console.error(`Error al buscar al alumno con id ${id}`, error);
        return res.status(500).json({ error: 'Hubo un error al buscar al alumno' });
    }
}

module.exports = {getAlumno, addAlumno, getAlumnos};