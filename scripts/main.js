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

// Event Listeners

btnAddTask.addEventListener("click", () => {
    createTask();
});

inputName.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        createTask();
    }
});

document.addEventListener("click", (element) => {
    const trash = element.target.classList.value;
    
    if (trash === "trash") {
        const taskName = element.target.parentNode.childNodes[1].innerText;
        deleteTask(taskName);
    }
});

// Call Functions

printEmptyListText();

// Functions

function printEmptyListText() {
    if (main.childNodes.length === 0) {
        const text = document.createElement("p");
        text.classList.add("text-empty-list");
        text.textContent = "Não a tarefas agora :)";
        main.appendChild(text);
    } else if (main.childNodes.length >= 2 && document.querySelector(".text-empty-list") !== null) {
        document.querySelector(".text-empty-list").remove();
    }
}

function createTask() {
    const nameTask = inputName.value;

    if (nameTask === "") {
        alert("O campo de título não pode estar vazio! Adicione um título!");
        return;
    }

    const nameTaskCapitalize = capitalizeFirstLetter(nameTask);
    
    const task = {"name": nameTaskCapitalize};
    listTask.push(task);

    localStorage.setItem("tasks", JSON.stringify(listTask));

    printTaks(nameTaskCapitalize);
    clearInputs();
}

function deleteTask(name) {
    const confirm = window.confirm(`Você tem certeza que quer apagar a tarefa "${name}"?`);
    if (!confirm) return;

    for (let i = 0; i < listTask.length; i++) {
        if (name === listTask[i].name) {
            listTask.splice(i, 1);
            main.removeChild(main.childNodes[i]);    
            localStorage.setItem("tasks", JSON.stringify(listTask));
            return;
        }
    }
}

function printTaks(name) {
    const task = document.createElement("div");
    const inputCheckbox = document.createElement("input");
    const taskName = document.createElement("p");
    const imgTrash = document.createElement("img");

    task.classList = "task";
    inputCheckbox.setAttribute("type", "checkbox");
    taskName.innerText = name;
    imgTrash.classList.add("trash");
    imgTrash.setAttribute("src", "img/trash.svg");
    imgTrash.setAttribute("alt", "trash");

    task.appendChild(inputCheckbox);
    task.appendChild(taskName);
    task.appendChild(imgTrash);

    main.appendChild(task);

    printEmptyListText();
}

function clearInputs() {
    inputName.value = "";
}

function clearAll() {
    const confirm = window.confirm(`ATENÇÃO! Você tem certeza que deseja apagar TODAS as tarefas?`);
    if (!confirm) return;

    listTask = [];

    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }

    clearInputs();
    localStorage.setItem("tasks", JSON.stringify(listTask));
}

function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
