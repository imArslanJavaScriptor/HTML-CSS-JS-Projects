let todoInputEl = document.querySelector("#todoInput")
let addTodoBtn = document.querySelector("#addTodoBtn")
let todosContainerEl = document.querySelector(".todosContainer")
let todos = JSON.parse(localStorage.getItem("todos")) || []; // Load todos from localStorage

addTodoBtn.addEventListener("click", () => {
  let todoValue = todoInputEl.value;

  if (todoValue.trim() === "") {
    alert("Please Enter a Todo");
    return;
  }

  let todoObj = { id: Date.now(), text: todoValue }; // Create todo object
  todos.push(todoObj); // Add to array
  localStorage.setItem("todos", JSON.stringify(todos)); // Save to localStorage

  renderTodo(todoObj); // Render todo in UI
  todoInputEl.value = ""; // Clear input field
});

// Render function to display a todo
function renderTodo(todoObj) {
  let todo = document.createElement("div");
  todo.setAttribute("class", "todo");
  todo.setAttribute("data-id", todoObj.id); // Add data-id for easy deletion

  let todoInput = document.createElement("input");
  todoInput.value = todoObj.text;
  todoInput.setAttribute("readonly", "true");

  let deleteTodo = document.createElement("button");
  deleteTodo.textContent = "Delete Todo";
  deleteTodo.setAttribute("class", "deleteBtn");

  let editTodo = document.createElement("button");
  editTodo.textContent = "Edit Todo";
  editTodo.setAttribute("class", "editBtn");

  // Add event listeners for delete and edit
  deleteTodo.addEventListener("click", () => deleteTodoHandler(todoObj.id));
  editTodo.addEventListener("click", () => editTodoHandler(todoInput, todoObj.id));

  // Append elements
  todo.appendChild(todoInput);
  todo.appendChild(deleteTodo);
  todo.appendChild(editTodo);
  todosContainerEl.appendChild(todo);
}

// Load and render todos on page load
window.addEventListener("DOMContentLoaded", () => {
  todos.forEach((todo) => renderTodo(todo));
});

function editTodoHandler(todoInput, todoId) {
  if (todoInput.hasAttribute("readonly")) {
    todoInput.removeAttribute("readonly");
    todoInput.focus();
  } else {
    todoInput.setAttribute("readonly", "true");
    let updatedText = todoInput.value;

    // Update in todos array
    todos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, text: updatedText } : todo
    );

    // Save updated todos to localStorage
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

function deleteTodoHandler(todoId) {
  todos = todos.filter((todo) => todo.id !== todoId); // Remove from array
  localStorage.setItem("todos", JSON.stringify(todos)); // Update localStorage

  // Remove from UI
  document.querySelector(`[data-id="${todoId}"]`).remove();
}
