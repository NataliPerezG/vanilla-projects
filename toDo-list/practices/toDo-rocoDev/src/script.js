// Variables desde el DOM
const formCreateTask = document.querySelector(".form-create");
const inputCreateTask = document.querySelector(".input-create-task");
const tasksContainer = document.querySelector(".tasks");

// variables de la app
let tasks = JSON.parse(localStorage.getItem("todo-rocoDev")) || [];

// funciones
const printTask = ({ value, done, id }) => {
  const success = done ? "fa-thumbs-up" : "fa-thumbs-down";

  tasksContainer.innerHTML += `
    <li class="task" id="${id}">
        <div class="task-cont">
          <h3 class="task-text">${value}</h3>
          <section class="role-group">
            <button class="btn-edit">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn-success">
              <i class="fa-solid ${success}"></i>
            </button>
            <button class="btn-delete">
              <i class="fa-solid fa-rectangle-xmark"></i>
            </button>
          </section>
        </div>
        <section class="edit-task">
          <form class="form-edit hidden">
            <input type="text" class="input-edit">
            <button type="submit" class="btn-add-taskEdit">Guardar Cambios</button>
          </form>
        </section>
      </li>`;
};

const loadInLocalStorage = () =>
  localStorage.setItem("todo-rocoDev", JSON.stringify(tasks));

const getTaskFromLocalStorage = () =>
  JSON.parse(localStorage.getItem("todo-rocoDev"));

const printTasksFromLocalStorage = (tasks) => {
  tasksContainer.innerHTML = "";
  tasks.forEach((task) => printTask(task));
};

const showFormEditTask = (icon) => {
  // obtner el li completo
  const liTask = icon.closest(".task");

  // mostrar / ocultar el formulario de edición
  const formToEdit = liTask.querySelector(".edit-task form");
  formToEdit.classList.toggle("hidden");

  // Llenar el input de edición con el texto del li
  const taskText = liTask.querySelector("h3").textContent;
  const inputToEdit = liTask.querySelector(".input-edit");
  inputToEdit.value = taskText;
  inputToEdit.focus();

  // Cambiar el texto del li que se está editando
  liTask.querySelector("h3").textContent = "...Editando...";
};

const updateTask = (e) => {
  e.preventDefault();
  // Modificar el valor de la tarea
  const liTask = e.target.closest(".task");
  const inputToEdit = liTask.querySelector(".input-edit");
  liTask.querySelector("h3").textContent = inputToEdit.value.trim();

  // actualizar las tareas en el localStorage
  const tasksFromLocalStorage = getTaskFromLocalStorage();
  const id = liTask.id;
  tasksFromLocalStorage.forEach((task) => {
    if (task.id === id) {
      task.value = inputToEdit.value.trim();
    }
  });
  tasks = tasksFromLocalStorage;
  loadInLocalStorage();

  // ocultar el formulario de edición
  const formToEdit = liTask.querySelector(".edit-task form");
  formToEdit.classList.add("hidden");
};

const completedTask = (icon) => {
  const tasksFromLocalStorage = getTaskFromLocalStorage();
  const liTask = icon.closest(".task");
  const id = liTask.id;

  tasksFromLocalStorage.forEach((task) => {
    if (task.id === id) task.done = !task.done;
  });

  tasks = tasksFromLocalStorage;
  printTasksFromLocalStorage(tasks);
  loadInLocalStorage();
};

const deleteTask = (icon) => {
  const liTask = icon.closest(".task");
  liTask.remove();

  // actualizar las tareas en el localStorage
  const tasksFromLocalStorage = getTaskFromLocalStorage();
  const id = liTask.id;
  tasks = tasksFromLocalStorage.filter((task) => task.id !== id);

  loadInLocalStorage();
  printTasksFromLocalStorage(tasks);
};

//  Eventos
formCreateTask.addEventListener("submit", (e) => {
  e.preventDefault();

  const textTask = inputCreateTask.value.trim();
  if (!textTask) return;

  const currentTask = {
    value: textTask,
    done: false,
    id: crypto.randomUUID(),
  };

  tasks = [...tasks, currentTask];

  printTask(currentTask);
  loadInLocalStorage();

  inputCreateTask.value = "";
  inputCreateTask.focus();
});

document.addEventListener("click", (e) => {
  if (
    e.target.classList.value === "fa-solid fa-pen-to-square" ||
    e.target.classList.value === "btn-edit"
  ) {
    showFormEditTask(e.target);
  } else if (e.target.classList.value === "btn-add-taskEdit") {
    updateTask(e);
  } else if (
    e.target.classList.value === "fa-solid fa-thumbs-down" ||
    e.target.classList.value === "fa-solid fa-thumbs-up" ||
    e.target.classList.value === "btn-success"
  ) {
    completedTask(e.target);
  } else if (
    e.target.classList.value === "fa-solid fa-rectangle-xmark" ||
    e.target.classList.value === "btn-delete"
  ) {
    deleteTask(e.target);
  }
});

// función inicial
printTasksFromLocalStorage(tasks);
