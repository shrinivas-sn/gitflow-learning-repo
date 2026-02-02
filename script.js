// Task Manager JavaScript
document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const clearAllBtn = document.getElementById('clearAllBtn');
    const emptyState = document.getElementById('emptyState');
    const totalTasksEl = document.getElementById('totalTasks');
    const todayTasksEl = document.getElementById('todayTasks');

    // Update task counter
    function updateTaskCount() {
        const taskCount = taskList.children.length;
        totalTasksEl.textContent = taskCount;
        todayTasksEl.textContent = taskCount;

        // Toggle empty state
        if (taskCount === 0) {
            taskList.classList.add('hidden');
            emptyState.classList.remove('hidden');
        } else {
            taskList.classList.remove('hidden');
            emptyState.classList.add('hidden');
        }
    }

    // Add task function
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create new task item
        const li = document.createElement('li');
        li.className = 'task-item';

        const taskContent = document.createElement('div');
        taskContent.className = 'task-content';

        const taskIcon = document.createElement('span');
        taskIcon.className = 'task-icon';
        taskIcon.textContent = '📌';

        const taskTextSpan = document.createElement('span');
        taskTextSpan.className = 'task-text';
        taskTextSpan.textContent = taskText;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑️';
        deleteBtn.className = 'btn-delete';
        deleteBtn.onclick = function () {
            li.style.animation = 'fadeOut 0.3s';
            setTimeout(() => {
                li.remove();
                updateTaskCount();
            }, 300);
        };

        taskContent.appendChild(taskIcon);
        taskContent.appendChild(taskTextSpan);
        li.appendChild(taskContent);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);

        // Clear input
        taskInput.value = '';
        taskInput.focus();

        // Update counter
        updateTaskCount();
    }

    // Clear all tasks
    clearAllBtn.addEventListener('click', function () {
        if (taskList.children.length === 0) return;

        if (confirm('Are you sure you want to clear all tasks?')) {
            taskList.innerHTML = '';
            updateTaskCount();
        }
    });

    // Event listeners
    addTaskBtn.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Add delete functionality to existing tasks
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.onclick = function () {
            const li = this.parentElement;
            li.style.animation = 'fadeOut 0.3s';
            setTimeout(() => {
                li.remove();
                updateTaskCount();
            }, 300);
        };
    });

    // Initial count update
    updateTaskCount();

    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            darkModeToggle.textContent = '☀️ Light Mode';
        } else {
            darkModeToggle.textContent = '🌙 Dark Mode';
        }
    });
});

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100px); }
    }
`;
document.head.appendChild(style);
