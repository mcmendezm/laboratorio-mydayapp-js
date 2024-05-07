import {
  todoList,
  nodeFooter,
  nodeMain,
  nodeTodoCount,
  newTodo,
} from "./node.js";

//1. Ocultar las secciones main y footer
export function pageState() {
  const initialState = JSON.parse(localStorage.getItem("mydayapp-js")) || [];
  console.log({ initialState });
  if (initialState.length > 0) {
    nodeFooter.classList.remove("hidden");
    nodeMain.classList.remove("hidden");
  } else {
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
    addTaskEvents(todoItem);
    updateTodoCount();
  }
}

//3. Una tarea y 4.  Editando una tarea
export function addTaskEvents(task) {
  const checkbox = task.querySelector(".toggle");
  const label = task.querySelector("label");
  const destroyButton = task.querySelector(".destroy");
  const editInput = task.querySelector(".edit");

  checkbox.addEventListener("click", function () {
    task.classList.toggle("completed");
    saveDataToLocalStorage();
  });
  label.addEventListener("dblclick", function () {
    task.classList.add("editing");
    editInput.focus();
  });
  task.addEventListener("mouseenter", function () {
    destroyButton.style.display = "block";
  });

  task.addEventListener("mouseleave", function () {
    destroyButton.style.display = "none";
  });

  destroyButton.addEventListener("click", function () {
    task.remove();
    saveDataToLocalStorage();
    updateTodoCount();
  });

  editInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      label.textContent = editInput.value.trim();
      task.classList.remove("editing");
      saveDataToLocalStorage();
    }
  });
  editInput.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      editInput.value = label.textContent;
      task.classList.remove("editing");
    }
  });
}
//5.Contador
function updateTodoCount() {
  const pendingTasks = todoList.querySelectorAll("li:not(.completed)").length;
  const itemText = pendingTasks === 1 ? "item" : "items";
  nodeTodoCount.innerHTML = `<strong>${pendingTasks}</strong> ${itemText} left`;
  pageState();
}
//6.Botón de limpiar
export function clearCompletedTasks() {
  const completedTasks = todoList.querySelectorAll("li.completed");
  completedTasks.forEach((task) => task.remove());
  saveDataToLocalStorage();
}
//7.Persistencia

export function saveDataToLocalStorage() {
  const tasks = Array.from(todoList.children).map((todo) => {
    return {
      content: todo.querySelector("label").textContent,
      completed: todo.classList.contains("completed"),
    };
  });
  localStorage.setItem("mydayapp-js", JSON.stringify(tasks));
}
export function loadDataFromLocalStorage() {
  const savedTasks = JSON.parse(localStorage.getItem("mydayapp-js")) || [];
  savedTasks.forEach((task) => {
    const todoItem = document.createElement("li");
    todoItem.innerHTML = `
      <div class="view ${task.completed ? "completed" : ""}">
        <input class="toggle" type="checkbox" ${
          task.completed ? "checked" : ""
        }>
        <label>${task.content}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${task.content}">
    `;
    if (task.completed) {
      todoItem.classList.add("completed");
    }
    todoList.appendChild(todoItem);
    addTaskEvents(todoItem);
  });
  updateTodoCount();
}
//8.Filtros y rutas
export function filterTasks() {
  const hash = window.location.hash;
  const allTasks = document.querySelectorAll(".todo-list li");
  const filterLinks = document.querySelectorAll(".filters a");

  filterLinks.forEach((link) => {
    if (link.getAttribute("href") === hash) {
      link.classList.add("selected");
    } else {
      link.classList.remove("selected");
    }
  });

  allTasks.forEach((task) => {
    switch (hash) {
      case "#/all":
        task.style.display = "flex";
        break;
      case "#/pending":
        if (task.classList.contains("completed")) {
          task.style.display = "none";
        } else {
          task.style.display = "flex";
        }
        break;
      case "#/completed":
        if (!task.classList.contains("completed")) {
          task.style.display = "none";
        } else {
          task.style.display = "flex";
        }
        break;
      default:
        task.style.display = "flex";
    }
  });
}
