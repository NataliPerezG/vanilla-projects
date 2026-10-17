export const getTasksFromLocalStorage = () =>
  JSON.parse(localStorage.getItem("tasks")) || [];

export const saveTasksInLocalStorage = (key, data) =>
  localStorage.setItem(key, JSON.stringify(data));
