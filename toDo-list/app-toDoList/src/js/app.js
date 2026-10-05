import {
  getTasksFromLocalStorage,
  saveTasksInLocalStorage,
} from "./storage.js";

import { printInitialMessage, printStates, printTasks } from "./ui.js";

// Array de tareas inicial
export let tasks = getTasksFromLocalStorage();

// Función para crear una nueva tarea y pasarla al array
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
  getStates();
};

// Función para marcar o desmarcar una tarea como completada
export const completeTask = (e) => {
  if (e.target.classList.contains("fa-pen-to-square")) return;

  if (e.target.nodeName === "SPAN" || e.target.nodeName === "I") {
    const li = e.target.closest(".task");

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
  saveTasksInLocalStorage("tasks", tasks);
  printTasks(tasks);
  getStates();
};

// Función para mostrar el formulario de edición de una tarea
export const showFormEditTask = (e) => {
  const taskToEdit = e.target.closest(".task");

  // abrir y cerrar el formulario de edición
  const formEditTask = taskToEdit.querySelector(".edit-task");
  formEditTask.classList.toggle("hidden");

  // Llenar el input del formulario con el texto de la tarea:
  const inputEdit = formEditTask.querySelector("input");
  const previousText = taskToEdit.querySelector("p>span");
  previousText.classList.toggle("editing");

  inputEdit.value = previousText.textContent;
  inputEdit.focus();
};

// función para actualizar una tarea
export const updateTask = (id, newText) => {
  if (!newText.trim()) return;
  tasks = tasks.map((task) => {
    if (task.id === id) {
      task.text = newText;
      return task;
    } else {
      return task;
    }
  });
  saveTasksInLocalStorage("tasks", tasks);
  printTasks(tasks);
  getStates();
};

// función para eliminar una tarea
export const deleteTask = (e) => {
  const btnId = e.target.dataset.id;
  tasks = tasks.filter((task) => task.id !== btnId);
  saveTasksInLocalStorage("tasks", tasks);
  printTasks(tasks);
  getStates();
  printStates();
  if (tasks.length === 0) {
    printInitialMessage();
  }
};

// datos para actualizar el estado de la app:
export const getStates = () => {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = tasks.filter((task) => !task.completed).length;
  // operador ternario para evitar un NaN cuando el usuario borra todas las tareas
  const completedProgress =
    total > 0 ? Math.round((completed / total) * 100) : 0;
  const pendingProgress = total > 0 ? Math.round((pending / total) * 100) : 0;

  return {
    total,
    completed,
    pending,
    completedProgress,
    pendingProgress,
  };
};
