const formulario = document.getElementById('formulario');
const tipoSelect = document.getElementById('tipo');
const nombreInput = document.getElementById('nombre');
const limpiarBtn = document.getElementById('limpiar');
const carreraSelect = document.getElementById('carreras');
const alumnosLista = document.getElementById('alumnos-lista');
const carrerasLista = document.getElementById('carreras-lista');


let carrerasActuales = [];

/**
 * Manda las peticiones para agregar un alumno o carrera.
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
        console.log(`${tipo} agregado:`, data);
        alert(`${tipo} agregado: ${data.nombre}`);
        refreshView();
    })
    .catch(err => {
        console.error('Hubo un error en la petición:', err);
        alert('Hubo un error en la petición!!!');
    });
}

/**
 * Funcion para eliminar!!
 * @param {*} tipo indica el tipo de entidad a agregar, 'alumno' o 'carrera'
 * @param {*} id el ID del objeto a eliminar
 */
function eliminar(tipo, id) {
    const url = `/${tipo}s/${id}`;
    fetch(url, {
        method: 'DELETE',
    })
    .then(res => res.json())
    .then(data => {
        alert(`${tipo} eliminado: ID ${data.id}`);
        refreshView(); 
    })
    .catch(err => {
        console.error(`Error al eliminar el ${tipo}:`, err);
        alert(`Hubo un error al eliminar el ${tipo}!!!`);
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
        // El backend ahora solo devuelve el array de carreras directamente.
        carrerasActuales = await res.json();
        fillMajorsSelect();
        displayCarreras(); // Llama a la nueva función para mostrar la lista
    } catch (err) {
        console.error('Error al obtener las carreras:', err);
    }
}

//obtener alumnos y mostrar
async function getAlumnos() {
    try {
        const res = await fetch('/alumnos');
        const alumnos = await res.json();
        alumnosLista.innerHTML = '';
        if (alumnos.length === 0) {
            alumnosLista.innerHTML = '<li>No hay alumnos registrados.</li>';
        }
        alumnos.forEach(alumno => {
            const li = document.createElement('li');
            li.innerHTML = `ID: ${alumno.id}, Nombre: ${alumno.nombre} 
                            <button onclick="eliminar('alumno', '${alumno.id}')">Eliminar</button>`;
            alumnosLista.appendChild(li);
        });
    } catch (err) {
        console.error('Error al obtener los alumnos:', err);
    }
}

//Para mostrar la lista de carreras

function displayCarreras() {
    carrerasLista.innerHTML = '';
    if (carrerasActuales.length === 0) {
        carrerasLista.innerHTML = '<li>No hay carreras registradas.</li>';
    }
    carrerasActuales.forEach(carrera => {
        const li = document.createElement('li');
        li.innerHTML = `ID: ${carrera.id}, Nombre: ${carrera.nombre} 
                        <button onclick="eliminar('carrera', '${carrera.id}')">Eliminar</button>`;
        carrerasLista.appendChild(li);
    });
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
    createSelectOption('', '--Seleccione--');
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
    const operacion = document.getElementById('operacion').value;
    const carreraDiv = document.getElementById('carrera-div');
    const idDiv = document.getElementById('id-div');
    const nombreInput = document.getElementById('nombre');

    if (operacion === 'eliminar' || operacion === 'modificar') {
        idDiv.classList.remove('invisible');
        nombreInput.required = false;
        if(operacion === 'eliminar') {
            nombreInput.classList.add('invisible');
            carreraDiv.classList.add('invisible');
        } else {
             nombreInput.classList.remove('invisible');
        }
    } else {
        idDiv.classList.add('invisible');
        nombreInput.required = true;
        nombreInput.classList.remove('invisible');
        carreraDiv.classList.remove('invisible');
    }

    if (tipo === 'alumno') {
        await getMajors();
        await getAlumnos();
        carreraDiv.classList.remove('invisible');
    } else {
        await getMajors();
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

    console.log(`Operación: ${operacion}, Tipo: ${tipo}, Nombre: ${nombre}`);

    if (operacion === 'agregar') {
        if (!nombre) {
            alert('El nombre es requerido.');
            return;
        }
        let entidad;
        if (tipo === 'alumno') {
            const carreraId = document.getElementById('carreras').value;
            entidad = { nombre, carreraId };
        } else if (tipo === 'carrera') {
            entidad = { nombre };
        }
        add(tipo, entidad);
    }
    else if (operacion === 'eliminar') {
        const id = document.getElementById('id').value;
        if (id) {
            eliminar(tipo, id);
        } else {
            alert('Por favor, ingrese el ID para eliminar.');
        }
    }
    else if (operacion === 'modificar') {
        alert('Modificar no está implementado.');
    }
    formulario.reset();
});

limpiarBtn.addEventListener('click', () => {
    formulario.reset();
    refreshView();
});

tipoSelect.addEventListener('change', () => {
    refreshView();
});