
const formulario = document.getElementById('formulario');
const tipoSelect = document.getElementById('tipo');
const nombreInput = document.getElementById('nombre');
const limpiarBtn = document.getElementById('limpiar');
const carreraSelect = document.getElementById('carreras');

let carrerasActuales =[];
let siguienteIdAlumno;
let siguienteIdCarrera;

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

function getMajorsQuantity(){
    fetch('/carreras')
    .then(res => res.json())
    .then(data =>{
        const { cantidadCarreras } = data;
        siguienteIdCarrera = cantidadCarreras+1;
    })
    .catch(err=>{console.error(err);})
}

function createSelectOption(value, textContent){
    const option = document.createElement('option');
    option.value = value;
    option.textContent = textContent;
    carreraSelect.appendChild(option);
}

function fillMajorsSelect() {
    fetch('/alumnos')
        .then(res => res.json())
        .then(data => {
            const { cantidadAlumnos, carreras } = data;
            siguienteIdAlumno = cantidadAlumnos +1;
            carreraSelect.innerHTML = "";
            

            carreras.forEach(carrera => {
                const option = document.createElement('option');
                option.value = carrera.id;
                option.textContent = carrera.nombre;
                carreraSelect.appendChild(option);
            });
            carrerasActuales = [...carreras];
        })
        .catch(err =>{
            console.error(err);
        });

}


function refreshView() {
    const tipo = tipoSelect.value;
    const carreraDiv = document.getElementById('carrera-div');

    if (tipo === 'alumno') {
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
    if (tipo === 'alumno') {
        const carreraId = document.getElementById('carreras').value;
        entidad = { nombre, id, carreraId }
        console.log(entidad);
    } else if (tipo === 'carrera') {
        entidad = { nombre, id }
    }

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
