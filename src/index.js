

// ################### GENERAL APPLICATION METHODS #################

// render
// function clearContents() {
//   const contents = document.getElementById('content');
//   while (contents.firstChild) {
//     contents.removeChild(contents.firstChild);
//   }
// }

// logic
// function storeTasks(tasks) {
//   const appStorage = window.localStorage;
//   appStorage.removeItem('tasks');
//   appStorage.setItem('tasks', JSON.stringify(tasks));
// }

// logic
// function getTasks() {
//   const appStorage = window.localStorage;
//   // appStorage.clear();
//   let allTasks = JSON.parse(appStorage.getItem('tasks'));
//   if (!allTasks) {
//     allTasks = [];
//   }
//   return allTasks;
// }

// logic
// function storeGroups(groups) {
//   const appStorage = window.localStorage;
//   appStorage.removeItem('groups');
//   appStorage.setItem('groups', JSON.stringify(groups));
// }

// logic
// function getGroups() {
//   const appStorage = window.localStorage;
//   // appStorage.clear();
//   let allGroups = JSON.parse(appStorage.getItem('groups'));
//   if (!allGroups) {
//     allGroups = ['General'];
//   }
//   return allGroups;
// }

// ################## TASK RELATED ######################

// render
// function createTask(event) {
//   const form = document.getElementById('task-form');
//   const contents = document.getElementById('content');
//   const groupbtn = document.getElementById('group-button');
//   const state = event.target.getAttribute('data-state');
//   const tasks = getTasks();
//   if (state === '1') {
//     event.target.setAttribute('data-state', '0');
//     const tempTask = taskFormData('get');
//     taskFormData('clear');
//     tasks.push(tempTask);
//     storeTasks(tasks);
//     clearContents();
//     renderGroups();
//   } else {
//     event.target.setAttribute('data-state', '1');
//   }

//   fillGroupsDropdown();

//   form.classList.toggle('hide');
//   contents.classList.toggle('hide');
//   event.target.classList.toggle('full-view');
//   groupbtn.classList.toggle('hide');
// }

// logic
// function taskFormData(action, editData = null) {
//   const taskTitle = document.getElementById('task-title');
//   const taskDesc = document.getElementById('task-desc');
//   const taskDate = document.getElementById('task-date');
//   const taskPriority = document.getElementById('task-priority');
//   const taskGroup = document.getElementById('task-group');
//   let data;
//   switch (action) {
//     case 'get':
//       data = new Task(taskTitle.value, taskDesc.value, taskDate.value, taskPriority.checked, taskGroup.value);
//       // data = {
//       //   title: taskTitle.value,
//       //   desc: taskDesc.value,
//       //   date: taskDate.value,
//       //   priority: taskPriority.checked,
//       //   group: taskGroup.value,
//       //   complete: false,
//       // };
//       break;
//     case 'clear':
//       taskTitle.value = '';
//       taskDesc.value = '';
//       taskDate.value = '';
//       taskPriority.checked = false;
//       break;
//     case 'set':
//       taskTitle.value = editData.title;
//       taskDesc.value = editData.desc;
//       taskDate.value = editData.date;
//       taskPriority.checked = editData.priority;
//       taskGroup.value = editData.group;
//       break;
//     default:
//       break;
//   }
//   return data;
// }

// render
// function taskClick(event) {
//   if (event.target.nodeName !== 'BUTTON') {
//     const [desc] = event.target.getElementsByClassName('task-desc');
//     const [edit] = event.target.getElementsByClassName('edit');
//     desc.classList.toggle('hide');
//     edit.classList.toggle('hide');
//   }
// }

// render
// function renderTaskItem(taskContent) {
//   const card = document.createElement('div');
//   const tasks = getTasks();
//   const index = tasks.findIndex(obj => JSON.stringify(taskContent) === JSON.stringify(obj));

//   card.classList.add('task-card');
//   if (taskContent.priority) {
//     card.classList.add('high-priority');
//   }

//   const header = document.createElement('h1');
//   header.classList.add('task-title');
//   header.textContent = taskContent.title;

//   const desc = document.createElement('p');
//   desc.setAttribute('class', 'task-desc hide');
//   desc.textContent = taskContent.desc;

//   const date = document.createElement('p');
//   date.textContent = taskContent.date;

//   const buttons = document.createElement('div');
//   buttons.classList.add('buttons');

//   const delbtn = document.createElement('button');
//   delbtn.setAttribute('class', 'action-button delete');
//   delbtn.setAttribute('tabIndex', index);
//   delbtn.innerHTML = '<i class="fa fa-trash-o fa-3x" aria-hidden="true"></i>';
//   delbtn.addEventListener('click', deleteTask);

//   const editbtn = document.createElement('button');
//   editbtn.setAttribute('class', 'action-button edit hide');
//   editbtn.tabIndex = index;
//   editbtn.innerHTML = `<i class="fa fa-pencil fa-3x" tabindex =${index} aria-hidden="true"></i>`;
//   editbtn.addEventListener('click', editTask);

//   const compltbtn = document.createElement('button');
//   compltbtn.setAttribute('class', 'action-button complete');
//   compltbtn.tabIndex = index;
//   compltbtn.innerHTML = `<i class="fa fa-check fa-3x" tabindex =${index} aria-hidden="true"></i>`;
//   compltbtn.addEventListener('click', completeTask);

//   if (taskContent.complete) {
//     compltbtn.classList.add('hide');
//     card.classList.add('complete-task');
//   }

//   buttons.append(compltbtn, editbtn, delbtn);

//   card.append(header, desc, date, buttons);
//   card.addEventListener('click', taskClick);
//   return card;
// }

// logic
// function deleteTask(event) {
//   const index = parseInt(event.target.tabIndex);
//   const tasks = getTasks();
//   tasks.splice(index, 1);
//   storeTasks(tasks);
//   clearContents();
//   renderGroups();
//   let e = new Event('click');
//   e = event;
//   e.target.tabIndex = 0;
//   showGroup(e);
// }

// logic
// function completeTask(event) {
//   const index = parseInt(event.target.tabIndex);
//   const tasks = getTasks();
//   tasks[index].complete = true;
//   storeTasks(tasks);
//   clearContents();
//   renderGroups();
//   event.target.tabIndex = 0;
//   showGroup(event);
// }

// logic
// function editTask(event) {
//   const form = document.getElementById('task-form');
//   const contents = document.getElementById('content');
//   const groupbtn = document.getElementById('group-button');
//   const taskbtn = document.getElementById('task-button');
//   const editbtn = document.getElementById('edit-button');

//   const index = parseInt(event.target.tabIndex);
//   const tasks = getTasks();

//   editbtn.classList.toggle('hide');
//   taskbtn.classList.toggle('hide');
//   groupbtn.classList.toggle('hide');
//   contents.classList.toggle('hide');
//   form.classList.toggle('hide');
//   taskFormData('set', tasks[index]);

//   fillGroupsDropdown()

//   editbtn.tabIndex = index;
// }

// logic
// function updateTask(event) {
//   const form = document.getElementById('task-form');
//   const contents = document.getElementById('content');
//   const groupbtn = document.getElementById('group-button');
//   const taskbtn = document.getElementById('task-button');
//   const index = parseInt(event.target.tabIndex);
//   const tasks = getTasks();
//   const tempTask = taskFormData('get');

//   event.target.classList.toggle('hide');
//   taskbtn.classList.toggle('hide');
//   groupbtn.classList.toggle('hide');
//   contents.classList.toggle('hide');
//   form.classList.toggle('hide');

//   taskFormData('clear');
//   tasks[index] = tempTask;
//   storeTasks(tasks);
//   clearContents();
//   renderGroups();
// }

// ################# GROUP RELATED #####################

// render
// function createGroup(event) {
//   const form = document.getElementById('group-form');
//   const contents = document.getElementById('content');
//   const taskbtn = document.getElementById('task-button');
//   const state = event.target.getAttribute('data-state');
//   const groupName = document.getElementById('group-name');
//   const groups = getGroups();

//   if (state === '1') {
//     event.target.setAttribute('data-state', '0');
//     groups.push(groupName.value);
//     storeGroups(groups);
//     clearContents();
//     renderGroups();
//   } else {
//     event.target.setAttribute('data-state', '1');
//   }
//   form.classList.toggle('hide');
//   contents.classList.toggle('hide');
//   event.target.classList.toggle('full-view');
//   taskbtn.classList.toggle('hide');
// }

// render
// function showGroup(event) {
//   const index = event.target.getAttribute('tabIndex');
//   const tasksContainer = document.getElementById(`tasks${index}`);
//   tasksContainer.classList.toggle('hide');
// }

// render
// function getGroupTasks(group, index) {
//   const tasksContainer = document.createElement('div');
//   const tasks = getTasks();
//   tasksContainer.setAttribute('id', `tasks${index}`);
//   tasksContainer.classList.add('hide');
//   tasksContainer.classList.add('tasks');
//   const groupTasks = tasks.filter(task => task.group === group);
//   const taskCards = [];
//   if (groupTasks.length === 0) {
//     const tempCard = document.createElement('h2');
//     tempCard.innerText = 'No Tasks Assigned';
//     tempCard.setAttribute('class', 'empty');
//     taskCards.push(tempCard);
//   } else {
//     for (let i = 0; i < groupTasks.length; i += 1) {
//       const tempTask = renderTaskItem(groupTasks[i]);
//       taskCards.push(tempTask);
//     }
//   }
//   tasksContainer.append(...taskCards);
//   return tasksContainer;
// }

// render
// function createGroupTab(group, index) {
//   const contents = document.getElementById('content');
//   const btn = document.createElement('button');
//   btn.classList.add('groups');
//   btn.setAttribute('id', group + index);
//   btn.tabIndex = index;
//   btn.innerHTML = `<i class="fa fa-chevron-down fa-1x" aria-hidden="true"></i>   ${group}`;
//   btn.addEventListener('click', showGroup);
//   contents.append(btn);
//   const groupTasks = getGroupTasks(group, index);
//   contents.appendChild(groupTasks);
// }

// render
// function renderGroups() {
//   const groupsTabs = [];
//   const groups = getGroups();

//   for (let i = 0; i < groups.length; i += 1) {
//     groupsTabs.push(createGroupTab(groups[i], i));
//   }
// }

// render
// function fillGroupsDropdown() {
//   const dropdown = document.getElementById('task-group');
//   const options = [];
//   const groups = getGroups();

//   while (dropdown.firstChild) {
//     dropdown.removeChild(dropdown.firstChild);
//   }

//   for (let i = 0; i < groups.length; i += 1) {
//     const item = document.createElement('option');
//     item.innerText = groups[i];
//     item.value = groups[i];
//     options.push(item);
//   }
//   dropdown.selectedIndex = '0';
//   dropdown.append(...options);
// }

import {
  createTask,
  createGroup,
  fillGroupsDropdown,
  renderGroups,
  updateTask,
} from './rendering';

const btn1 = document.getElementById('task-button');
btn1.addEventListener('click', createTask);

const btn2 = document.getElementById('group-button');
btn2.addEventListener('click', createGroup);

const btn3 = document.getElementById('edit-button');
btn3.addEventListener('click', updateTask);

fillGroupsDropdown();
renderGroups();
