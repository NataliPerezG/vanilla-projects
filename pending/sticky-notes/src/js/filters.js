
import { notes } from './crud.js'



const buttons = document.querySelectorAll('.filter');

const setFilter = (e) => {
    const filterButton = e.target.closest('.filter');
    const filterCount = filterButton.querySelector('.filter__count').dataset.count;
    console.log(filterCount);
    console.log(notes);
    const notas = notes.filter(nota => nota.category === filterCount);
    console.log(notas.length);

}

buttons.forEach(button => button.addEventListener('click', setFilter))
