document.addEventListener('DOMContentLoaded', (event) => {
    const addTaskButton = document.querySelector('button[onclick="addTask()"]');
    addTaskButton.addEventListener('click', addTask);
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const task = {
        id: Date.now(),
        text: taskText,
        status: 'planned'
    };

    saveTask(task);
    renderTask(task);
    taskInput.value = '';
}

function saveTask(task) {
    let tasks = getCookie('tasks') || [];
    tasks.push(task);
    setCookie('tasks', JSON.stringify(tasks), 30);
}

function loadTasks() {
    let tasks = getCookie('tasks') || [];
    tasks = JSON.parse(tasks);
    tasks.forEach(task => renderTask(task));
}

function renderTask(task, taskList) {
    if (!taskList) {
        taskList = document.getElementById(`${task.status}List`);
    }
    const taskItem = document.createElement('li');
    taskItem.setAttribute('data-id', task.id);
    taskItem.innerHTML = `
        <span>${task.text}</span>
        <div>
            <button class="important" onclick="moveToImportant(${task.id})">Important</button>
            <button class="planned" onclick="moveToPlanned(${task.id})">Planned</button>
            <button class="complete" onclick="moveToComplete(${task.id})">Complete</button>
            <button class="remove" onclick="removeTask(${task.id})">Remove</button>
        </div>
    `;
    taskList.appendChild(taskItem);
}

function moveToImportant(taskId) {
    updateTaskStatus(taskId, 'important');
}

function moveToPlanned(taskId) {
    updateTaskStatus(taskId, 'planned');
}

function moveToComplete(taskId) {
    updateTaskStatus(taskId, 'complete');
}

function updateTaskStatus(taskId, status) {
    let tasks = getCookie('tasks') || [];
    tasks = JSON.parse(tasks);
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            task.status = status;
        }
        return task;
    });
    setCookie('tasks', JSON.stringify(tasks), 30);
    refreshTaskLists();
}

function removeTask(taskId) {
    let tasks = getCookie('tasks') || [];
    tasks = JSON.parse(tasks);
    tasks = tasks.filter(task => task.id !== taskId);
    setCookie('tasks', JSON.stringify(tasks), 30);
    refreshTaskLists();
}

function refreshTaskLists() {
    const tasks = getCookie('tasks') || [];
    tasks = JSON.parse(tasks);
    document.getElementById('plannedList').innerHTML = '';
    document.getElementById('completeList').innerHTML = '';
    document.getElementById('importantList').innerHTML = '';
    tasks.forEach(task => {
        renderTask(task, document.getElementById(`${task.status}List`));
    });
}

function getCookie(cname) {
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}