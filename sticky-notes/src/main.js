import './style.css'


const bntAdd = document.querySelector('.btnAdd');
const modalCreate = document.querySelector('.note__create')
const btnEdit = document.querySelector('.note__edit')
const modalEdit = document.querySelector('.modal__edit')


bntAdd.addEventListener('click', e => {
    modalCreate.showModal()
})


btnEdit.addEventListener('click', e => {
    console.log('edit');
    modalEdit.showModal()

})