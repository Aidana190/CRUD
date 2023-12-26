const API = "http://localhost:8000/products";

// ! Create

let btn = document.querySelector(".btn_create");
let wrapper = document.querySelector(".wrapper");
let btnSubmit = document.querySelector(".submit");
let inp1 = document.querySelector(".inp1");
let inp2 = document.querySelector(".inp2");
let inp3 = document.querySelector(".inp3");
let inp4 = document.querySelector(".inp4");
let crud = document.querySelector(".crud");
let container2 = document.querySelector(".container2");

btn.addEventListener("click", () => {
  container2.classList.toggle("none");
});
btnSubmit.addEventListener("click", () => {
  if (
    !inp1.value.trim() ||
    !inp2.value.trim() ||
    !inp3.value.trim() ||
    !inp4.value.trim()
  ) {
    alert("Please paste the data");
    return;
  }
  let newObj = {
    name: inp1.value,
    lastName: inp2.value,
    phone: inp3.value,
    photo: inp4.value,
  };
  createTask(newObj);
});
function createTask(task) {
  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(task),
  }).then(() => readTask());
}

// !READ
function readTask() {
  fetch(API)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      crud.innerHTML = "";
      data.forEach((elem) => {
        console.log(elem);
        crud.innerHTML += `
		<div class = "container">
		<div class="name">${elem.name} </div>
		<div  class="lastname">${elem.lastName}</div>
		<div  class="phoneNumber">${elem.phone}</div>
		<img src=${elem.photo} alt="">
	  </div>
	  <button id=${elem.id} class="btnDelete">delete</button>
    <button id=${elem.id} class="btnEdit">edit</button>
		`;
      });
    });
}
readTask();

// !DELETE

document.addEventListener("click", (e) => {
  let del_class = [...e.target.classList];
  console.log(del_class);
  if (del_class.includes("btnDelete")) {
    const del_id = e.target.id;
    fetch(`${API}/${del_id}`, {
      method: "DELETE",
    }).then(() => readTask());
  }
});

// ! EDIT
let inpEdit1 = document.querySelector(".inpEdit1");
let inpEdit2 = document.querySelector(".inpEdit2");
let inpEdit3 = document.querySelector(".inpEdit3");
let inpEdit4 = document.querySelector(".inpEdit4");
let saveEdit = document.querySelector(".saveEdit");
let edit = document.querySelector(".edit");
document.addEventListener("click", (e) => {
  let edit_class = [...e.target.classList];
  if (edit_class.includes("btnEdit")) {
    edit.style.display = "block";
    let id = e.target.id;
    fetch(`${API}/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        inpEdit1.value = data.task;
        saveEdit.setAttribute("id", data.id);
      });
  }
});

saveEdit.addEventListener("click", () => {
  let editTask = {
    name: inp1.value,
  };
  editedTask(editTask, saveEdit.id);
  edit.style.display = "none";
});
function editedTask(editTask, id) {
  fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(editTask),
  }).then(() => readTask());
}
