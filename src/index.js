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
