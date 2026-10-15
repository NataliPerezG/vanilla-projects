const tasks = document.querySelectorAll(".task");
const columns = document.querySelectorAll(".line");

export const attachDragEvents = (task) => {
  task.addEventListener("dragstart", (e) => {
    task.classList.add("dragging");
  });
  task.addEventListener("dragend", (e) => {
    task.classList.remove("dragging");
  });
};

tasks.forEach(attachDragEvents);

columns.forEach((column) => {
  column.addEventListener("dragenter", (e) => {
    column.classList.add("selected");
  });
  column.addEventListener("dragover", (e) => {
    e.preventDefault();
    const dragging = document.querySelector(".dragging");
    sortElements(e, dragging, column);
  });
  column.addEventListener("dragleave", (e) => {
    if (column.contains(e.relatedTarget)) return;
    column.classList.remove("selected");
  });
});

const sortElements = (e, draggingelement, column) => {
  const siblings = [...column.querySelectorAll(".task:not(.dragging)")];
  const nextSibling = siblings.find((sibling) => {
    const box = sibling.getBoundingClientRect();
    const middleBox = box.top + box.height / 2;
    return e.clientY <= middleBox;
  });

  if (nextSibling) {
    column.insertBefore(draggingelement, nextSibling);
  } else {
    column.append(draggingelement);
  }
};
