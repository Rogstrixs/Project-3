document.addEventListener('DOMContentLoaded', (event) => {
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
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => renderTask(task));
}

function renderTask(task) {
    const taskList = document.getElementById(`${task.status}List`);
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
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            task.status = status;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    refreshTaskLists();
}

function removeTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    refreshTaskLists();
}

function refreshTaskLists() {
    document.getElementById('plannedList').innerHTML = '';
    document.getElementById('completeList').innerHTML = '';
    document.getElementById('importantList').innerHTML = '';
    loadTasks();
}
