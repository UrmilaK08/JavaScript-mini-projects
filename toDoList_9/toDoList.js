const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const tasksContainer = document.querySelector("#tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");
let taskCount = 0;

const displayCount = () => {
    countValue.innerText = taskCount;
};

const addTask = () => {
    const taskName = newTaskInput.value.trim();
    error.style.display = "none";

    if (!taskName) {
        setTimeout(() => {
            error.style.display = "block";
        }, 200);
        return;
    }

    const task = document.createElement("div");
    task.classList.add("task");
    task.innerHTML = `
        <input type="checkbox" class="task-check">
        <span class="taskname">${taskName}</span>
        <button class="edit">
            <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="delete">
            <i class="fa-solid fa-trash"></i>
        </button>
    `;

    tasksContainer.appendChild(task);

    taskCount++;
    displayCount();

    newTaskInput.value = "";

    task.querySelector(".delete").addEventListener("click", function () {
        task.remove();
        taskCount--;
        displayCount();
    });

    task.querySelector(".edit").addEventListener("click", function () {
        let newTaskName = prompt("Edit your task:", taskName);
        if (newTaskName) {
            task.querySelector(".taskname").innerText = newTaskName;
        }
    });
};

addBtn.addEventListener("click", addTask);
