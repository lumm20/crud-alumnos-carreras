
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

module.exports = Alumno;
