import { attachDragEvents } from "./drag.js";

const form = document.querySelector(".form");
const input = document.querySelector("input");
const toDoColumn = document.querySelector(".line-todo");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newTask = document.createElement("p");
  newTask.textContent = input.value;
  newTask.classList.add("task");
  newTask.setAttribute("draggable", "true");

  attachDragEvents(newTask);

  toDoColumn.append(newTask);

  form.reset();
});
