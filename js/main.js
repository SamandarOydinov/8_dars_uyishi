// =========== Task Management ===========
const listOfTasks = document.getElementById('list-of-my-tasks');
const addBtn = document.getElementById('add');
const deleteBtn = document.getElementById('delete');
const editBtn = document.getElementById('edit');
const progress = document.getElementById('progress');
const select = document.querySelector('.select');

select.addEventListener('change', () => {
  if (select.value === 'all') {
    renderTasks();
  } else if (select.value === 'archived') {
    renderTasksByArchived();
  } else {
    renderTasksByActive();
  }
});

let tasks = JSON.parse(localStorage.getItem('tasks_list')) || [];
let archived = JSON.parse(localStorage.getItem('archived')) || [];
const refreshStorage = () =>
  localStorage.setItem('tasks_list', JSON.stringify(tasks));

const renderTasksByActive = () => {
  let tasksList = '';
  let activeTasksCount = 0;

  listOfTasks.innerHTML = '';

  tasks.forEach((task) => {
    if (!task.conpleted && !task.archived) {
      activeTasksCount++;

      tasksList += `
            <div onclick="handleTaskClick('${task.id}')"  class="${!task.archived ? 'bg-white' : 'bg-green-300'} rounded-xl shadow p-4 flex justify-between items-center">
                <p class="font-semibold ${task.archived && 'text-slate-500'}">${task.title}</p>
                <div class="flex gap-2">
                    ${
                      task.archived
                        ? `<button class="archived border bg-slate-400 text-white border-slate-200 py-1 px-3 rounded shadow-sm">archived</button>`
                        : `<button onclick="editBtnClicked(event, ${task.id})" class="edit border bg-blue-400 text-white border-slate-200 py-1 px-3 rounded shadow-sm">edit</button> <button onclick="deleteBtnClicked(event, ${task.id})" class="delete border bg-red-400 text-white border-slate-200 py-1 px-3 rounded shadow-sm">delete</button>`
                    } 
                </div>
            </div>
        `;
    }
  });

  if (activeTasksCount === 0) {
    listOfTasks.innerHTML = `<div class="bg-slate-50 text-slate-400 font-bold rounded-xl shadow p-4 flex justify-center items-center">No Data</div>`;
    return;
  }

  listOfTasks.innerHTML = tasksList;
  progress.innerText = `${activeTasksCount}/${tasks.length} ~ ${Math.round((activeTasksCount * 100) / tasks.length)}%`;
};

const renderTasksByArchived = () => {
  let tasksList = '';
  let archivedTasksCount = 0;

  listOfTasks.innerHTML = '';

  tasks.forEach((task) => {
    if (task.archived) {
      archivedTasksCount++;

      tasksList += `
            <div onclick="handleTaskClick('${task.id}')"  class="${!task.archived ? 'bg-white' : 'bg-green-300'} rounded-xl shadow p-4 flex justify-between items-center">
                <p class="font-semibold ${task.archived && 'text-slate-500'}">${task.title}</p>
                <div class="flex gap-2">
                    ${
                      task.archived
                        ? `<button class="archived border bg-slate-400 text-white border-slate-200 py-1 px-3 rounded shadow-sm">archived</button>`
                        : `<button onclick="editBtnClicked(event, ${task.id}) class="edit border bg-blue-400 text-white border-slate-200 py-1 px-3 rounded shadow-sm">edit</button>
                        <button onclick="deleteBtnClicked(event, ${task.id}) class="delete border bg-red-400 text-white border-slate-200 py-1 px-3 rounded shadow-sm">delete</button>`
                    } 
                </div>
            </div>
        `;
    }
  });

  if (archivedTasksCount === 0) {
    listOfTasks.innerHTML = `<div class="bg-slate-50 text-slate-400 font-bold rounded-xl shadow p-4 flex justify-center items-center">No Data</div>`;
    return;
  }

  listOfTasks.innerHTML = tasksList;
  progress.innerText = `${archivedTasksCount}/${tasks.length} ~ ${Math.round((archivedTasksCount * 100) / tasks.length)}%`;
};

const renderTasks = () => {
  let tasksList = '';
  let archivedTasksCount = 0;

  listOfTasks.innerHTML = '';

  if (tasks.length === 0) {
    listOfTasks.innerHTML = `<div class="bg-slate-50 text-slate-400 font-bold rounded-xl shadow p-4 flex justify-center items-center">No Data</div>`;
    return;
  }

  tasks.forEach((task) => {
    if (task.archived) archivedTasksCount++;

    tasksList += `
            <div onclick="handleTaskClick('${task.id}')"  class="${!task.archived ? 'bg-white' : 'bg-green-300'} rounded-xl shadow p-4 flex justify-between items-center">
                <p class="font-semibold ${task.archived && 'text-slate-500'}">${task.title}</p>
                <div class="flex gap-2">
                    ${
                      task.archived
                        ? `<button class="archived border bg-slate-400 text-white border-slate-200 py-1 px-3 rounded shadow-sm">archived</button>`
                        : `<button onclick="editBtnClicked(event, ${task.id})" class="edit border bg-blue-400 text-white border-slate-200 py-1 px-3 rounded shadow-sm">edit</button>
                        <button onclick="deleteBtnClicked(event, ${task.id})" class="delete border bg-red-400 text-white border-slate-200 py-1 px-3 rounded shadow-sm">delete</button>`
                    } 
                </div>
            </div>
        `;
  });

  listOfTasks.innerHTML = tasksList;
  progress.innerText = `${archivedTasksCount}/${tasks.length} ~ ${Math.round((archivedTasksCount * 100) / tasks.length)}%`;
};
const editBtnClicked = (event, taskId) => {
  event.stopPropagation();
  console.log(taskId);
  const newName = prompt('Yangi nom kiriting:');
  const index = tasks.findIndex((item) => item.id == taskId);
  if (index !== -1) {
    tasks[index].title = newName;
    tasks[index].updated_at = Date.now();
  }
  refreshStorage();
  renderTasks(); // Yangi qiymat berish
  select.dispatchEvent(new Event('change'));
};

const deleteBtnClicked = (event, taskId) => {
  if (confirm('Are you sure?')) {
    event.stopPropagation();
    console.log(taskId);
    const index = tasks.findIndex((item) => item.id == taskId);
    if (index !== -1) {
      tasks.splice(index, 1);
    }
    refreshStorage();
    renderTasks();
    renderTasks(); // Yangi qiymat berish
    select.dispatchEvent(new Event('change'));
  }
};

addBtn.addEventListener('click', () => {
  const newTask = {
    id: Date.now(),
    title: prompt('Title of the task:'),
    created_at: Date.now(),
    updated_at: Date.now(),
    completed: false,
    archived: false,
  };

  !!newTask.title ? tasks.push(newTask) : alert('Should be real title!');

  refreshStorage();
  renderTasks();
  select.dispatchEvent(new Event('change'));
});

const handleTaskClick = (id) => {
  if (confirm('Are you sure?')) {
    tasks = tasks.map((task) => {
      if (task.id == id) {
        if (!task.archived) {
          task.archived = true;
          archived.push(task);
          localStorage.setItem('archived', JSON.stringify(archived));
        } else {
          task.archived = false;
          console.log('old archived: ', archived);
          const index = archived.findIndex((item) => item.id == id);
          if (index !== -1) {
            archived.splice(index, 1);
          }
          console.log('archived: ', archived);
          localStorage.setItem('archived', JSON.stringify(archived));
        }
      }

      return task;
    });

    refreshStorage();
    renderTasks();
    select.dispatchEvent(new Event('change'));
  }
};

renderTasks();

document.cookie = 'token=eyXdsnkjfnfkjngfkdjfnodwenjkndlfgnfdlkgnlkdn';

if (!document.cookie.includes('token')) {
  window.location.href = '/login';
}

// ========== Web Storages ==========
// const btn = document.getElementById("cleaner");
// const setObjectBtn = document.getElementById("set-object");
// const getObjectBtn = document.getElementById("get-object");

// localStorage.setItem("theme", "dark");
// localStorage.setItem("time", Date.now());

// localStorage.setItem("user", JSON.stringify({
//     name: "John Doe",
//     age: 16
// }));

// setObjectBtn.addEventListener("click", () => {
//     const nUser = {
//         name: prompt("User name"),
//         age: prompt("User age")
//     };

//     localStorage.setItem("user", JSON.stringify(nUser));
// })

// btn.addEventListener("click", () => {
//     localStorage.clear();
//     // localStorage.removeItem("theme");
// });

// getObjectBtn.addEventListener("click", () => {
//     const user = localStorage.getItem("user");
//     console.log(JSON.parse(user));

// })
