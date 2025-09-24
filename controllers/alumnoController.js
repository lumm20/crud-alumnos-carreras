const { buscarAlumno, buscarAlumnos, agregarAlumno, eliminarAlumno, modificarAlumno } = require("../services/alumnoService.js");


const addAlumno = async (req, res) => {
    try {
        const { nombre, carreraId } = req.body;
        if(!nombre) return res.status(400).json({error:'No se ingresó el nombre del alumno'});

        const nuevoAlumno = { nombre, carreraId };
        const alumnoAgregado = await agregarAlumno(nuevoAlumno);
        if(!alumnoAgregado) return res.status(404).json({error:'No se pudo agregar el alumno. Verifique que la carrera exista.'});
        res.status(201).json(alumnoAgregado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAlumnos = async (req, res) => {
    try {
        const alumnos = await buscarAlumnos();
        if(!alumnos[0]) return res.status(200).json({msj:'No hay alumnos registrados',alumnos:alumnos});
        res.status(200).json(alumnos);
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al buscar los alumnos' });
    }
};

const getAlumno = async (req,res) =>{
    const {id} = req.params;
    try {
        const alumno = await buscarAlumno(id);
        if (!alumno) return res.status(404).json({error:'No se encontró el alumno con el ID ingresado'});

        res.status(200).json(alumno);
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al buscar al alumno' });
    }
}

const deleteAlumno = async (req, res) => {
    try {
        const { id } = req.params;
        const alumnoEliminado = await eliminarAlumno(id);
        if(!alumnoEliminado) return res.status(404).json({error:'No se encontró el alumno con el ID ingresado'});
        res.status(200).json({id:alumnoEliminado});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const putAlumno = async (req, res) => {
    try {
        const {id} = req.params;
        const {datos} = req.body;
        if(!datos) return res.status(400).json({error:'No se ingresaron los datos a modificar del alumno'});
        const alumnoModificado = await modificarAlumno(id, datos);
        if(!alumnoModificado) return res.status(404).json({error:'No se encontró el alumno con el ID ingresado'});
        res.status(200).json(alumnoModificado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {getAlumno, addAlumno, getAlumnos, deleteAlumno, putAlumno};