const taskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const tasksList = document.getElementById('tasks-list');

function addTask() {
    const taskText = taskInput.value;
    if (taskText.trim() !== '') {
        const li = document.createElement('li');
        li.textContent = taskText;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            tasksList.removeChild(li);
            saveTasks();
        });
        li.appendChild(removeButton);
        tasksList.appendChild(li);
        taskInput.value = '';
        saveTasks();
    }
}

function saveTasks() {
    const tasks = [];
    tasksList.querySelectorAll('li').forEach(li => {
        tasks.push(li.firstChild.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(taskText => {
            const li = document.createElement('li');
            li.textContent = taskText;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                tasksList.removeChild(li);
                saveTasks();
            });
            li.appendChild(removeButton);
            tasksList.appendChild(li);
        });
    }
}

addTaskButton.addEventListener('click', addTask);

document.addEventListener('DOMContentLoaded', loadTasks);
