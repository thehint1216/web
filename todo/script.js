let tasks = [];

$(document).ready(function () {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }
  loadList();
});

function loadList() {
  $("#to-do-list").empty();
  for (let i = 0; i < tasks.length; i++) {
    var codeUp = '<i class="fa fa-chevron-up" onclick="moveTaskUp(' + i + ')"></i>';
    var codeDown = '<i class="fa fa-chevron-down" onclick="moveTaskDown(' + i + ')"></i>';
    var codeMarkAsDone = `<i class="fa fa-check" onclick="toggleTaskCompletion(${i})" style="color: ${
      tasks[i].completed ? "green" : "gray"
    };" aria-hidden="true"></i>`;
    
    if (i === 0) {
      codeUp = '';
    }
    if (i === tasks.length - 1) {
      codeDown = '';
    }
    
    const li = $("<li></li>")
      .addClass("gok")
      .css("text-decoration", tasks[i].completed ? "line-through" : "none")
      .css("background-color", tasks[i].color)
      .html(
        `${tasks[i].name} (${tasks[i].dateline}) 
        <div> ${codeUp} ${codeDown} ${codeMarkAsDone}
          <i class="fa fa-trash" onclick="deleteTask(${i})"></i>
        </div>`
      );
    $("#to-do-list").append(li);
  }
}

function addTask() {
  const taskName = $("#task-input").val();
  const taskDateline = $("#dateline-input").val();

  if (!taskName || !taskDateline) {
    alert("Please enter both task and due date.");
    return;
  }
  
  var colors = randomColor();

  const todoObj = {
    name: taskName,
    dateline: taskDateline,
    completed: false,
    color: colors
  };
  tasks.push(todoObj);

  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadList();

  $("#task-input").val("");
  $("#dateline-input").val("");
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadList();
}

function deleteAllTasks() {
  tasks = [];
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadList();
}

function moveTaskUp(index) {
  if (index > 0) {
    [tasks[index - 1], tasks[index]] = [tasks[index], tasks[index - 1]]; 
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadList();
  }
}

function moveTaskDown(index) {
  if (index < tasks.length - 1) {
    [tasks[index], tasks[index + 1]] = [tasks[index + 1], tasks[index]]; 
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadList();
  }
}

function toggleTaskCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadList();
}

function markAllAsDone() {
  tasks = tasks.map(task => ({ ...task, completed: true }));
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadList();
}

function randomColor() {
  var randColor = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
  return randColor;
}
