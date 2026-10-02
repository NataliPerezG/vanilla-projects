// Variables desde el DOM
const form = document.querySelector(".form");
const input = document.querySelector("input");
const btnAddTask = document.querySelector("button[type=submit]");
const tasksList = document.querySelector(".tasks");
const dateUser = document.querySelector(".date>p");

// Variables de la app

// EStas variables contienen los nombres de las clases que se agregarán o quitarán según corresponda
const classUncheck = "fa-circle";
const classCheck = "fa-circle-check";
const classCompleted = "task-completed";

let id = 0;
let arrayTasks = JSON.parse(localStorage.getItem("toDo-devCode"));

// Funciones

const printDate = () => {
  const date = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  let fecha = date.toLocaleDateString("es-CO", options);
  // Inicial en mayúscula:
  fecha = fecha.at(0).toLocaleUpperCase() + fecha.slice(1);
  dateUser.textContent = fecha;
};

printDate();

const addNewTask = (text, id, completed, deleted) => {
  if (deleted) return;

  let iconClass, textClass;

  if (completed) {
    iconClass = classCheck;
    textClass = classCompleted;
  } else {
    iconClass = classUncheck;
    textClass = "";
  }

  const task = `
        <li class="task" id="${id}">
          <button>
            <i class="fa-regular ${iconClass}" data-btnCompl="realizado"></i>
          </button>
          <p class="${textClass}">${text}</p>
          <button>
            <i class="fa-regular fa-trash-can" data-btnDel="eliminado"></i>
          </button>
        </li>`;

  tasksList.insertAdjacentHTML("afterbegin", task);
};

const dataTask = JSON.parse(localStorage.getItem("toDo-devCode"));
if (dataTask) {
  dataTask.forEach((task) => {
    addNewTask(task.text, task.id, task.completed, task.deleted);
  });
  id = dataTask.length;
} else {
  arrayTasks = [];
  id = 0;
}

const completeTask = (icono) => {
  icono.classList.toggle(classCheck);
  icono.classList.toggle(classUncheck);

  // busca al elemento padre para bajar de nuevo al texto:
  const task = icono.closest(".task");
  const text = task.querySelector("p");
  text.classList.toggle(classCompleted);

  console.log(arrayTasks);

  arrayTasks[task.id].completed = arrayTasks[task.id].completed ? false : true;
  localStorage.setItem("toDo-devCode", JSON.stringify(arrayTasks));
};

const deleteTask = (icono) => {
  // busca al elemento padre para removerlo:
  const task = icono.closest(".task");
  task.remove();

  arrayTasks[task.id].deleted = true;
  localStorage.setItem("toDo-devCode", JSON.stringify(arrayTasks));
};

// Listeners

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  addNewTask(text, id, false, false);
  arrayTasks.push({
    text,
    id,
    completed: false,
    deleted: false,
  });

  id++;

  localStorage.setItem("toDo-devCode", JSON.stringify(arrayTasks));
  input.value = "";
  input.autofocus;
});

tasksList.addEventListener("click", (e) => {
  const element = e.target;
  // selecciona el icono según su dataset
  if (e.target.dataset.btncompl === "realizado") {
    completeTask(element);
    return;
  }
  if (e.target.dataset.btndel === "eliminado") {
    deleteTask(element);
    return;
  }
});
