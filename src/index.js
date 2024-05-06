import "./css/base.css";

import { pageState, createNewTodo } from "./js/utils";
import { newTodo } from "./js/node";

pageState();
// Agregar evento de escucha para crear una nueva tarea al presionar Enter
newTodo.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    createNewTodo();
  }
});
