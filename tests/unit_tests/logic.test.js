import * as Logic from '../../src/logic';
import Task from '../../src/task';

document.body.innerHTML = `
<input class="task-input" type="text" name="task-title" id="task-title">
<textarea class="task-input task-area" name="task-desc" id="task-desc" cols="30" rows="3"></textarea>
<input class="task-input" type="date" name="task-date" id="task-date">
<input class="task-input" type="checkbox" name="task-priority" id="task-priority">
<select class="group-select" id="task-group" name="task-group">
</select>
`;

test('1. Empty form validation', () => {
  expect(Logic.checkEmptyForm()).toBeTruthy();
});

test('2. Get data from the form', () => {
  expect(Logic.taskFormData('get') instanceof Task).toBeTruthy();
});

test('3. Clear data from the form', () => {
  const taskTitle = document.getElementById('task-title');
  const taskDesc = document.getElementById('task-desc');
  const taskPriority = document.getElementById('task-priority');

  taskTitle.value = 'hola';
  taskDesc.value = 'como';
  taskPriority.checked = true;

  expect(taskTitle.value).toBe('hola');
  expect(taskDesc.value).toBe('como');
  expect(taskPriority.checked).toBeTruthy();

  Logic.taskFormData('clear');

  expect(taskTitle.value).toBe('');
  expect(taskDesc.value).toBe('');
  expect(taskPriority.checked).toBeFalsy();
});

test('4. Sets the display data in the form for the edit functionality', () => {
  const taskTitle = document.getElementById('task-title');
  const taskDesc = document.getElementById('task-desc');
  const taskPriority = document.getElementById('task-priority');

  const mockData = new Task('hola', 'como estas', '', true, '');

  Logic.taskFormData('set', mockData);

  expect(taskTitle.value).toBe('hola');
  expect(taskDesc.value).toBe('como estas');
  expect(taskPriority.checked).toBeTruthy();
});

test('5. Store group data with localStorage', () => {
  const mockGroups = ['group1', 'group2'];

  Logic.storeGroups(mockGroups);

  const appStorage = window.localStorage;
  const allGroups = JSON.parse(appStorage.getItem('groups'));

  expect(allGroups[0]).toBe(mockGroups[0]);
  expect(allGroups[1]).toBe(mockGroups[1]);
});

test('6. Get group data from the persistence', () => {
  const storedGroups = Logic.getGroups();

  expect(storedGroups[0]).toBe('group1');
  expect(storedGroups[1]).toBe('group2');
});

test('7. Store tasks data with localStorage', () => {
  const task1 = new Task('hola', 'como estas', '', true, '');
  const task2 = new Task('hello', 'how are you', '', true, '');
  const mockTasks = [task1, task2];

  Logic.storeTasks(mockTasks);

  const appStorage = window.localStorage;
  const allTasks = JSON.parse(appStorage.getItem('tasks'));

  const { title: title1 } = allTasks[0];
  const { title: title2 } = allTasks[1];

  expect(title1).toBe(task1.title);
  expect(title2).toBe(task2.title);
});

test('8. Get task data from the persistence', () => {
  const storedTasks = Logic.getTasks();

  const { title: title1 } = storedTasks[0];
  const { title: title2 } = storedTasks[1];

  expect(title1).toBe('hola');
  expect(title2).toBe('hello');
});

test('9. Default group created when no data is in the persistence', () => {
  const appStorage = window.localStorage;
  appStorage.clear();

  const [defaultGroup] = Logic.getGroups();

  expect(defaultGroup).toBe('General');
});