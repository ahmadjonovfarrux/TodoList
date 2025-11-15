const formCreate = document.getElementById("form-create");
const formEdit = document.getElementById("form-edit");
const listGroupTodo = document.getElementById("list-group-todo");
const time = document.getElementById("time");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const closeIcon = document.getElementById("close");
// const messageCreate = document.getElementById("message-create");

// time elements
const fullDay = document.getElementById("full-day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");

// check
let todos = JSON.parse(localStorage.getItem("list"))
  ? JSON.parse(localStorage.getItem("list"))
  : [];

if (todos.length) {
  showTodos();
}

// setTodos to localStorage
function setTodos() {
  localStorage.setItem("list", JSON.stringify(todos));
}

// showTodos from localStorage to brauzer
function showTodos() {
  const todos = JSON.parse(localStorage.getItem("list"));
  listGroupTodo.innerHTML = " ";
  todos.forEach((item, i) => {
    listGroupTodo.innerHTML += `
     <li class="list-group-item d-flex justify-content-between">
         ${item.text}
          <div class="todos-icons">
            <span class="opacity-50 me-2">14.10.2025</span>
            <img
              src="./images/edit.svg"
              alt="edit icon"
              width="25"
              height="25"
            />
            <img
              src="./images/delete.svg"
              alt="delete icon"
              width="25"
              height="25"
            />
          </div>
        </li>
    `;
  });
}

// showMessage function
function showMessage(where, message) {
  document.getElementById(`${where}`).textContent = `${message}`;

  setTimeout(() => {
    document.getElementById(`${where}`).textContent = " ";
  }, 3000);
}

// get Todos
formCreate.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = formCreate["input-create"].value.trim();
  formCreate.reset();
  if (todoText.length) {
    todos.push({ text: todoText, time: "3:56, 14.11.2025", complated: false });
    setTodos();
    showTodos();
    console.log(todos);
  } else {
    showMessage("message-create", "Please enter some text");
  }
});
