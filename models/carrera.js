// const { Model, DataTypes } = require("sequelize");

// class Carrera extends Model {
//     static initModel(sequelize) {
//         Carrera.init(
//             {
//                 id: {
//                     type: DataTypes.STRING(10),
//                     primaryKey: true,
//                     allowNull: false
//                 },
//                 nombre: {
//                     type: DataTypes.STRING(100),
//                     allowNull: false
//                 }
//             },
//             { sequelize, modelName: 'Carrera', tableName: 'carreras', timestamps: false }
//         );
//         return Carrera;
//     }

// }

// module.exports = Carrera;

const mongoose = require('mongoose');
const { Schema } = mongoose;

const carreraSchema = new Schema({

    id: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    }
}, {
    timestamps: false 
});

module.exports = mongoose.model('Carrera', carreraSchema);