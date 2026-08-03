import './style.css'


const bntAdd = document.querySelector('.btnAdd');
const modalCreate = document.querySelector('.note__create')

bntAdd.addEventListener('click', e => {
    modalCreate.showModal()
})
