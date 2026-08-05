// DOM references
const bntAdd = document.querySelector('.btnAdd');
const modalCreate = document.querySelector('.note__create');
const btnSaveNewNote = modalCreate.querySelector('.note__save');

const userCategory = modalCreate.querySelector('#category')
const userTitle = modalCreate.querySelector('.note__input');
const userContent = modalCreate.querySelector('#content');

const template = document.querySelector('.template__note').content;
const fragment = document.createDocumentFragment();
const workspace = document.querySelector('.workspace')
const btnEdit = document.querySelector('.note__edit');

const modalEdit = document.querySelector('.modal__edit');
const btnEditSave = modalEdit.querySelector('.note__save-edit');
const editCategory = modalEdit.querySelector('#category');
const editTitle = modalEdit.querySelector('.note__input');
const editText = modalEdit.querySelector('.note__textarea');

// global variables:
let notes = [];
let currentNote = null;


// Functions
const createNewNote = () => {
    const category = userCategory.value
    const title = userTitle.value;
    const content = userContent.value;
    const id = crypto.randomUUID() // Crea un id único.
    const note = {
        id,
        category,
        title,
        content
        // TODO:
        // Cuando se implemente el drag & drop,
        // añadir top y left para persistir la posición.
    }
    notes.push(note)
}

const updateWorkspace = () => {
    workspace.innerHTML = "";
    let initialTop = 10;
    let initialLeft = 10;
    let move = 10

    notes.forEach(note => {
        const clone = template.cloneNode(true);
        const article = clone.querySelector('.note');
        article.dataset.id = note.id;
        article.querySelector('.note__title').textContent = note.title;
        article.querySelector('.note__content').textContent = note.content;
        article.querySelector('.note__category').textContent = note.category;

        article.style.top = (initialTop + move) + 'px';
        article.style.left = (initialLeft + move) + 'px';

        fragment.append(article);

        initialTop += move;
        initialLeft += move;
    })

    workspace.append(fragment)
}

const deleteNote = (e) => {
    const note = e.target.closest('.note');
    const id = note.dataset.id;
    notes = notes.filter(note => note.id !== id);
    updateWorkspace()
}

const editNote = (e) => {
    const note = e.target.closest('.note');
    const noteId = note.dataset.id;
    currentNote = notes.find(note => note.id === noteId);
    modalEdit.showModal();
    editCategory.value = currentNote.category;
    editTitle.value = currentNote.title;
    editText.value = currentNote.content;
}

// Events:
bntAdd.addEventListener('click', e => {
    modalCreate.showModal();
})

btnSaveNewNote.addEventListener('click', e => {
    const data = createNewNote();
    updateWorkspace();
    modalCreate.querySelector('.create__form').reset()
    // limpia el form del dialog para hacer una nueva nota
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
    currentNote.category = editCategory.value;
    currentNote.title = editTitle.value;
    currentNote.content = editText.value;
    updateWorkspace()
    modalEdit.close()
    currentNote = null;
})

