const apiUrl = 'http://localhost:8080/api/todos';

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('welcomeMessage').style.display = 'none';
        document.getElementById('app').style.display = 'block';
        loadTodos();
        loadTodaysProgress();
    }, 3000);  // 3 seconds delay for welcome message
});

function loadTodos() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const todoList = document.getElementById('todoList');
            todoList.innerHTML = '';
            data.forEach(todo => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${todo.task}</td>
                    <td>${todo.description}</td>
                    <td>${todo.category}</td>
                    <td>${todo.dueDate}</td>
                    <td>${todo.priority}</td>
                    <td>${todo.status}</td>
                    <td><button onclick="deleteTodo(${todo.id})">Delete</button></td>
                `;
                todoList.appendChild(tr);
            });
        });
}

function loadTodaysProgress() {
    fetch(apiUrl + '/progress')
        .then(response => response.json())
        .then(data => {
            const progressList = document.getElementById('progressList');
            progressList.innerHTML = '';
            data.forEach(todo => {
                const li = document.createElement('li');
                li.textContent = `${todo.task} - ${todo.description} - ${todo.category} - ${todo.dueDate} - ${todo.priority} - ${todo.status}`;
                progressList.appendChild(li);
            });
        });
}

function showAddTaskForm() {
    document.getElementById('addTaskForm').style.display = 'block';
}

function hideAddTaskForm() {
    document.getElementById('addTaskForm').style.display = 'none';
}

function addTodo() {
    const taskInput = document.getElementById('taskInput');
    const descriptionInput = document.getElementById('descriptionInput');
    const categoryInput = document.getElementById('categoryInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const priorityInput = document.getElementById('priorityInput');
    
    const newTask = {
        task: taskInput.value,
        description: descriptionInput.value,
        category: categoryInput.value,
        dueDate: dueDateInput.value,
        priority: priorityInput.value,
        status: 'Pending'
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
    })
    .then(response => response.json())
    .then(todo => {
        loadTodos();
        hideAddTaskForm();
        taskInput.value = '';
        descriptionInput.value = '';
        categoryInput.value = '';
        dueDateInput.value = '';
        priorityInput.value = 'Low';
    });
}

function deleteTodo(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    })
    .then(() => loadTodos());
}
