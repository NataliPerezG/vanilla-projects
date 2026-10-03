import {
  getTasksFromLocalStorage,
  saveTasksInLocalStorage,
} from "./storage.js";
import { printTasks } from "./ui";

export const tasks = getTasksFromLocalStorage();
console.log(tasks);

export const createNewTask = () => {
  const input = document.querySelector(".input");
  const text = input.value.trim();
  if (!text) return;

  tasks.push({
    id: crypto.randomUUID(),
    text,
    completed: false,
  });

  saveTasksInLocalStorage("tasks", tasks);
  printTasks(tasks);
};

export const completeTask = (e) => {
  console.log(e.target.parentElement.parentElement);
};
