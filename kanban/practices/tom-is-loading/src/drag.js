console.log("vinculado");

const tasks = document.querySelectorAll(".task");
const columns = document.querySelectorAll(".line");

tasks.forEach((task) => {
  task.addEventListener("dragstart", (e) => {
    task.classList.add("dragging");
  });
  task.addEventListener("dragend", (e) => {
    task.classList.remove("dragging");
  });
});

columns.forEach((column) => {
  column.addEventListener("dragenter", (e) => {
    column.classList.add("selected");
  });
  column.addEventListener("dragover", (e) => {
    e.preventDefault();
    getClosestElement(column, e.clientY);
  });
  column.addEventListener("dragleave", (e) => {
    column.classList.remove("selected");
  });
  column.addEventListener("drop", (e) => {
    const draggedCard = document.querySelector(".dragging");
    column.append(draggedCard);
  });
});

const getClosestElement = (column, y) => {
  const staticElements = [...document.querySelectorAll(".task:not(.dragging)")];
  staticElements.reduce((close, elem) => {
    const { top, height } = elem.getBoundingClientRect();
    console.log("top: ", top, "height: ", height);
    const offset = y - top - height / 2;
    console.log(offset);
  });
};
