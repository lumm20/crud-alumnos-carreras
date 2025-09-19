const db = require('../config/db');

/**
 * clase de acceso a datos para la tabla de Carreras
 */
class CarreraDao {
    constructor() { }

    /**
     * Obtiene el numero total de registros en la tabla carreras
     * @returns Una promesa con el numero de carreras registradas
     */
    obtenerCantidadCarreras() {
        return new Promise((resolve, reject) => {
            const countQuery = `SELECT COUNT(*) AS cantidad FROM carreras`;
            db.query(countQuery, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    if (result.length === 0) {
                        resolve(0);
                    } else {
                        resolve(result[0].cantidad);
                    }
                }
            });
        });
    }

    /**
     * Obtiene la lista con todas las carreras registradas
     * @returns Una promesa con el array con todos los registros de carreras
     */
    buscarCarreras() {
        return new Promise((resolve, reject) => {
            const selectQuery = `SELECT * FROM carreras`;
            db.query(selectQuery, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    /**
     * Obtiene una carrera a partir del id del parámetro
     * @param {*} id por el cual se va a buscar la carrera
     * @returns Una promesa con el resultado de la carrera encontrada con el id del parámetro. Null si no se encontró.
     */
    buscarCarrera(id) {
        return new Promise((resolve, reject) => {
            const selectQuery = `SELECT * FROM carreras WHERE id = ?`;
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
     * Agrega un registro de carrera en la tabla.
     * @param {*} carrera Entidad de tipo Carrera con los datos a registrar
     * @returns Una promesa con el resultado de la inserción del registro 
     */
    agregarCarrera(carrera) {
        return new Promise((resolve, reject) => {
            // TERCERA VERIFICACIÓN: Asegúrate de que el objeto 'carrera' que llega aquí tiene la propiedad 'id'.
            console.log('DAO - Objeto de carrera recibido:', carrera);
            console.log('DAO - ID a insertar:', carrera.id);

            const insertQuery = `INSERT INTO carreras (id, nombre) VALUES (?, ?)`;
            const values = [carrera.id, carrera.nombre];

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
     * 
     * @param {*} id 
     * @returns 
     */
    eliminar(id) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM carreras WHERE id = ?';
            db.query(query, [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id });
                }
            });
        });
    }

   /**
    * Modifica un registro de carrera de la tabla.
    * @param {*} id El ID de la carrera a modificar.
    * @param {*} datos Los datos a modificar en el registro.
    * @returns Una promesa con el resultado de la modificacion.
    */
    modificar(id, datos) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE carreras SET nombre = ?  WHERE id = ?';
            const values = [datos.nombre, id];

            db.query(query, values, (err,) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id });
                }
            });
        });
    }

}
module.exports = new CarreraDao();