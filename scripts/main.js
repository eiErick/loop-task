const inputName = document.querySelector(".input-task-name");
const main = document.querySelector(".main");
const btnAddTask = document.querySelector(".btn-add-task");

const savedTask = localStorage.getItem("tasks");

let listTask = [];

if (savedTask) {
    listTask = JSON.parse(savedTask);
    listTask.forEach(task => {
        printTaks(task.name);
    });
}

btnAddTask.addEventListener("click", () => {
    createTask();
});

inputName.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      createTask();
    }
});

function createTask() {
    const nameTask = inputName.value;
    const nameTaskCapitalize = capitalizeFirstLetter(nameTask);
    
    const task = {"name": nameTaskCapitalize};
    listTask.push(task);

    localStorage.setItem("tasks", JSON.stringify(listTask));

    printTaks(nameTaskCapitalize);
    clearInputs();
}

function printTaks(name) {
    const task = document.createElement("div");
    const inputCheckbox = document.createElement("input");
    const taskName = document.createElement("p");
    const imgTrash = document.createElement("img");

    task.classList = "task";
    inputCheckbox.setAttribute("type", "checkbox");
    taskName.innerText = name;
    imgTrash.setAttribute("src", "img/trash.svg");
    imgTrash.setAttribute("alt", "trash");

    task.appendChild(inputCheckbox);
    task.appendChild(taskName);
    task.appendChild(imgTrash);

    main.appendChild(task);
}

function clearInputs() {
    inputName.value = "";
}

function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
