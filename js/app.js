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

  


//  <li class="list-group-item d-flex justify-content-between">
//           Hello world
//           <div class="todos-icons">
//             <span class="opacity-50 me-2">14.10.2025</span>
//             <img
//               src="./images/edit.svg"
//               alt="edit icon"
//               width="25"
//               height="25"
//             />
//             <img
//               src="./images/delete.svg"
//               alt="delete icon"
//               width="25"
//               height="25"
//             />
//           </div>
//         </li>
