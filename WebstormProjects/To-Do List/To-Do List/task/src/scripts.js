// setting event listener on add button
document.getElementById("add-task-button").addEventListener("click", addTask);
// getting the elements needed
let taskList = document.getElementById("task-list");
let inputField = document.getElementById("input-task");
let taskStorage = [
    // task objects
]


function onStart() {
    if (localStorage.getItem("task-elements")) {
        taskStorage = JSON.parse(localStorage.getItem("task-elements")) || [];
        displayTasks();
        updateStorage();
    }
}

onStart();

function remove(idx) {
    taskStorage.splice(idx, 1);
    updateStorage();
    displayTasks();
    return this.parentNode.remove();
}

function checkedBox(idx) {
    taskStorage[idx].checked = !taskStorage[idx].checked;
    updateStorage();
    displayTasks();
}


function displayTasks() {
    let template = '';
    taskStorage.forEach(function (item, idx) {
        document.getElementById("input-task").value = '';
        template += `
        <li>
            <input type="checkbox" class="checkbox-input" onclick="checkedBox(${idx})" ${item.checked ? 'checked' : ''}>
            <span class="task">${item.taskName}</span>
            <button class="delete-btn" onclick="remove(${idx})">Remove</button>
        </li>
        `;
    });
    taskList.innerHTML = template;
}


function addTask(){
    // creating new li element to be added
    /*
    let li = document.createElement("li");
    // setting li element
    li.innerHTML =
        '<input type="checkbox" class="checkbox-input"><span class="task" id="new-task">'
        + inputField.value
        + '</span><button class="delete-btn" onClick="this.parentNode.remove()">Remove</button>';
    // appending li element to the end of the ul element
    taskList.appendChild(li);
     */
    let newTask = {
        taskName: inputField.value,
        checked: false
    }
    if (inputField.value !== "") {
        // adding new task to list and localstorage
        taskStorage.unshift(newTask);
        displayTasks();
        updateStorage();
    }
}


function updateStorage() {
    localStorage.setItem("task-elements", JSON.stringify(taskStorage));
}

