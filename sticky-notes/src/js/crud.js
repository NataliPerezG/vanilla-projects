
// DOM references
const bntAdd = document.querySelector('.btnAdd');
const modalCreate = document.querySelector('.note__create');
const btnSaveNewNote = modalCreate.querySelector('.note__save');

const userCategory = modalCreate.querySelector('#category')
const userTitle = modalCreate.querySelector('.note__input');
const userContent = modalCreate.querySelector('#content');

const template = document.querySelector('.template__note').content;
const fragment = document.createDocumentFragment();
const workspace = document.querySelector('.workspace');
const btnEdit = document.querySelector('.note__edit');

const modalEdit = document.querySelector('.modal__edit');
const btnEditSave = modalEdit.querySelector('.note__save-edit');
const editCategory = modalEdit.querySelector('#category');
const editTitle = modalEdit.querySelector('.note__input');
const editText = modalEdit.querySelector('.note__textarea');

// LocalStorage
const getNotes = () => JSON.parse(localStorage.getItem('notes')) || [];
const saveNotes = () => { localStorage.setItem('notes', JSON.stringify(notes)) }

// Inicialización de datos
let notes = getNotes()

// global variables:
let currentNote = null;
let currentZIndex = 1;
let initialTop = 10;
let initialLeft = 10;
let move = 10

// Functions
const createNewNote = () => {
    const category = userCategory.value
    const title = userTitle.value;
    const content = userContent.value;
    const id = crypto.randomUUID(); // Crea un id único.

    currentZIndex++
    const note = {
        id,
        category,
        title,
        content,
        left: initialLeft + move,
        top: initialTop + move,
        zIndex: currentZIndex,
    };

    initialTop += move;
    initialLeft += move;

    notes.push(note);
    saveNotes()
}

const updateWorkspace = () => {
    workspace.innerHTML = "";
    notes.forEach(note => {
        const clone = template.cloneNode(true);
        const article = clone.querySelector('.note');
        article.dataset.id = note.id;
        article.querySelector('.note__title').textContent = note.title;
        article.querySelector('.note__content').textContent = note.content;
        article.querySelector('.note__category').textContent = note.category;
        // Estilos guardados
        article.style.top = note.top + 'px';
        article.style.left = note.left + 'px';
        article.style.zIndex = note.zIndex || 1;

        fragment.append(article);
    })
    workspace.append(fragment);
}

const bringToFront = (noteElement, noteData) => {
    currentZIndex++
    noteElement.style.zIndex = currentZIndex;
    noteData.zIndex = currentZIndex; //guarda el index en el objeto
    saveNotes()
}

const deleteNote = (e) => {
    const note = e.target.closest('.note');
    if (!note) return;
    const id = note.dataset.id;
    notes = notes.filter(note => note.id !== id);
    saveNotes();
    updateWorkspace()
}

const editNote = (e) => {
    const note = e.target.closest('.note');
    if (!note) return;
    const noteId = note.dataset.id;
    currentNote = notes.find(note => note.id === noteId);

    editCategory.value = currentNote.category;
    editTitle.value = currentNote.title;
    editText.value = currentNote.content;

    modalEdit.showModal();
}

// Events:
bntAdd.addEventListener('click', e => {
    modalCreate.showModal();
})

btnSaveNewNote.addEventListener('click', e => {
    createNewNote();
    updateWorkspace();
    modalCreate.querySelector('.create__form').reset()// limpia el form del dialog para hacer una nueva nota
    modalCreate.close();
})

workspace.addEventListener('click', e => {
    if (e.target.classList.contains('btn-edit')) {
        editNote(e)
    }
    if (e.target.classList.contains('btn-delete')) {
        deleteNote(e)
    }
})

btnEditSave.addEventListener('click', e => {
    if (!currentNote) return
    currentNote.category = editCategory.value;
    currentNote.title = editTitle.value;
    currentNote.content = editText.value;
    saveNotes();
    updateWorkspace();
    modalEdit.close();
    currentNote = null;
})

// ======================================================
// Drag & Drop de las notas
// Este bloque calcula el desplazamiento del cursor
// respecto a la nota y actualiza tanto el DOM como
// el estado de la aplicación cuando termina el arrastre.
// ======================================================

workspace.addEventListener('mousedown', e => {
    const note = e.target.closest('.note');
    if (!note) return
    // Si se hace click en un botón de editar/eliminar, evitamos iniciar el arrastre
    if (e.target.classList.contains('btn-edit') || e.target.classList.contains('btn-delete')) {
        return;
    }

    const noteId = note.dataset.id;
    const noteData = notes.find(n => n.id === noteId);
    if (!noteData) return;

    // Traer al frente y guardar el index
    bringToFront(note, noteData)

    // Inicializamos las posiciones con los valores actuales 
    // para evitar 'undefined' si no hay movimiento
    let posNoteX = noteData.left;
    let posNoteY = noteData.top;

    const rectWorkspace = workspace.getBoundingClientRect();
    const rectNote = note.getBoundingClientRect();
    const offsetX = e.clientX - rectNote.left; //aquí da click el usuario en la nota
    const offsetY = e.clientY - rectNote.top;

    const moveNote = (moveEvent) => {
        let posWorkspaceX = moveEvent.clientX - rectWorkspace.left; //posición del click dentro del workspace
        let posWorkspaceY = moveEvent.clientY - rectWorkspace.top;
        posNoteX = posWorkspaceX - offsetX; //Aquí debe ir la esquina de la nota
        posNoteY = posWorkspaceY - offsetY;

        note.style.left = posNoteX + 'px';
        note.style.top = posNoteY + 'px';
    }

    const stopMove = () => {
        // Limpiamos los eventos al soltar el click
        document.removeEventListener('mousemove', moveNote);
        document.removeEventListener('mouseup', stopMove);

        // Guardamos las coordenadas finales
        noteData.left = posNoteX;
        noteData.top = posNoteY;
        saveNotes();
    };

    document.addEventListener('mousemove', moveNote)
    document.addEventListener('mouseup', stopMove)
})


updateWorkspace()