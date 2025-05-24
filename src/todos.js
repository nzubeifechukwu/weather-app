export class Todo {
  constructor(title, description, dueDate, priority, type) {
    this.id = self.crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = new Date(dueDate).toDateString();
    this.priority = priority;
    this.type = type; // Use to group todo into project type of 'personal', 'work' or 'other'
  }
}

export let allTodos = [];
export let personalTodos = [];
export let workTodos = [];
export let otherTodos = [];
export let urgentTodos = [];

export function storeTodos() {
  localStorage.setItem("all", JSON.stringify(allTodos));
  localStorage.setItem("urgent", JSON.stringify(urgentTodos));
  localStorage.setItem("personal", JSON.stringify(personalTodos));
  localStorage.setItem("work", JSON.stringify(workTodos));
  localStorage.setItem("other", JSON.stringify(otherTodos));
}

export function getTodos() {
  if (localStorage.getItem("all")) {
    allTodos = JSON.parse(localStorage.getItem("all"));
    urgentTodos = JSON.parse(localStorage.getItem("urgent"));
    personalTodos = JSON.parse(localStorage.getItem("personal"));
    workTodos = JSON.parse(localStorage.getItem("work"));
    otherTodos = JSON.parse(localStorage.getItem("other"));
  }
}
