import { addNewTodo } from "./addTodo";
import { renderTodos, renderTodosByType } from "./renderTodos";

export function home(todos) {
  const body = document.querySelector("body");
  body.innerHTML = `
    <header>
      <h1>Todo List</h1>
      <nav>
        <button type="button" id="personal-btn">Personal</button>
        <button type="button" id="work-btn">Work</button>
        <button type="button" id="other-btn">Other</button>
        <button type="button" id="urgent-btn">Urgent</button>
        <button type="button" id="all-btn">All</button>
      </nav>
    </header>
    <main>
      <section id="todos">
      </section>
      <div>
        <button type="button" id="add-todo-btn">Add Todo</button>
      </div>
    </main>
    <footer>
      <small>
        <a href="https://github.com/nzubeifechukwu/todo-list" target="_blank">&copy; Nzube Ifechukwu</a>
      </small>
    </footer>
  `;

  const todosSection = document.querySelector("#todos");

  renderTodos(todos, todosSection);

  const addTodoButton = document.querySelector("#add-todo-btn");
  addTodoButton.onclick = addNewTodo;

  renderTodosByType(todosSection);
}
