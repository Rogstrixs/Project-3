// Task list array
let taskList = [];

// Function to add a task
function addTask() {
  try {
    const taskInput = document.getElementById('taskInput');
    if (!taskInput) {
      console.error('Task input element not found');
      return;
    }
    const taskText = taskInput.value.trim();
    if (!taskText) {
      console.error('Task text is empty');
      return;
    }
    const taskStatus = 'planned'; // default status
    const task = {
      id: Date.now(),
      text: taskText,
      status: taskStatus
    };
    taskList.push(task);
    saveTask(taskList);
    renderTask(task);
    taskInput.value = ''; // clear the input field
  } catch (error) {
    console.error('Error adding task:', error);
  }
}

// Function to save the task list to local storage
function saveTask(taskList) {
  try {
    localStorage.setItem('taskList', JSON.stringify(taskList));
  } catch (error) {
    console.error('Error saving task list:', error);
  }
}

// Function to render the task list
function renderTask(task) {
  try {
    let listElement;
    if (task.status === 'important') {
      listElement = document.getElementById('importantList');
    } else if (task.status === 'planned') {
      listElement = document.getElementById('plannedList');
    } else if (task.status === 'complete') {
      listElement = document.getElementById('completeList');
    }
    if (!listElement) {
      console.error('Task list element not found');
      return;
    }
    const taskListItem = document.createElement('li');
    taskListItem.textContent = task.text;
    listElement.appendChild(taskListItem);
    console.log(`Task added: ${task.text}`);
  } catch (error) {
    console.error('Error rendering task list:', error);
  }
}

// Load the task list from local storage
function loadTaskList() {
  try {
    const storedTaskList = localStorage.getItem('taskList');
    if (storedTaskList) {
      taskList = JSON.parse(storedTaskList);
      taskList.forEach((task) => {
        renderTask(task);
      });
    }
  } catch (error) {
    console.error('Error loading task list:', error);
  }
}

// Add event listener to the add task button
document.addEventListener('DOMContentLoaded', () => {
  const addTaskButton = document.getElementById('addTaskButton');
  if (!addTaskButton) {
    console.error('Add task button element not found');
    return;
  }
  addTaskButton.addEventListener('click', addTask);
  loadTaskList();
});