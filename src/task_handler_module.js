import Task from './task';

// const taskHandler = (() => {
function taskFormData(action) {
  const taskTitle = document.getElementById('task-title');
  const taskDesc = document.getElementById('task-desc');
  const taskDate = document.getElementById('task-date');
  const taskPriority = document.getElementById('task-priority');
  let data;
  switch (action) {
    case 'get':
      data = new Task(taskTitle.value, taskDesc.value, taskDate.value, taskPriority.checked);
      break;
    case 'clear':
      taskTitle.value = '';
      taskDesc.value = '';
      taskDate.value = '';
      taskPriority.checked = false;
      break;
    default:
      break;
  }
  return data;
}

function taskClick(event) {
  const [desc] = event.target.getElementsByClassName('task-desc');
  const [edit] = event.target.getElementsByClassName('edit');
  desc.classList.toggle('hide');
  edit.classList.toggle('hide');
}

function renderTaskItem(taskContent) {
  const container = document.getElementById('content');
  const card = document.createElement('div');
  card.classList.add('task-card');
  if (taskContent.priority) {
    card.classList.add('high-priority');
  }

  const header = document.createElement('h1');
  header.classList.add('task-title');
  header.textContent = taskContent.title;

  const desc = document.createElement('p');
  desc.setAttribute('class', 'task-desc hide');
  desc.textContent = taskContent.description;

  const date = document.createElement('p');
  date.textContent = taskContent.date;

  const buttons = document.createElement('div');
  buttons.classList.add('buttons');

  const delbtn = document.createElement('button');
  delbtn.setAttribute('class', 'action-button delete');
  delbtn.innerHTML = '<i class="fa fa-trash-o fa-3x" aria-hidden="true"></i>';

  const editbtn = document.createElement('button');
  editbtn.setAttribute('class', 'action-button edit hide');
  editbtn.innerHTML = '<i class="fa fa-pencil fa-3x" aria-hidden="true"></i>';

  const compltbtn = document.createElement('button');
  compltbtn.setAttribute('class', 'action-button complete');
  compltbtn.innerHTML = '<i class="fa fa-check fa-3x" aria-hidden="true"></i>';

  buttons.append(compltbtn, editbtn, delbtn);

  card.append(header, desc, date, buttons);
  card.addEventListener('click', taskClick);
  container.append(card);
}

export default function createTask(event) {
  const form = document.getElementById('task-form');
  const contents = document.getElementById('content');
  const state = event.target.getAttribute('data-state');
  if (state === '1') {
    event.target.setAttribute('data-state', '0');
    const tempTask = taskFormData('get');
    renderTaskItem(tempTask);
    taskFormData('clear');
    // tasks.push(tempTask);
    // appStorage.setItem('tasks',tasks);
  } else {
    event.target.setAttribute('data-state', '1');
  }
  form.classList.toggle('hide');
  contents.classList.toggle('hide');
  event.target.classList.toggle('full-view');
}
// })();