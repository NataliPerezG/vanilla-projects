import {
  getTasksFromLocalStorage,
  saveTasksInLocalStorage,
} from "./storage.js";

import { printInitialMessage, printTasks } from "./ui";

export let tasks = getTasksFromLocalStorage();

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
  if (e.target.nodeName === "SPAN" || e.target.nodeName === "I") {
    const li = e.target.parentElement.parentElement;
    const btnId = li.dataset.id;
    tasks = tasks.map((task) => {
      if (task.id === btnId) {
        task.completed = !task.completed;
        return task;
      } else {
        return task;
      }
    });
  }
  printTasks(tasks);
  saveTasksInLocalStorage("tasks", tasks);
};

export const editTask = (e) => {
  console.log("editando");
};

export const deleteTask = (e) => {
  const btnId = e.target.dataset.id;
  tasks = tasks.filter((task) => task.id !== btnId);
  printTasks(tasks);
  saveTasksInLocalStorage("tasks", tasks);
  if (tasks.length === 0) {
    printInitialMessage();
  }
};
