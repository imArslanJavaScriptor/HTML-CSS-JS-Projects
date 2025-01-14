const todoInputEl = document.getElementById("todoInput")
const addTodoBtn = document.getElementById("addTodoBtn")
const todosContainerEl = document.querySelector(".todosContainer")



addTodoBtn.addEventListener("click", () => {
  addTodo()
})

let todoVlaue = todoInputEl.value
function addTodo() {
    let todo = document.createElement("div")
    todo.setAttribute("class", "todo")
    console.log(todo)
    todo.innerHTML = `
    <input type="text" id="todoText">
        <button class="editBtn">Edit Todo</button>
        <button class="deleteBtn">Delete Todo</button>
   `
   todosContainerEl.append(todo)
}