import {
  todoList,
  nodeFooter,
  nodeMain,
  nodeTodoCount,
  completeButton,
  nodeFilters,
} from "./store.js";

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
