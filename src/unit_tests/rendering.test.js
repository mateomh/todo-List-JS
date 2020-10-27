import * as Render from '../rendering';

document.body.innerHTML = `
  <div id="top-nav">
    <button id="task-button" data-state="0">Create task</button>
    <button id="group-button">Create Group</button>
    <button id="edit-button" class="full-view hide">Save Changes</button>
  </div>
  <div id="task-form" class="form hide">
    <h2 id="alert" class="hide">All fields must be filled</h2>
    <label class="task-label" for="task-title">Task</label>
    <input class="task-input" type="text" name="task-title" id="task-title">
    <label class="task-label" for="task-desc">Description</label>
    <textarea class="task-input task-area" name="task-desc" id="task-desc" cols="30" rows="3"></textarea>
    <label class="task-label" for="task-date">Due Date</label>
    <input class="task-input" type="date" name="task-date" id="task-date">
    <label class="task-label" for="task-priority">High Priority?</label>
    <input class="task-input" type="checkbox" name="task-priority" id="task-priority">
    <label class="task-label" for="task-group">Group</label>
    <select class="group-select" id="task-group" name="task-group"></select>

  </div>
  <div id="group-form" class="form hide">
    <label class="task-label" for="group-name">Group Name</label>
    <input class="task-input" type="text" name="group-name" id="group-name">
  </div>
  <div id="content">

  </div>
`;

const editBtn = document.getElementById('edit-button');
editBtn.addEventListener('click', Render.updateTask);

const taskBtn = document.getElementById('task-button');
taskBtn.addEventListener('click', Render.createTask);

const groupBtn = document.getElementById('group-button');
groupBtn.addEventListener('click', Render.createGroup);


test('1. Rendering of the groups', () => {
  Render.renderGroups();

  const groupTab = document.getElementById('General0');

  expect(groupTab.innerHTML).toContain('General');
});

test('2. Filling the group dropdown menu', () => {
  Render.fillGroupsDropdown();

  const menu = document.getElementById('task-group');

  expect(menu.innerHTML).toContain('General');
});

test('3. Update task event with all fields with data', () => {
  const taskTitle = document.getElementById('task-title');
  const taskDesc = document.getElementById('task-desc');
  const taskDate = document.getElementById('task-date');

  taskTitle.value = 'hola';
  taskDesc.value = 'como estas';
  taskDate.value = '2010-10-10';

  const appStorage = window.localStorage;
  appStorage.clear();

  editBtn.click();

  const allTasks = JSON.parse(appStorage.getItem('tasks'));
  const { title, desc, date } = allTasks[0];
  expect(title).toBe('hola');
  expect(desc).toBe('como estas');
  expect(date).toBe('2010-10-10');
});

test('4. Update task event with fields without data', () => {
  const taskTitle = document.getElementById('task-title');
  const taskDesc = document.getElementById('task-desc');
  const taskDate = document.getElementById('task-date');

  taskTitle.value = 'hola';
  taskDesc.value = 'como estas';
  taskDate.value = '';

  const appStorage = window.localStorage;
  appStorage.clear();

  editBtn.click();

  const allTasks = JSON.parse(appStorage.getItem('tasks'));

  expect(allTasks).toBeNull();
});

test('5. Create task with fields without data', () => {
  const taskTitle = document.getElementById('task-title');
  const taskDesc = document.getElementById('task-desc');
  const taskDate = document.getElementById('task-date');

  taskTitle.value = 'hola';
  taskDesc.value = 'como estas';
  taskDate.value = '';

  const appStorage = window.localStorage;
  appStorage.clear();

  taskBtn.setAttribute('data-state', '1');
  taskBtn.click();

  const allTasks = JSON.parse(appStorage.getItem('tasks'));

  expect(allTasks).toBeNull();
});

test('6. Create task event with all fields with data', () => {
  const taskTitle = document.getElementById('task-title');
  const taskDesc = document.getElementById('task-desc');
  const taskDate = document.getElementById('task-date');

  taskTitle.value = 'hola';
  taskDesc.value = 'como estas';
  taskDate.value = '2010-10-10';

  const appStorage = window.localStorage;
  appStorage.clear();

  taskBtn.setAttribute('data-state', '1');
  taskBtn.click();

  const allTasks = JSON.parse(appStorage.getItem('tasks'));
  const { title, desc, date } = allTasks[0];
  expect(title).toBe('hola');
  expect(desc).toBe('como estas');
  expect(date).toBe('2010-10-10');
});

test('7. Create group event with the group name blank', () => {
  const groupName = document.getElementById('group-name');

  groupName.value = '';

  const appStorage = window.localStorage;
  appStorage.clear();

  groupBtn.setAttribute('data-state', '1');
  groupBtn.click();

  const allGroups = JSON.parse(appStorage.getItem('groups'));

  expect(allGroups).toBeNull();
});

test('8. Create group event with the group name filled', () => {
  const groupName = document.getElementById('group-name');

  groupName.value = 'Mi gente';

  const appStorage = window.localStorage;
  appStorage.clear();

  groupBtn.setAttribute('data-state', '1');
  groupBtn.click();

  const allGroups = JSON.parse(appStorage.getItem('groups'));

  expect(allGroups[1]).toBe('Mi gente');
});
