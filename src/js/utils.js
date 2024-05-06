import {
  todoList,
  nodeFooter,
  nodeMain,
  nodeTodoCount,
  completeButton,
  nodeFilters,
  newTodo,
} from "./node.js";

//1. Ocultar las secciones main y footer
export function pageState(display = false) {
  const initialState = JSON.parse(localStorage.getItem("mydayapp-js")) || [];

  if (initialState.length > 0) {
    nodeFooter.classList.remove("hidden");
    nodeMain.classList.remove("hidden");
  } else if (display) {
    nodeFooter.classList.add("hidden");
    nodeMain.classList.add("hidden");
  }
}

//2. Crear una nueva tarea
export function createNewTodo() {
  const inputValue = newTodo.value.trim();

  if (inputValue !== "") {
    const todoItem = document.createElement("li");
    todoItem.innerHTML = `
      <div class="view">
        <input class="toggle" type="checkbox">
        <label>${inputValue}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${inputValue}">
    `;
    todoList.appendChild(todoItem);

    newTodo.value = "";

    saveDataToLocalStorage();
  }
}

function saveDataToLocalStorage() {
  const tasks = Array.from(todoList.children).map(
    (todo) => todo.querySelector("label").textContent
  );
  localStorage.setItem("mydayapp-js", JSON.stringify(tasks));
}
