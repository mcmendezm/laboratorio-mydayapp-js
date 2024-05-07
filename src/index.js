import "./css/base.css";

import {
  pageState,
  createNewTodo,
  clearCompletedTasks,
  saveDataToLocalStorage,
  loadDataFromLocalStorage,
} from "./js/utils";
import { newTodo, completeButton } from "./js/node";

document.addEventListener("DOMContentLoaded", function () {
  pageState();
  loadDataFromLocalStorage();
});

newTodo.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    createNewTodo();
    saveDataToLocalStorage();
  }
});
completeButton.addEventListener("click", function () {
  clearCompletedTasks();
  saveDataToLocalStorage();
});
