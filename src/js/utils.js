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

  if (initialState.length > 1) {
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
    addTaskEvents(todoItem);
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

function saveDataToLocalStorage() {
  const tasks = Array.from(todoList.children).map((todo) => {
    return {
      content: todo.querySelector("label").textContent,
      completed: todo.classList.contains("completed"),
    };
  });
  localStorage.setItem("mydayapp-js", JSON.stringify(tasks));
}
