/*
class Carrera {
    constructor(nombre,id, alumnos=[]){
        this.nombre = nombre;
        this.id = id;
        this.alumnos = alumnos;
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

    getAlumnos(){
        return this.alumnos;
    }

    setAlumnos(alumnos){
        this.alumnos = alumnos;
    }

    addAlumno(alumno){
        if(!alumno) return;
        if(this.alumnos.find(a => a.getId() === alumno.getId())) return;
        const newArr = [...this.alumnos, alumno];
        this.alumnos = newArr;
    }
}
*/

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.sequelize.js');

const Carrera = sequelize.define('carrera', {
  id: {
    type: DataTypes.STRING(10),
    primaryKey: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'carreras',
  timestamps: false
});

module.exports = Carrera;
