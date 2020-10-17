export default class Task {
  constructor(title, desc, date, priority) {
    this.title = title;
    this.description = desc;
    this.date = date;
    this.priority = priority;
  }

  setProject(project) {
    this.project = project;
  }
}
