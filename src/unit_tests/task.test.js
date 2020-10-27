import Task from '../task';

const testTask = new Task();

test('1. Create an empty task', () => {
  expect(testTask).toBeDefined();
  expect(testTask.title).toBeUndefined();
  expect(testTask.desc).toBeUndefined();
  expect(testTask.date).toBeUndefined();
  expect(testTask.priority).toBeUndefined();
  expect(testTask.group).toBeUndefined();
  expect(testTask.complete).toBeFalsy();
});

test('2. Testing the setter methods', () => {
  testTask.setTitle('Hola');
  testTask.setDesc('Como');
  testTask.setGroup('estas');
  testTask.setDate('10/10/10');
  testTask.setPriority(true);
  testTask.setComplete(true);
  expect(testTask.title).toBe('Hola');
  expect(testTask.desc).toBe('Como');
  expect(testTask.group).toBe('estas');
  expect(testTask.date).toBe('10/10/10');
  expect(testTask.priority).toBeTruthy();
  expect(testTask.complete).toBeTruthy();
});

test('3. Testing the getter methods', () => {
  expect(testTask.getTitle()).toBe('Hola');
  expect(testTask.getDesc()).toBe('Como');
  expect(testTask.getGroup()).toBe('estas');
  expect(testTask.getDate()).toBe('10/10/10');
  expect(testTask.getPriority()).toBeTruthy();
  expect(testTask.getComplete()).toBeTruthy();
});
