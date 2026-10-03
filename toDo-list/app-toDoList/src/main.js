import "./style.css";
import { tasks, createNewTask, completeTask } from "./js/app.js";
import { printTasks } from "./js/ui.js";

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
};

const container = document.querySelector(".tasks");
container.addEventListener("click", (e) => {
  handlerClick(e);
});

printTasks(tasks);
