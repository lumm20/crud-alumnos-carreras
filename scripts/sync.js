const { sequelize } = require('../models');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión OK');
        await sequelize.sync({ alter: true });
        console.log(' Tablas sincronizadas');
        process.exit(0);
    } catch (e) {
        console.error('Error al sincronizar:', e.message);
        process.exit(1);
    }
})();