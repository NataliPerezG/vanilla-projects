// DOM references
const bntAdd = document.querySelector('.btnAdd');

const modalCreate = document.querySelector('.note__create');
const userCategory = modalCreate.querySelector('#category')
const userTitle = modalCreate.querySelector('.note__input');
const userContent = modalCreate.querySelector('#content');

const template = document.querySelector('.template__note').content;
const fragment = document.createDocumentFragment()
const workspace = document.querySelector('.workspace')

const btnEdit = document.querySelector('.note__edit');
const modalEdit = document.querySelector('.modal__edit')

// global variables:
const notes = [];

// Functions
const getUserData = () => {
    const category = userCategory.value
    const title = userTitle.value;
    const content = userContent.value;
    const note = {
        category,
        title,
        content
    }
    notes.push(note)
    return note
}

const createNewNote = ({ category, title, content }) => {
    workspace.innerHTML = "";
    notes.forEach(note => {
        const clone = template.cloneNode(true);
        clone.querySelector('.note__title').textContent = note.title;
        clone.querySelector('.note__content').textContent = note.content;
        clone.querySelector('.note__category').textContent = note.category;
        fragment.append(clone)
        console.log(fragment);

    })
    workspace.append(fragment)
    console.log(notes);
}

// Events:
bntAdd.addEventListener('click', e => {
    modalCreate.showModal();
    const btnSaveNewNote = modalCreate.querySelector('.note__save')
    btnSaveNewNote.addEventListener('click', e => {
        const data = getUserData();
        createNewNote(data);
        modalCreate.close();
    })
})


