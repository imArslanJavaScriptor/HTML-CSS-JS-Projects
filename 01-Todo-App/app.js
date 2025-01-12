// Getting Reffrences For The Elements
const todoInput = document.getElementById("todo-input");
const addTodoButton = document.getElementById("add-todo");
const todoList = document.getElementById("todo-list");
const themeToggle = document.querySelector(".theme-toggle");




// Set Todos in Local Storage
let todos = JSON.parse(localStorage.getItem("todos")) || []
let isDarkTheme = true


// Save Todos Function
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos))
}


function renderTodos() {
  todoList.innerHTML = "";  

  todos.forEach((todo, index) => {
    const li = document.createElement("li")
    li.className = "todo-item"

    const input = document.createElement("input")
    input.type = "text"
    input.value = todo.text
    input.readOnly = !todo.isEditing

    input.addEventListener("blur" ,() => {
        todos[index].text = input.value.trim()
        todos[index].isEditing = false
        saveTodos()
        renderTodos()
    })

    const actions = document.createElement("div")
    actions.className = "actions"

    const editButton = document.createElement("button")
    editButton.innerHTML = "✏️";
    editButton.onclick = () => {
        todos[index].isEditing = !todo.isEditing
        renderTodos()
    }

    const deleteButton = document.createElement("button")
    deleteButton.innerHTML = "❌";
    deleteButton.onclick = () => {
        todos.splice(index, 1)
        saveTodos()
        renderTodos()
    }

    actions.appendChild(editButton)
    actions.append(deleteButton)
    li.appendChild(input)
    li.appendChild(actions)
    todoList.appendChild(li)

  })
}

addTodoButton.addEventListener("click" ,() => {
    const todoText = todoInput.value.trim()
    if(todoText) {
        todos.push(
            {
                id: Date.now(),
                text: todoText,
                isEditing: false
            }
        )
        saveTodos()
        renderTodos()
        todoInput.value = ""
    }
})



themeToggle.addEventListener("click", () => {
    isDarkTheme = !isDarkTheme
    document.body.style.backgroundColor = isDarkTheme ? "#101010" : "#ffffff"
    themeToggle.textContent = isDarkTheme ?  "🌙" : "☀️";
})
renderTodos();
