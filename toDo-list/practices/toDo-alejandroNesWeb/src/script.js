// variables
const form = document.querySelector(".form");
const input = document.querySelector("#input");
const label = document.querySelector("label");
const containerTasks = document.querySelector(".container-tasks");
const initialMsg = document.querySelector("h2");
const totalTasks = document.querySelector(".total-tasks");
const completedTasks = document.querySelector(".completed-tasks");
let tasks = [];

// funciones

const createNewTask = () => {
  const taskText = input.value.trim();
  if (!taskText) {
    label.textContent = `Escribe algo para agregar`;
    setTimeout(() => {
      label.textContent = `Escribe tu tarea`;
    }, 1500);
    return;
  }
  const newTask = {
    id: crypto.randomUUID(),
    text: taskText,
    completed: false,
  };

  tasks = [...tasks, newTask];
  printTasks();
  form.reset();
};

const updateTasksStatus = () => {
  const total = tasks.length;
  totalTasks.textContent = `Total tareas: ${total}`;
  const totalCompleted = tasks.filter((task) => task.completed).length;
  completedTasks.textContent = `Tareas completadas: ${totalCompleted}`;
};

const printTasks = () => {
  containerTasks.innerHTML = " ";

  if (tasks.length === 0) {
    containerTasks.append(initialMsg);
  }

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.classList.add("task");
    li.innerHTML = `
      <p class="text ${task.completed ? "completed" : ""}">${task.text}</p>
        <div class="buttons">
          <button data-id="${task.id}">
            <img class="complete" src="./src/assets/icons8-checkmark-50.png" alt="">
          </button>
          <button data-id="${task.id}">
            <img class="delete" src="./src/assets/icons8-cancel-50.png" alt="">
          </button>
        </div>
    `;
    containerTasks.append(li);
  });
  updateTasksStatus();
};

const completeTask = (e) => {
  const btnId = e.target.parentElement.dataset.id;
  tasks = tasks.map((task) => {
    if (task.id === btnId) {
      task.completed = !task.completed;
      return task;
    } else {
      return task;
    }
  });
  printTasks();
};

const deleteTask = (e) => {
  const btnId = e.target.parentElement.dataset.id;
  tasks = tasks.filter((task) => task.id !== btnId);
  printTasks();
};

const handlerClickTasks = (e) => {
  if (e.target.classList.contains("complete")) {
    completeTask(e);
  } else if (e.target.classList.contains("delete")) {
    deleteTask(e);
  }
};

// eventos
form.addEventListener("submit", (e) => {
  e.preventDefault();
  createNewTask();
});

containerTasks.addEventListener("click", (e) => {
  handlerClickTasks(e);
});
