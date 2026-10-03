export const printTasks = (tasks) => {
  if (tasks.length === 0) return;
  const containerTasks = document.querySelector(".tasks");

  containerTasks.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.classList.add("task");
    li.dataset.id = task.id;
    li.innerHTML = `
        <p class"task-text">
          <i class="fa-regular fa-circle ${task.completed ? "hidden" : ""}"></i>
          <i class="fa-solid fa-circle-check hidden"></i>
          <span>${task.text}</span>
        </p>
        <div class="task-buttons">
          <button class="btn btn-edit">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="btn btn-delete">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>`;
    containerTasks.append(li);
  });
};
