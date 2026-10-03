import "./style.css";
import {
  tasks,
  createNewTask,
  completeTask,
  editTask,
  deleteTask,
} from "./js/app.js";
import { printInitialMessage, printTasks } from "./js/ui.js";

const form = document.querySelector(".form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  createNewTask();
  form.reset();
});

const handlerClick = (e) => {
  if (e.target.nodeName === "SPAN" || e.target.nodeName === "I") {
    completeTask(e);
  }

  if (e.target.classList.contains("fa-pen-to-square")) {
    editTask(e);
  }

  if (e.target.classList.contains("fa-trash")) {
    deleteTask(e);
  }
};

const container = document.querySelector(".tasks");
container.addEventListener("click", (e) => {
  handlerClick(e);
});

if (tasks.length === 0) {
  printInitialMessage();
} else {
  printTasks(tasks);
}
