const formulario = document.getElementById('formulario');
const tipoSelect = document.getElementById('tipo');
const operacionSelect = document.getElementById('operacion');
const carreraSelect = document.getElementById('carreras');
const alumnoSelect = document.getElementById('alumnos');
const nombreInput = document.getElementById('nombre');
const limpiarBtn = document.getElementById('limpiar');
const alumnosLista = document.getElementById('alumnos-lista');
const carrerasLista = document.getElementById('carreras-lista');


let carrerasActuales = [];
let alumnosActuales = [];

let alumnoSeleccionado;
let carreraSeleccionada;

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
    if(tipo !== "alumno" && tipo !== "carrera") return;
    const url = `/${tipo}s/${id}`;
    
    console.log('url',url);
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
 * Funcion para modificar!!
 * @param {*} tipo indica el tipo de entidad a modificar, 'alumno' o 'carrera'
 * @param {*} id el ID del objeto a modificar
 */
function modificar(tipo, id, datos) {
    if(tipo !== "alumno" && tipo !== "carrera") return;
    const url = `/${tipo}s/${id}`;
    
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(res => res.json())
    .then(data => {
        alert(`${tipo} modificado: ID ${data.id}`);
        refreshView(); 
    })
    .catch(err => {
        console.error(`Error al modificar el ${tipo}:`, err);
        alert(`Hubo un error al modificar el ${tipo}!!!`);
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
        const {carreras} = await res.json();
        carrerasActuales = carreras;
        fillSelect(carreraSelect, carrerasActuales);
    } catch (err) {
        console.error('Error al obtener las carreras:', err);
    }
}

//obtener alumnos y mostrar
async function getAlumnos() {
    try {
        const res = await fetch('/alumnos');
        const alumnos = await res.json();
        console.log('alumnos:',alumnos);
        alumnosActuales = alumnos;
        fillSelect(alumnoSelect, alumnos);
    } catch (err) {
        console.error('Error al obtener los alumnos:', err);
    }
}


/**
 * crea un elemento tipo 'option' para el select
 * @param {*} value el valor que tendra esa opcion
 * @param {*} textContent el texto que va a mostrar la opcion en el select
 */
function createSelectOption(value, textContent, select) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = textContent;
    select.appendChild(option);
}

/**
 * si el array del param no esta vacio,
 * llena el select indicado con los elementos del array
 * @param {*} select el elemento select a llenar
 * @param {*} arr el array con los elementos a agregar al select
 */
function fillSelect(select, arr) {
    select.innerHTML = "";
    createSelectOption('', '--Seleccione--', select);
    if (!arr || arr.length === 0) return;
    arr.forEach(entidad => {
        createSelectOption(entidad.id, entidad.nombre, select);
    });
}

/**
 * Actualiza los campos del form cuando cambia la opción
 * de alumno o carrera
 */
async function refreshView() {
  const tipo = tipoSelect.value;
  const operacion = operacionSelect.value;
  const carreraDiv = document.getElementById('carreras-div');
  const listaAlumnosDiv = document.getElementById('alumnos-div');

  const isStudent = tipo === 'alumno';
  const isEditing = operacion === 'eliminar' || operacion === 'modificar';
  const isAdding = operacion === 'agregar';

  nombreInput.disabled = !isAdding;
  carreraSelect.disabled = !(isStudent || (!isStudent && isEditing));
  nombreInput.value = '';
  carreraSelect.value = '';

  carreraDiv.classList.toggle('invisible',!(isStudent || (!isStudent && isEditing)));

  listaAlumnosDiv.classList.toggle('invisible', !(isStudent && isEditing));

  if (isStudent) {
    if (isEditing) {
      await getAlumnos();
    } else if (isAdding) {
      await getMajors();
    }
  }
}


function submitForm(tipo, nombre, operacion){
    const id =  alumnoSeleccionado?.id ?? carreraSeleccionada?.id;
    const msjAlert = 
    `Por favor, seleccione 
    ${tipo==='alumno'?'el alumno ':'la carrera '}
    a ${operacion}`;

    switch (operacion) {
    case 'agregar':
      if (!nombre) {
        alert('El nombre es requerido.');
        return;
    }
      add(tipo, {
        nombre,
        ...(tipo === 'alumno' && { carreraId: document.getElementById('carreras').value })
      });
      break;
    case 'eliminar':
      {
        if (!id) {
            alert(msjAlert);
            return;
        }
        eliminar(tipo, id);
      }
      break;
    case 'modificar':
      {
        if (!id) {
            alert(msjAlert);
            return; 
        }
        modificar(tipo, id, {
          datos: {
            nombre: nombreInput.value,
            ...(tipo === 'alumno' && { carreraId: carreraSelect.value })
          }
        });
      }
      break;
    default:
      console.warn(`Operación desconocida: ${operacion}`);
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

    submitForm(tipo,nombre,operacion);
    formulario.reset();
    refreshView();
});

limpiarBtn.addEventListener('click', () => {
    formulario.reset();
    refreshView();
});

tipoSelect.addEventListener('change', () => {
    refreshView();
});

operacionSelect.addEventListener('change', () => {
    refreshView();
});

carreraSelect.addEventListener('change', () => {
    if(tipoSelect.value === 'carrera'){
        const idCarrera = carreraSelect.value;
        const nombre = carreraSelect.options[carreraSelect.selectedIndex].text;

        nombreInput.value = nombre;
        if(operacionSelect.value === 'modificar') nombreInput.disabled = false;
        carreraSeleccionada = carrerasActuales.find(c =>c.id === idCarrera);
    }
});

alumnoSelect.addEventListener('change', (event) => {
    const idAlumno = event.target.value;
    if(idAlumno){
        const alumno = alumnosActuales.find(alumno => alumno.id === idAlumno);
        alumnoSeleccionado = alumno;
        nombreInput.value = alumno.nombre;
        carreraSelect.value =alumno.id_carrera ? alumno.id_carrera:'';

        const operacion = operacionSelect.value;
        if(operacion === 'modificar'){
            nombreInput.disabled = false;
            carreraSelect.disabled = false;
        }
    }else{
        nombreInput.disabled = true;
        carreraSelect.disabled = true;
    }

});
