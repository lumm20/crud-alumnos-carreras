const { Model, DataTypes } = require("sequelize");

class Carrera extends Model {
    static initModel(sequelize) {
        Carrera.init(
            {
                id: {
                    type: DataTypes.STRING(10),
                    primaryKey: true,
                    allowNull: false
                },
                nombre: {
                    type: DataTypes.STRING(100),
                    allowNull: false
                }
            },
            { sequelize, modelName: 'Carrera', tableName: 'carreras', timestamps: false }
        );
        return Carrera;
    }

}

module.exports = Carrera;
