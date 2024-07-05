const taskInput = document.querySelector(".task-input input"),
taskBox = document.querySelector(".task-box"),
clearAll = document.querySelector(".clear-btn");

let editId;
let isEditedTask = false;
//localStorage todo-list
let todos = JSON.parse(localStorage.getItem("todo-list"));

//Отображение задачи в списке
function showTodo(){
    let li="";
    if (todos){
        todos.forEach((todo,id) => {
            let isComplited = todo.status == "completed" ? "checked" : "";
            li += `<li class="task">
                    <label for="${id}" >
                        <input onclick = "updateStatus(this)" type="checkbox" id="${id}" ${isComplited}>
                        <input type="text"  class="${isComplited}" value = "${todo.name}" />
                    </label>
                    <div class="settings">
                        <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                        <ul class="task-menu">
                            <li onclick = "editTask(${id}, '${todo.name}')">
                                <i class="uil uil-pen"></i>
                                Редактировать
                            </li>
                            <li onclick = "deleteTask(${id})">
                                <i class="uil uil-trash"></i>
                                Удалить
                            </li>
                        </ul>
                    </div>
                   </li>`;
        });
        taskBox.innerHTML = li;
    }
    
}

//показать меню, где содержаться кнопки "Редактировать" и "Удалить", и его скрытие при нажатии на любое место экрана
function showMenu(selectedTask){
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click", e => {
        if (e.target.tagName != "I" || e.target != selectedTask) {
            taskMenu.classList.remove("show");
        }
    });
}

//Редактирование задачи
function editTask(taskId, taskName){
    editId = taskId;
    isEditedTask = true;
    taskInput.value = taskName;
}

//Удаление элемента из списка
function deleteTask(deleteId) {
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
}

//Очистить список
clearAll.addEventListener("click", () => {
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
})

//Изменение статуса задачи
function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked){
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
}

//Добавление задачи в список при нажатии Enter
taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if (e.key == "Enter" && userTask) {
        if (!isEditedTask) {
            if (!todos){
                todos=[];
            }
            let taskInfo = {name: userTask, status: "pending"};
            todos.push(taskInfo);
        } else {
            isEditedTask = false;
            todos[editId].name = userTask;
        }       
        taskInput.value="";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo();
    }
});

showTodo();