const tasks = document.querySelector(".tasks");
const inputTask = document.getElementById("inputTask");
const addBtn = document.getElementById("addBtn");
let taskList = [];

addBtn.addEventListener("click", addTask);

inputTask.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

tasks.addEventListener("click", function (e) {
  let li = e.target.closest("li");
  if (!li) return;

  let id = Number(li.dataset.id);
  if (e.target.closest(".delete")) {
    deleteTask(id);
  }

  if (e.target.matches(".tick")) {
    toggleTask(id);
  }
});

function render() {
  tasks.innerHTML = "";

  taskList.forEach(function (task) {
    let li = document.createElement("li");

    li.dataset.id = task.id;

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("tick");
    checkbox.checked = task.completed;

    let textValue = document.createElement("span");
    textValue.innerText = task.text;

    let delBtn = document.createElement("button");
    delBtn.classList.add("delete");
    let icon = document.createElement("img");
    icon.src = "./assests/cross.svg";
    icon.alt = "delete";
    icon.classList.add("delete-icon");

    delBtn.appendChild(icon);

    li.appendChild(checkbox);
    li.appendChild(textValue);
    li.appendChild(delBtn);

    if (task.completed) {
      li.classList.add("completed");
    }

    tasks.appendChild(li);
  });
}

function addTask() {
  let text = inputTask.value.trim();
  if (text === "") return;

  let id = Date.now();

  let completed = false;

  let obj = {
    id: id,
    text: text,
    completed: completed,
  };

  taskList.push(obj);
  inputTask.value = "";

  saveTask();
  render();
}

function deleteTask(id) {
  taskList = taskList.filter((task) => task.id !== id);

  saveTask();
  render();
}

function toggleTask(id) {
  taskList = taskList.map(function (task) {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  });

  saveTask();
  render();
}

function saveTask() {
  localStorage.setItem("tasks", JSON.stringify(taskList));
}

function loadTask() {
  let saved = localStorage.getItem("tasks");
  if (saved !== null) {
    taskList = JSON.parse(saved);
  }
}

loadTask();
render();
