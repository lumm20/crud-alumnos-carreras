/*

class Alumno{
    constructor(nombre, id, carrera=null){
        this.nombre = nombre;
        this.id = id;
        this.carrera = carrera;
    }

    getCarrera(){
        return this.carrera;
    }

    setCarrera(carrera){
        this.carrera = carrera;
    }

    getId(){
        return this.id;
    }

    getNombre(){
        return this.nombre;
    }

    setNombre(nombre){
        this.nombre = nombre;
    }
}

*/

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.sequelize.js');

const Alumno = sequelize.define('alumno', {
  id: {
    type: DataTypes.STRING(10),
    primaryKey: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  id_carrera: {
    type: DataTypes.STRING(10),
    allowNull: true
  }
}, {
  tableName: 'alumnos',
  timestamps: false
});

module.exports = Alumno;
