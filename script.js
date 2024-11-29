let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const saveTasksToLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addTask = () => {
    const taskWrite = document.getElementById('taskWrite');
    const text = taskWrite.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskWrite.value = "";
        updateTaskList();
        updateStats();
        saveTasksToLocalStorage();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStats();
    saveTasksToLocalStorage();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTasksToLocalStorage();
};

const editTask = (index) => {
    const taskInput = document.getElementById('taskWrite');
    taskInput.value = tasks[index].text;
    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTasksToLocalStorage();
};

const updateStats = () => {
    const completeTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks ? (completeTasks / totalTasks) * 100 : 0;

    const progressBar = document.getElementById('did-numberBar');
    progressBar.style.width = `${progress}%`;

    document.getElementById("do-number").innerText = `${completeTasks} / ${totalTasks}`;
};

const updateTaskList = () => {
    const taskList = document.getElementById('taskLists');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} />
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <i class="fa-regular fa-pen-to-square" onClick="editTask(${index})"></i>
                <i class="fa-solid fa-trash-can" onClick="deleteTask(${index})"></i>
            </div>
        </div>
        `;

        const checkbox = listItem.querySelector(".checkbox");
        const taskText = listItem.querySelector("p");

        checkbox.addEventListener("change", () => {
            tasks[index].completed = checkbox.checked;
            if (checkbox.checked) {
                taskText.style.textDecoration = "line-through";
                taskText.style.color = "var(--teal)";
            } else {
                taskText.style.textDecoration = "none";
                taskText.style.color = "inherit";
            }
            updateStats();
            saveTasksToLocalStorage();
        });

        taskList.append(listItem);
    });
};


document.addEventListener("DOMContentLoaded", () => {
    updateTaskList();
    updateStats();
});

document.getElementById("submitButton").addEventListener("click", function (e) {
    e.preventDefault();
    addTask();
});
