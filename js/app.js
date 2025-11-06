const formCreate = document.getElementById("form-create");
const formEdit = document.getElementById("form-edit");
const listGroupTodo = document.getElementById("list-group-todo");
const time = document.getElementById("time");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const closeIcon = document.getElementById("close");

// time elements
const fullDay = document.getElementById("full-day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");

let editItemId;

// check
let todos = JSON.parse(localStorage.getItem("list"))
  ? JSON.parse(localStorage.getItem("list"))
  : [];

if (todos.length) showTodos();

// setTodos to localStorage
function setTodos() {
  localStorage.setItem("list", JSON.stringify(todos));
}

// time function
function getTime() {
  const now = new Date();
  const date = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
  const month =
    now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : now.getMonth();
  const year = now.getFullYear();

  const hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
  const minute =
    now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
  const second =
    now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  fullDay.textContent = `${date} ${months[month]}, ${year}`;
  hourEl.textContent = hour;
  minuteEl.textContent = minute;
  secondEl.textContent = second;
  return `${hour}:${minute}, ${date}.${month}.${year}`;
}

setInterval(() => {
  getTime();
}, 1000);

// show todos
function showTodos() {
  const todos = JSON.parse(localStorage.getItem("list"));
  listGroupTodo.innerHTML = " ";
  todos.forEach((item, i) => {
    listGroupTodo.innerHTML += `
     <li ondblclick="setCompleted(${i})" class="list-group-item d-flex justify-content-between ${
      item.complated == true ? "complated" : ""
    }">
     ${item.text}
     <div class="todo-icons">
            <span class="opacity-50 me-2">${item.time}</span>
            <img onClick=(editTodo(${i})) src="images/edit.svg" alt="edit icon" width="25" height="25" />
            <img
            onClick=(deleteTodo(${i}))
              src="images/delete.svg"
              alt="delete icon"
              width="25"
              height="25"
            />
          </div>
        </li>
    `;
  });
}

// showErrorMessage function
function showMessage(where, message) {
  document.getElementById(`${where}`).textContent = message;

  setTimeout(() => {
    document.getElementById(`${where}`).textContent = " ";
  }, 3000);
}

// get todos
formCreate.addEventListener("submit", (e) => {
  e.preventDefault();

  const todoText = formCreate["input-create"].value.trim();
  formCreate.reset();
  if (todoText.length) {
    todos.push({
      text: todoText,
      time: getTime(),
      complated: false,
    });
    setTodos();
    showTodos();
  } else {
    showMessage("message-create", "Please enter some text...");
  }
});

// delete Todo function
function deleteTodo(id) {
  const deletedTodos = todos.filter((item, i) => {
    return i !== id;
  });

  todos = deletedTodos;
  setTodos();
  showTodos();
}

// setComlated function
function setCompleted(id) {
  const complatedTodos = todos.map((item, i) => {
    if (id == i) {
      return { ...item, complated: item.complated == true ? false : true };
    } else {
      return { ...item };
    }
  });
  todos = complatedTodos;
  setTodos();
  showTodos();
}

// edit Form function
formEdit.addEventListener("submit", (e) => {
  e.preventDefault();

  const todoText = formEdit["input-edit"].value.trim();
  formEdit.reset();
  if (todoText.length) {
    todos.splice(editItemId, 1, {
      text: todoText,
      time: getTime(),
      complated: false,
    });
    setTodos();
    showTodos();
    closeModal();
  } else {
    showMessage("message-edit", "Please enter some text...");
  }
});

// editTodo
function editTodo(id) {
  openModal();
  editItemId = id;
}

// open modal
function openModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

// close with overlay
overlay.addEventListener("click", () => {
  return closeModal();
});

// close with closeIcon
closeIcon.addEventListener("click", () => {
  return closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.which === 27) {
    closeModal();
  }
});

// closeModal
function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}
