// // Select DOM elements
// const todoInput = document.getElementById("todoInput");
// const addButton = document.getElementById("addButton");
// const todoList = document.getElementById("todoList");

// let todos = JSON.parse(localStorage.getItem("todos")) || [];


// Function to render the to-do list
// function renderTodos() {
//   todoList.innerHTML = ""; // Clear the list
//   todos.forEach((todo, index) => {
//     const listItem = document.createElement("li");
//     listItem.innerHTML = `
//       <span contenteditable="true" onblur="updateTodo(${index}, this.textContent)" class="todo-text">${todo}</span>
//       <button onclick="deleteTodo(${index})">Delete</button>
//     `;
//     todoList.appendChild(listItem);
//   });
// }

// Add a new task
// function addTodo() {
//   const task = todoInput.value.trim();
//   if (task === "") {
//     alert("Please enter a task.");
//     return;
//   }
//   todos.push(task); // Add to the array
//   updateLocalStorage(); // Save to local storage
//   renderTodos(); // Refresh the list
//   todoInput.value = ""; // Clear the input field
// }

// Delete a task
// function deleteTodo(index) {
//   todos.splice(index, 1); // Remove from the array
//   updateLocalStorage(); // Save to local storage
//   renderTodos(); // Refresh the list
// }

// Update a task
// function updateTodo(index, newValue) {
//   if (newValue.trim() === "") {
//     alert("Task cannot be empty.");
//     renderTodos(); // Re-render to restore the old value
//     return;
//   }
//   todos[index] = newValue; // Update the array
//   updateLocalStorage(); // Save to local storage
// }


// Save to local storage
// function updateLocalStorage() {
//   localStorage.setItem("todos", JSON.stringify(todos));
// }

// Initialize the app
// addButton.addEventListener("click", addTodo);
// document.addEventListener("DOMContentLoaded", renderTodos);


const todoInput = document.getElementById("todoInput")
const addButton = document.getElementById("addButton")
const todoList = document.getElementById("todoList")

let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Function to Render the To-Do List 
function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
        const listItem = document.createElement("li")
        listItem.innerHTML =  `
        <span contenteditable="true" onblur="updateTodo(${index}, this.textContent)" class="todo-text">${todo}</span>
        <button onclick="deleteTodo(${index})">Delete</button>`;
        todoList.appendChild(listItem)
        
    });
}

// Add Task
function addTask() {
    const task = todoInput.value.trim()
    if(task === "") {
        alert("Please Enter Task")
        return
    }
    todos.push(task)
    updateLocalStorage()
    renderTodos()
    todoInput.value = ""
}

// Delete Task
function deleteTodo(index) {
    todos.splice(index, 1)
    updateLocalStorage()
    renderTodos()
}

// update Task
function updateTodo(index, newValue) {
    if(newValue.trim() === "") {
        alert("Task Should't be Empty")
        renderTodos()
        return
    }
    todos[index] = newValue
    updateLocalStorage()
}

// Save into LocalStorage
function updateLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos))
}

// Initialize The App
addButton.addEventListener("click", addTask)
document.addEventListener("DOMContentLoaded", renderTodos)

