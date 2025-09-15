
const formulario = document.getElementById('formulario');
const tipoSelect = document.getElementById('tipo');
const nombreInput = document.getElementById('nombre');
const limpiarBtn = document.getElementById('limpiar');
const carreraSelect = document.getElementById('carreras');

let carrerasActuales =[];
let siguienteIdAlumno;
let siguienteIdCarrera;

/**
 * manda las peticiones para agregar un alumno o carrera
 * @param {*} tipo indica el tipo de entidad a agregar, 'alumno' o 'carrera'
 * @param {*} entidad el objeto a agregar
 */
function add(tipo, entidad) {
    if (tipo === 'alumno') {
        fetch('/alumnos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entidad)
        })
            .then(res => res.json())
            .then(data => {
                console.log('Alumno agregado:', data.nombre);
                alert(`Alumno agregado: ${data.nombre}`);
            })
            .catch(err => {
                console.error('Hubo un error al agregar el alumno:', err);
                alert('Hubo un error al agregar el alumno!!!');
            });
    } else {
        fetch('/carreras', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entidad)
        })
            .then(res => res.json())
            .then(data => {
                console.log('Carrera agregada:', data.nombre);
                alert(`Carrera agregada: ${data.nombre}`);
            })
            .catch(err => {
                console.error('Hubo un error al agregar la carrera:', err);
                alert('Hubo un error al agregar la carrera!!!');
            });
    }
}

/**
 * obtiene la cantidad de carreras registradas.
 * Esto lo hice para sacar el id para cada carrera que se registre.
 * Por ejemplo, si hay 5 carreras registradas, la siguiente carrera
 * incluira el 6 en su id. El formato del id es car-numero
 */
function getMajorsQuantity(){
    fetch('/carreras/count')
    .then(res => res.json())
    .then(data =>{
        const { cantidadCarreras } = data;
        siguienteIdCarrera = cantidadCarreras+1;
    })
    .catch(err=>{console.error(err);})
}

/**
 * obtiene la cantidad de alumnos registrados.
 * Esto lo hice para sacar el id para cada alumno que se registre.
 * Por ejemplo, si hay 5 alumnos registrados, el siguiente alumno
 * incluira el 6 en su id. El formato del id es alu-numero
 */
function getStudentsQuantity(){
    fetch('/alumnos')
    .then(res => res.json())
    .then(data =>{
        const { cantidadAlumnos } = data;
        siguienteIdAlumno = cantidadAlumnos +1;
    })
    .catch(err=>{console.error(err);})
}

/**
 * obtiene la lista con las carreras registradas.
 * Esto es para llenar las opciones del select de carreras
 * cuando se quiera registrar un alumno nuevo 
 */
function getMajors(){
    fetch('/carreras')
    .then(res => res.json())
    .then(data =>{
        const { carreras } = data;
        carrerasActuales = [...carreras];
    })
    .catch(err=>{console.error(err);})
}

/**
 * crea un elemento tipo 'option' para el select
 * @param {*} value el valor que tendra esa opcion
 * @param {*} textContent el texto que va a mostrar la opcion en el select
 */
function createSelectOption(value, textContent){
    const option = document.createElement('option');
    option.value = value;
    option.textContent = textContent;
    carreraSelect.appendChild(option);
}

/**
 * si el array de carreras no esta vacio,
 * llena el select con las carreras registradas
 */
function fillMajorsSelect() {
    getMajors();
    if(!carrerasActuales[0]) return;
    carreraSelect.innerHTML = "";
    carrerasActuales.forEach(carrera => {
        createSelectOption(carrera.id, carrera.nombre);
    });
}

/**
 * actualiza los campos del form cuando se cambia la opcion
 * de alumno o carrera 
 */
function refreshView() {
    const tipo = tipoSelect.value;
    const carreraDiv = document.getElementById('carrera-div');

    if (tipo === 'alumno') {
        getStudentsQuantity();
        fillMajorsSelect();
        carreraDiv.classList.remove('invisible');
    } else {
        getMajorsQuantity();
        carreraDiv.classList.add('invisible');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    refreshView();
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const tipo = tipoSelect.value;
    const nombre = nombreInput.value;
    const operacion = document.getElementById('operacion').value;
    const id = document.getElementById('id').value;

    console.log(`Operación: ${operacion}, Tipo: ${tipo}, Nombre: ${nombre}`);

    let entidad;
    //dependiendo de la opcion seleccionada, se crea un obj de alumno o de carrera
    if (tipo === 'alumno') {
        const carreraId = document.getElementById('carreras').value;
        entidad = { nombre, id, carreraId }
        console.log(entidad);
    } else if (tipo === 'carrera') {
        entidad = { nombre, id }
    }

    //por ahora nomas esta la funcion para agregar ajjajaj
    if (operacion === 'agregar') {
        add(tipo, entidad);
    } 
    // else if (operacion === 'eliminar') {
    //     eliminar(entidad, tipo === 'alumno' ? alumnos : carreras);
    // } else if (operacion === 'modificar') {
    //     modificar(entidad, tipo === 'alumno' ? alumnos : carreras);
    // }
    formulario.reset();
    refreshView();
});

/**
 * cuando se ingrese texto en el campo del nombre, se va a 
 * llenar en automatico el campo del id
 */
nombreInput.addEventListener('input', () => {
    const nombre = nombreInput.value.trim();
    const idInput = document.getElementById('id');
    const tipo = tipoSelect.value;

    if (!nombre) {
        idInput.value = '';
        return;
    }
    if (tipo === 'alumno') {
        idInput.value = 'alu-'.concat(siguienteIdAlumno);
    } else if (tipo === 'carrera') {
        idInput.value = 'car-'.concat(siguienteIdCarrera);
    }
});

limpiarBtn.addEventListener('click', () => {
    formulario.reset();
});

tipoSelect.addEventListener('change', () => {
    refreshView();
});
