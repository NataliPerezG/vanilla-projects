// Referencias del dom
const input = document.querySelector('.userInput');
const btnAdd = document.querySelector('.addTask');
const taskContainer = document.querySelector('.containerTasks');
const template = document.querySelector('.templateTask').content

// Estado inicial
const crearEstadoInicial = () => (
    {
        tareas: [],
        tareaEnEdicion: null
    })

// Tareas en localStorage
const guardarEstado = () => {
    localStorage.setItem('tareas', JSON.stringify(estadoApp))
}

const cargarEstado = () => {
    const tareas = localStorage.getItem('tareas');
    if (!tareas) return crearEstadoInicial();
    return JSON.parse(tareas)
}

const estadoApp = cargarEstado()

// funciones auxiliarese
const obtenerDatos = () => {
    const texto = (input.value).trim();
    if (!texto) return
    input.value = '';
    input.focus()
    return texto
}

const crearTarea = (texto) => {
    if (!texto) return
    return {
        id: crypto.randomUUID(),
        text: texto,
        completed: false,
    }
};

const renderTask = () => {
    taskContainer.innerHTML = '';
    const fragment = document.createDocumentFragment()
    estadoApp.tareas.forEach(task => {
        const clone = template.cloneNode(true);
        const li = clone.querySelector('.task');
        li.dataset.taskId = task.id;
        li.classList.toggle('completed', task.completed);
        clone.querySelector('.taskText').textContent = task.text;
        if (task.id === estadoApp.tareaEnEdicion) {
            clone.querySelector('.task').classList.add('editing');
        }
        fragment.append(clone)
    });
    btnAdd.textContent = estadoApp.tareaEnEdicion
        ? 'Guardar'
        : 'Crear';
    taskContainer.append(fragment);
}

const editarTarea = (id) => {
    const taskToEdit = estadoApp.tareas.find(tarea => tarea.id === id)
    input.value = taskToEdit.text;
    input.focus()
    estadoApp.tareaEnEdicion = id;
}

const actualizarTarea = (texto) => {
    const idTaskEditing = estadoApp.tareaEnEdicion;
    estadoApp.tareas = estadoApp.tareas.map(tarea => {
        if (tarea.id !== idTaskEditing) return tarea
        return {
            ...tarea,
            text: texto,
        }
    })
    estadoApp.tareaEnEdicion = null;
}

const borrarTarea = (id) => {
    estadoApp.tareas = estadoApp.tareas.filter(task => task.id !== id);
}

const terminarTarea = (id) => {
    estadoApp.tareas = estadoApp.tareas.map(tarea => {
        if (tarea.id !== id) return tarea
        return {
            ...tarea,
            completed: !tarea.completed
        }
    })
}

// orquestadores
const crearTareas = (e) => {
    e.preventDefault();
    const texto = obtenerDatos();
    if (estadoApp.tareaEnEdicion) {
        actualizarTarea(texto)
    } else {
        estadoApp.tareas.push(crearTarea(texto));
    };
    guardarEstado();
    renderTask();
}

const gestionarTareas = (e) => {
    const li = e.target.closest('.task');
    if (!li) return
    const id = li.dataset.taskId

    if (e.target.classList.contains('editTask')) {
        editarTarea(id, li);
    }
    if (e.target.classList.contains('deleteTask')) {
        borrarTarea(id)
    }
    if (e.target.classList.contains('check')) {
        terminarTarea(id);
    }
    renderTask();
    guardarEstado();
}


// Eventos
btnAdd.addEventListener('click', crearTareas);
taskContainer.addEventListener('click', gestionarTareas)


renderTask();
