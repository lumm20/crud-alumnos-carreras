const Sequelize = require('sequelize');
const sequelize = require('../config/db.sequelize.js');

const Carrera = require('./carrera');
const Alumno = require('./alumno');

//Para definir relaciones (aun en beta)
Carrera.hasMany(Alumno, { foreignKey: 'id_carrera' });
Alumno.belongsTo(Carrera, { foreignKey: 'id_carrera' });

const db = {
  Sequelize,
  sequelize,
  Carrera,
  Alumno
};

module.exports = db;