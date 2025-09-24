const sequelize = require('../config/db');
const Alumno = require('./alumno');
const Carrera = require('./carrera');

const AlumnoModel = Alumno.initModel(sequelize);
const CarreraModel = Carrera.initModel(sequelize);

CarreraModel.hasMany(AlumnoModel, {
    foreignKey: { name: 'id_carrera', allowNull: true },
    as: 'alumnos',
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
});

AlumnoModel.belongsTo(CarreraModel, {
    foreignKey: { name: 'id_carrera', allowNull: true },
    as: 'carrera'
});

module.exports = {
    sequelize,
    Alumno: AlumnoModel,
    Carrera: CarreraModel
};