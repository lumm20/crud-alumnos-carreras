const db = require('../config/db');

class AlumnoDao {
    constructor() {}

    obtenerCantidadAlumnos() {
        return new Promise((resolve, reject) => {
            const countQuery = `SELECT COUNT(*) AS cantidad FROM alumnos`;
            db.query(countQuery, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    if (result.length > 0) {
                        resolve(result[0].cantidad);
                    } else {
                        resolve(0);
                    }
                }
            });
        });
    }
    buscarAlumno(id) {
        return new Promise((resolve, reject) => {
                const selectQuery =
                    `SELECT *
                    FROM alumnos 
                    WHERE id = ?`;
                db.query(selectQuery, [id], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result[0]);
                    }
                });
            });
    }
    
    agregarAlumno(alumno) {
        return new Promise((resolve, reject) => {
            console.log('DAO - Objeto recibido:', alumno);
            // console.log('DAO - ID a insertar:', alumno.id);
    
            const insertQuery = `INSERT INTO alumnos (id, nombre, id_carrera) VALUES (?, ?, ?)`;
            const values = [alumno.id, alumno.nombre, alumno.carrera];
    
            db.query(insertQuery, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

}

// module.exports.addAlumno = exports.addAlumno;
// module.exports.buscarAlumnos = exports.buscarAlumnos;
// module.exports.obtenerCantidadAlumnos = obtenerCantidadAlumnos;
// module.exports.buscarAlumno = buscarAlumno;

module.exports = new AlumnoDao();