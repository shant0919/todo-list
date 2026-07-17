const tasks = document.querySelector(".tasks");
const inputTask = document.getElementById("inputTask");
const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", addTask);

inputTask.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

function addTask() {
  inputTask.value = inputTask.value.trim();
  if (inputTask.value === "") {
    return;
  }
  let listElement = document.createElement("li");

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("tick");

  let textValue = document.createElement("span");
  textValue.innerText = inputTask.value;

  let delBtn = document.createElement("button");
  delBtn.classList.add("delete");
  let icon = document.createElement("img");
  icon.src = "cross.svg";
  icon.alt = "delete";
  icon.classList.add("delete-icon");

  delBtn.appendChild(icon);

  listElement.appendChild(checkbox);
  listElement.appendChild(textValue);
  listElement.appendChild(delBtn);
  tasks.appendChild(listElement);
  inputTask.value = "";
}

tasks.addEventListener("click", function (e) {
  if (e.target.closest(".delete")) {
    let li = e.target.closest("li");
    li.remove();
  }

  if (e.target.matches(".tick")) {
    let li = e.target.parentElement;
    li.classList.toggle("completed");
  }
});
