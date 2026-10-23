const saveBtn = document.querySelector(".btn-save");
const inputTodo = document.querySelector("#myInput");
const todoContainer = document.querySelector(".Todo-Items");
const trashIcon = document.querySelector(".trash-icon");
const editIcon = document.querySelector(".edit-icon");
const checkIcon = document.querySelector(".check-icon");
const todoItems = document.querySelector(".Todo-Items");
const todoCountDone = document.querySelector(".todo-done");
const todoCountLeft = document.querySelector(".todo-left");

todoCountDone.textContent = 0;
todoCountLeft.textContent = 0;

function addTodo(todoText, completed = false) {
  const todo = document.createElement("div");
  todo.classList.add("Todo"); // creating the todo and giving it a class

  if (completed) {
    todo.classList.toggle("completed");
  }

  const title = document.createElement("p"); // creates the paragraph element
  title.textContent = todoText;

  const todoActions = document.createElement("div");

  todoActions.innerHTML = `
 <i class="fa-solid fa-trash trash-icon"></i>
            <i class="fa-solid fa-edit edit-icon"></i>
            <i class="fa-solid fa-check check-icon"></i>
`;

  todo.append(title, todoActions); //adding the paragraph and actions
  todoItems.appendChild(todo); //adding the todo to the items div
}

function saveTodos() {
  const todos = [...todoItems.querySelectorAll(".Todo")].map((todo) => ({
    text: todo.querySelector("p").textContent,
    completed: todo.classList.contains("completed"),
  }));

  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
  todoItems.innerHTML = "";

  savedTodos.forEach((todo) => {
    addTodo(todo.text, todo.completed);
  });
  updateTodoCount();
}

function addTodoFromInput() {
  const todoText = inputTodo.value.trim(); // getting the todo

  if (todoText === "") return; // prevents adding blank todos
  addTodo(todoText);
  inputTodo.value = "";
  inputTodo.focus();
  saveTodos();
  updateTodoCount();
}

saveBtn.addEventListener("click", addTodoFromInput);

inputTodo.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTodoFromInput();
  }
});

// implementing actions
todoItems.addEventListener("click", (event) => {
  //   console.log(event.target);
  const todo = event.target.closest(".Todo");
  if (!todo) return;

  if (event.target.closest(".trash-icon")) {
    todo.remove();
    saveTodos();
    updateTodoCount();
    return;
  }

  if (event.target.closest(".edit-icon")) {
    const title = todo.querySelector("p");
    const updatedText = prompt("Edit your Todo:", title.textContent);

    if (updatedText !== null && updatedText.trim() !== "") {
      title.textContent = updatedText.trim();
      saveTodos();
    }
    return;
  }

  if (event.target.closest(".check-icon")) {
    todo.classList.toggle("completed");
    saveTodos();
    updateTodoCount();
  }
});

loadTodos();

function updateTodoCount() {
  const todos = document.querySelectorAll(".Todo");
  const doneTodos = document.querySelectorAll(".Todo.completed").length;
  const leftTodos = todos.length - doneTodos;

  todoCountDone.textContent = doneTodos;
  todoCountLeft.textContent = leftTodos;
}
