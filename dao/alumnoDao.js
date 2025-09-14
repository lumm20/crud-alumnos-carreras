const db = require('../config/db');

/**
 * clase de acceso a datos para la tabla de Carreras
 */
class AlumnoDao {
    constructor() { }

    /**
     * Obtiene el numero total de registros en la tabla carreras
     * @returns Una promesa con el numero de carreras registradas
     */
    obtenerCantidadAlumnos() {
        return new Promise((resolve, reject) => {
            const countQuery = `SELECT COUNT(*) AS cantidad FROM alumnos`;
            db.query(countQuery, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result[0].cantidad);
                }
            });
        });
    }

    /**
     * Obtiene un alumno a partir del id del parámetro
     * @returns Una promesa con el alumno encontrado. 
     */
    buscarAlumno(id) {
        return new Promise((resolve, reject) => {
            const selectQuery =
                `SELECT a.*, c.nombre AS nombre_carrera
            FROM alumnos a  
            LEFT JOIN carreras c ON a.id_carrera = c.id
            WHERE a.id = '${id}'`;
            const values = [id];
            db.query(selectQuery, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result[0]);
                }
            });
        });
    }

    /**
     * Agrega un registro de alumno en la tabla.
     * @param {*} carrera Entidad de tipo Alumno con los datos a registrar
     * @returns Una promesa con el resultado de la inserción del registro 
     */
    agregarAlumno(alumno) {
        return new Promise((resolve, reject) => {
            const insertQuery = `INSERT INTO alumnos (id, nombre,id_carrera) VALUES (?, ?, ?)`;
            const values = [alumno.id, alumno.nombre, alumno.carrera ? alumno.carrera : null];


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
module.exports = new AlumnoDao();