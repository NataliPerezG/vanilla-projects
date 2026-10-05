import "./style.css";
import {
  tasks,
  createNewTask,
  completeTask,
  showFormEditTask,
  updateTask,
  deleteTask,
} from "./js/app.js";
import { printInitialMessage, printTasks } from "./js/ui.js";

// Variables
const form = document.querySelector(".form");
const container = document.querySelector(".tasks");

// funciones
const handlerClick = (e) => {
  if (e.target.nodeName === "SPAN" || e.target.nodeName === "I") {
    completeTask(e);
  }

  if (e.target.classList.contains("fa-pen-to-square")) {
    showFormEditTask(e);
  }

  if (e.target.classList.contains("fa-trash")) {
    deleteTask(e);
  }
};

// Eventos
form.addEventListener("submit", (e) => {
  e.preventDefault();
  createNewTask();
  form.reset();
});

container.addEventListener("click", (e) => {
  handlerClick(e);
});

container.addEventListener("submit", (e) => {
  if (e.target.classList.contains("form-edit")) {
    e.preventDefault();

    const liTask = e.target.closest(".task");
    const id = liTask.dataset.id;
    const newText = e.target.querySelector("input").value;

    updateTask(id, newText);
  }
});

// Ejecución función inicial:
if (tasks.length === 0) {
  printInitialMessage();
} else {
  printTasks(tasks);
}
