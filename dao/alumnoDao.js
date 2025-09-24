const db = require('../config/db');

class AlumnoDao {
    constructor() { }

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

    buscarAlumnos() {
        return new Promise((resolve, reject) => {
            const selectQuery =
                `SELECT *
                    FROM alumnos`;
            db.query(selectQuery, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
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

    buscarAlumnosPorCarrera(carrera) {
        return new Promise((resolve, reject) => {
            const selectQuery =
                `SELECT *
                    FROM alumnos 
                    WHERE id_carrera = ?`;
            db.query(selectQuery, [carrera], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
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



    /**
     * Elimina un registro de alumno de la tabla.
     * @param {*} id El ID del alumno a eliminar.
     * @returns Una promesa con el resultado de la eliminación.
     */
    eliminar(id) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM alumnos WHERE id = ?';
            db.query(query, [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    // Devuelve el ID del registro eliminado
                    resolve({ id });
                }
            });
        });
    }
    /**
     * Modifica un registro de alumno de la tabla.
     * @param {*} id El ID del alumno a modificar.
     * @param {*} datos Los datos a modificar en el registro.
     * @returns Una promesa con el resultado de la modificacion.
     */
    modificar(id, datos) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE alumnos SET nombre = ? , id_carrera = ? WHERE id = ?';
            const values = [datos.nombre, datos.carrera, id];

            db.query(query, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id });
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