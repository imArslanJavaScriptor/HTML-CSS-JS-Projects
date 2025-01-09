const todoInput = document.getElementById("todo-input");
const addTodoButton = document.getElementById("add-todo");
const todoList = document.getElementById("todo-list");
const themeToggle = document.querySelector(".theme-toggle");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let isDarkTheme = true;

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "todo-item";

    const span = document.createElement("span");
    span.textContent = todo.text;

    const actions = document.createElement("div");
    actions.className = "actions";

    const editButton = document.createElement("button");
    editButton.innerHTML = "✏️";
    editButton.onclick = () => {
      const updatedText = prompt("Update the task", todo.text);
      if (updatedText) {
        todos[index].text = updatedText;
        saveTodos();
        renderTodos();
      }
    };

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "❌";
    deleteButton.onclick = () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    };

    actions.appendChild(editButton);
    actions.appendChild(deleteButton);
    li.appendChild(span);
    li.appendChild(actions);
    todoList.appendChild(li);
  });
}

addTodoButton.addEventListener("click", () => {
  const todoText = todoInput.value.trim();
  if (todoText) {
    todos.push({ text: todoText });
    saveTodos();
    renderTodos();
    todoInput.value = "";
  }
});

themeToggle.addEventListener("click", () => {
  isDarkTheme = !isDarkTheme;
  document.body.style.backgroundColor = isDarkTheme ? "#121212" : "#ffffff";
  document.body.style.color = isDarkTheme ? "#ffffff" : "#000000";
  themeToggle.textContent = isDarkTheme ? "🌙" : "☀️";
});

renderTodos();
