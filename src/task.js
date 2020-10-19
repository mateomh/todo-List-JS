export default class Task {
  constructor(title, desc, date, priority, group) {
    this.title = title;
    this.desc = desc;
    this.date = date;
    this.priority = priority;
    this.group = group;
    this.complete = false;
  }

  getTitle() {
    return this.title;
  }

  getDesc() {
    return this.desc;
  }

  getDate() {
    return this.date;
  }

  getPriority() {
    return this.priority;
  }

  getComplete() {
    return this.complete;
  }

  getGroup() {
    return this.group;
  }

  setTitle(title) {
    this.title = title;
  }

  setDesc(desc) {
    this.desc = desc;
  }

  setDate(date) {
    this.date = date;
  }

  setPriority(priority) {
    this.priority = priority;
  }

  setComplete(status) {
    this.complete = status;
  }

  setGroup(group) {
    this.group = group;
  }
}
