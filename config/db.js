// const { Sequelize } = require('sequelize');
// require('dotenv').config();

// const sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
//         dialect: 'mysql',
//         logging: false,
//     }
// );
// module.exports = sequelize;

// config/db.js o donde gestiones tu conexión

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Usa tu cadena de conexión de MongoDB
    await mongoose.connect('mongodb://localhost:27017/universidad_db');
    console.log('MongoDB Conectado ✅');
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;