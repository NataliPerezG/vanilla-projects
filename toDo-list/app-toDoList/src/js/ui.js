import { getStates } from "./app.js";
import { getGreeting } from "./greeting.js";

export const printInitialMessage = () => {
  const containerTasks = document.querySelector(".tasks");
  containerTasks.innerHTML = "";
  containerTasks.innerHTML = `
        <div class="tasks-empty">
          <h3>No tienes tareas pendientes</h3>
        </div>`;
};

export const printTasks = (tasks) => {
  const containerTasks = document.querySelector(".tasks");

  containerTasks.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.classList.add("task");
    li.dataset.id = task.id;
    li.innerHTML = `
        <section class="create-task">
        <p class="task-text">
          <i class="fa-regular fa-circle ${task.completed ? "hidden" : ""}"></i>
          <i class="fa-solid fa-circle-check ${task.completed ? "" : "hidden"}"></i>
          <span class="${task.completed ? "completed" : ""}">${task.text}</span>
        </p>
        
        <div class="task-buttons">
          <button class="btn btn-edit" ${task.completed ? "disabled" : ""}>
            <i class="fa-solid fa-pen-to-square"
            data-id="${task.id}"></i>
          </button>
          <button class="btn btn-delete">
            <i class="fa-solid fa-trash"
            data-id="${task.id}"></i>
          </button>
        </div>
        </section>

        <section class="edit-task hidden">
          <form class="form-edit">
            <input type="text" class="input-edit">
            <button type="submit" class="btn-add-taskEdit">
            Guardar Cambios</button>
          </form>
        </section>`;
    containerTasks.append(li);
  });
};

export const printStates = () => {
  const data = getStates();

  const totalCant = document.querySelector(".card-total p");
  totalCant.textContent = data.total;

  const percentCant = document.querySelector(".card-progress p");
  percentCant.textContent = data.completedProgress + "%";
  const percentProgress = document.querySelector(".card-progress .progress");
  percentProgress.style.width = `${data.completedProgress}%`;

  const complCant = document.querySelector(".card-completed p");
  complCant.textContent = data.completed;
  const complProgress = document.querySelector(".card-completed .progress");
  complProgress.style.width = `${data.completedProgress}%`;

  const pendCant = document.querySelector(".card-pending p");
  pendCant.textContent = data.pending;
  const pendProgress = document.querySelector(".card-pending .progress");
  pendProgress.style.width = `${data.pendingProgress}%`;
};

export const renderGreeting = (userName = "Pily") => {
  const greetingElement = document.querySelector(".header h2");
  const greetingText = getGreeting();
  greetingElement.textContent = `${greetingText}, ${userName}`;
};
