// const { Model, DataTypes } = require("sequelize");

// class Alumno extends Model {
//     static initModel(sequelize) {
//         Alumno.init(
//             {
//                 id: {
//                     type: DataTypes.STRING(10),
//                     primaryKey: true,
//                     allowNull: false
//                 },
//                 nombre: {
//                     type: DataTypes.STRING(100),
//                     allowNull: false
//                 },
//                 id_carrera: {
//                     type: DataTypes.STRING(10),
//                     allowNull: true
//                 }
//             },
//             { sequelize, modelName: 'Alumno', tableName: 'alumnos', timestamps: false }
//         );
//         return Alumno;
//     }
// }

// module.exports = Alumno;

const mongoose = require('mongoose');
const { Schema } = mongoose;

const alumnoSchema = new Schema({

    id: {
        type: String,
        required: true,
        unique: true 
    },
    nombre: {
        type: String,
        required: true
    },

    id_carrera: {
        type: Schema.Types.ObjectId, 
        ref: 'Carrera', 
        required: false 
    }
}, {
    // Opciones del esquema
    tableName: 'alumnos', 
    timestamps: false 
});

module.exports.alumnoModel = mongoose.model('Alumno', alumnoSchema);