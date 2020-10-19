/* eslint-disable max-len */
import Task from './task';

export function storeTasks(tasks) {
  const appStorage = window.localStorage;
  appStorage.removeItem('tasks');
  appStorage.setItem('tasks', JSON.stringify(tasks));
}

export function getTasks() {
  const appStorage = window.localStorage;
  // appStorage.clear();
  let allTasks = JSON.parse(appStorage.getItem('tasks'));
  if (!allTasks) {
    allTasks = [];
  }
  return allTasks;
}

export function storeGroups(groups) {
  const appStorage = window.localStorage;
  appStorage.removeItem('groups');
  appStorage.setItem('groups', JSON.stringify(groups));
}

export function getGroups() {
  const appStorage = window.localStorage;
  let allGroups = JSON.parse(appStorage.getItem('groups'));
  if (allGroups === null) {
    allGroups = ['General'];
  }
  return allGroups;
}

export function taskFormData(action, editData = null) {
  const taskTitle = document.getElementById('task-title');
  const taskDesc = document.getElementById('task-desc');
  const taskDate = document.getElementById('task-date');
  const taskPriority = document.getElementById('task-priority');
  const taskGroup = document.getElementById('task-group');
  let data;
  switch (action) {
    case 'get':
      data = new Task(taskTitle.value, taskDesc.value, taskDate.value, taskPriority.checked, taskGroup.value);
      break;
    case 'clear':
      taskTitle.value = '';
      taskDesc.value = '';
      taskDate.value = '';
      taskPriority.checked = false;
      break;
    case 'set':
      taskTitle.value = editData.title;
      taskDesc.value = editData.desc;
      taskDate.value = editData.date;
      taskPriority.checked = editData.priority;
      taskGroup.value = editData.group;
      break;
    default:
      break;
  }
  return data;
}
