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
    console.log(entidad);
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
 * Funcion para eliminar!!
 * @param {*} tipo indica el tipo de entidad a agregar, 'alumno' o 'carrera'
 * @param {*} entidad el objeto a eliminar
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
        const data = await res.json();
        console.log('data:',data);
        const { msj, carreras }= data;
        console.log('msj y carreras:',msj, carreras);
        if(msj) {
            alert(msj);
        }
        carrerasActuales = carreras;
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
    createSelectOption('','--Seleccione--');
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

    if (tipo === 'alumno') {
        await getMajors();
        carreraDiv.classList.remove('invisible');
    } else {
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

    let entidad;
    // dependiendo de la opcion seleccionada, se crea un obj de alumno o de carrera
    if (tipo === 'alumno') {
        const carreraId = document.getElementById('carreras').value;
        entidad = { nombre, carreraId };
        console.log('en form:',entidad);
    } else if (tipo === 'carrera') {
        entidad = { nombre };
    }

    // por ahora nomas esta la funcion para agregar ajjajaj
    if (operacion === 'agregar') {
        add(tipo, entidad);
    }

    else if (operacion === 'eliminar') {
        const id = document.getElementById('id').value; 
        if(id) {
            eliminar(tipo, id);
        } else {
            alert('Por favor, ingrese el ID para eliminar.');
        }
    }

    // else if (operacion === 'eliminar') {
    //      eliminar(entidad, tipo === 'alumno' ? alumnos : carreras);
    // } else if (operacion === 'modificar') {
    //      modificar(entidad, tipo === 'alumno' ? alumnos : carreras);
    // }
    formulario.reset();
});

limpiarBtn.addEventListener('click', () => {
    formulario.reset();
    refreshView();
});

tipoSelect.addEventListener('change', () => {
    refreshView();
});