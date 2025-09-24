const { sequelize, Alumno, Carrera } = require('../models');

(async () => {
    try {
        await sequelize.authenticate();
        const [sis, tia, adm] = await Promise.all([
            Carrera.findOrCreate({ where: { id: 'car-1',nombre: 'Ingeniería en Software' } }),
            Carrera.findOrCreate({ where: { id: 'car-2',nombre: 'Ingeniería en Electrónica' } }),
            Carrera.findOrCreate({ where: { id: 'car-3',nombre: 'Licenciatura en Administración' } })
        ]).then(r => r.map(x => x[0]));


        const [maria] = await Alumno.findOrCreate({ where: { id: 'alu-1', nombre: 'María' } });
        const [juan] = await Alumno.findOrCreate({ where: { id: 'alu-2', nombre: 'Juan' } });
        const [ana] = await Alumno.findOrCreate({ where: { id: 'alu-3', nombre: 'Ana' } });
        await maria.update({ id_carrera: sis.id });
        await juan.update({ id_carrera: tia.id });
        
        // Ana queda sin carrera
        console.log(' Seed listo');
        process.exit(0);
    } catch (e) {
        console.error(' Error en seed:', e.message);
        process.exit(1);
    }
})();
