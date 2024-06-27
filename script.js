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
    renderTask(taskList);
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
function renderTask(taskList) {
  try {
    const taskListElement = document.getElementById('taskList');
    if (!taskListElement) {
      console.error('Task list element not found');
      return;
    }
    taskListElement.innerHTML = ''; // clear the list
    taskList.forEach((task) => {
      const taskElement = document.createElement('li');
      taskElement.textContent = task.text;
      taskListElement.appendChild(taskElement);
      console.log(`Task added: ${task.text}`);
    });
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
      renderTask(taskList);
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