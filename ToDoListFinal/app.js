// Function to add a task

function addTask(event) {
    event.preventDefault();
    var taskInput = document.getElementById("task-input");
    var taskList = document.getElementById("task-list");
  
    var task = taskInput.value.trim();
  
    if (task === "") {
      alert("Please enter a valid task.");
      return;
    }
    
    // Limit the input to 30 characters
    if (task.length > 30) {
      alert("Task must be less than or equal to 30 characters.");
      return;
    }
  
    var listItem = document.createElement("li");
    listItem.classList.add("task");
    listItem.innerHTML = `
      <div class="task-box"></div>
      <div class="task-text">${task}</div>
      <button class="move-up">Up</button>
      <button class="move-down">Down</button>
      <button class="delete">Delete</button>
    `;
  
    var moveUpButton = listItem.querySelector(".move-up");
    var moveDownButton = listItem.querySelector(".move-down");
  
    moveUpButton.addEventListener("click", moveTaskUp);
    moveDownButton.addEventListener("click", moveTaskDown);
  
    var deleteButton = listItem.querySelector(".delete");
    deleteButton.addEventListener("click", deleteTask);
  
    taskList.appendChild(listItem);
  
    taskInput.value = "";
    updateTaskCount();
  }
  
  
  // Function to move a task up
  function moveTaskUp() {
    var listItem = this.parentNode;
    var prevItem = listItem.previousElementSibling;
  
    if (prevItem) {
      listItem.parentNode.insertBefore(listItem, prevItem);
      updateTaskCount();
    }
  }
  
  // Function to move a task down
  function moveTaskDown() {
    var listItem = this.parentNode;
    var nextItem = listItem.nextElementSibling;
  
    if (nextItem) {
      listItem.parentNode.insertBefore(nextItem, listItem);
      updateTaskCount();
    }
  }
  
  // Function to delete a task
  function deleteTask() {
    var listItem = this.parentNode;
    listItem.parentNode.removeChild(listItem);
    updateTaskCount();
  }
  
  // Function to update the task count
  function updateTaskCount() {
    var taskCount = document.getElementById("task-count");
    var taskList = document.getElementById("task-list");
    var count = taskList.children.length;
    taskCount.textContent = `Total Tasks: ${count}`;
  }
  
  // Event listener for form submission
  var todoForm = document.getElementById("todo-form");
  todoForm.addEventListener("submit", addTask);
  
  // Update initial task count
  updateTaskCount();
  