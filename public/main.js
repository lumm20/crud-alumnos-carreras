const formulario = document.getElementById('formulario');
const tipoSelect = document.getElementById('tipo');
const nombreInput = document.getElementById('nombre');
const limpiarBtn = document.getElementById('limpiar');
const carreraSelect = document.getElementById('carreras');

let carrerasActuales = [];

/**
 * manda las peticiones para agregar un alumno o carrera.
 * El backend se encarga de asignar el ID.
 * @param {*} tipo indica el tipo de entidad a agregar, 'alumno' o 'carrera'
 * @param {*} entidad el objeto a agregar
 */
function add(tipo, entidad) {
    const url = tipo === 'alumno' ? '/alumnos' : '/carreras';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(entidad)
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            console.error('Hubo un error:', data.error);
            alert(`Error: ${data.error}`);
            return;
        }
        console.log(`${tipo} agregado:`, data.nombre);
        alert(`${tipo} agregado: ${data.nombre}`);
        refreshView();
    })
    .catch(err => {
        console.error('Hubo un error en la petición:', err);
        alert('Hubo un error en la petición!!!');
    });
}

/**
 * obtiene la lista con las carreras registradas.
 * Esto es para llenar las opciones del select de carreras
 * cuando se quiera registrar un alumno nuevo.
 */
async function getMajors() {
    try {
        const res = await fetch('/carreras');
        // Asegúrate de que el backend siempre devuelva un array en la respuesta
        carrerasActuales = await res.json();
        fillMajorsSelect();
    } catch (err) {
        console.error('Error al obtener las carreras:', err);
    }
}

/**
 * crea un elemento tipo 'option' para el select
 * @param {*} value el valor que tendra esa opcion
 * @param {*} textContent el texto que va a mostrar la opcion en el select
 */
function createSelectOption(value, textContent) {
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
    carreraSelect.innerHTML = "";
    if (!carrerasActuales || carrerasActuales.length === 0) return;
    carrerasActuales.forEach(carrera => {
        createSelectOption(carrera.id, carrera.nombre);
    });
}

/**
 * actualiza los campos del form cuando se cambia la opcion
 * de alumno o carrera
 */
async function refreshView() {
    const tipo = tipoSelect.value;
    const carreraDiv = document.getElementById('carrera-div');

    // No necesitas obtener la cantidad de alumnos/carreras si el backend se encarga de los IDs
    if (tipo === 'alumno') {
        await getMajors();
        carreraDiv.classList.remove('invisible');
    } else {
        carreraDiv.classList.add('invisible');
    }
    // No se usa formulario.reset() aquí para no limpiar el formulario inmediatamente después de un cambio
}


document.addEventListener('DOMContentLoaded', () => {
    refreshView();
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const tipo = tipoSelect.value;
    const nombre = nombreInput.value;
    const operacion = document.getElementById('operacion').value;

    console.log(`Operación: ${operacion}, Tipo: ${tipo}, Nombre: ${nombre}`);

    let entidad;
    // dependiendo de la opcion seleccionada, se crea un obj de alumno o de carrera
    if (tipo === 'alumno') {
        const carreraId = document.getElementById('carreras').value;
        entidad = { nombre, carreraId };
    } else if (tipo === 'carrera') {
        entidad = { nombre };
    }

    // por ahora nomas esta la funcion para agregar ajjajaj
    if (operacion === 'agregar') {
        add(tipo, entidad);
    }
    // else if (operacion === 'eliminar') {
    //      eliminar(entidad, tipo === 'alumno' ? alumnos : carreras);
    // } else if (operacion === 'modificar') {
    //      modificar(entidad, tipo === 'alumno' ? alumnos : carreras);
    // }
    formulario.reset();
});

/**
 * Se elimina la lógica de autollenado del ID.
 * La asignación de ID ahora la maneja el backend.
 */
nombreInput.addEventListener('input', () => {
    const idInput = document.getElementById('id');
    const tipo = tipoSelect.value;
    if (tipo === 'alumno' || tipo === 'carrera') {
        idInput.value = 'El ID se asignará automáticamente';
    } else {
        idInput.value = '';
    }
});


limpiarBtn.addEventListener('click', () => {
    formulario.reset();
    refreshView();
});

tipoSelect.addEventListener('change', () => {
    refreshView();
});