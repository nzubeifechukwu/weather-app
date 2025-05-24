import { editTodo } from "./editTodo";
import { home } from "./home";
import {
  allTodos,
  personalTodos,
  workTodos,
  otherTodos,
  urgentTodos,
  storeTodos,
} from "./todos";

export function renderTodos(todos, section, todosType = "") {
  if (todos.length) {
    section.innerHTML = "";
    todos.forEach((todo) => {
      const todoArticle = document.createElement("article");
      todoArticle.innerHTML = `
      <h2>${todo.title}</h2>
      <p><strong>Description: </strong>${
        todo.description ? todo.description : ""
      }</p>
      <p><strong>Due Date: </strong>${todo.dueDate}</p>
      <p><strong>Priority: </strong>${todo.priority}</p>
      <p><strong>Type: </strong>${todo.type}</p>
    `;

      const removeButton = document.createElement("button");
      removeButton.id = "remove-btn";
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => {
        if (todo.priority === "Urgent") {
          const index = urgentTodos.indexOf(todo);
          urgentTodos.splice(index, 1);
        }

        if (todo.type === "Personal") {
          const index = personalTodos.indexOf(todo);
          personalTodos.splice(index, 1);
        } else if (todo.type === "Work") {
          const index = workTodos.indexOf(todo);
          workTodos.splice(index, 1);
        } else {
          const index = otherTodos.indexOf(todo);
          otherTodos.splice(index, 1);
        }

        const index = allTodos.indexOf(todo);
        allTodos.splice(index, 1);

        storeTodos();
        home(todos);
      });

      const editButton = document.createElement("button");
      editButton.id = "edit-btn";
      editButton.textContent = "Edit";
      editButton.addEventListener("click", () => {
        editTodo(todo.id, todos);
      });

      todoArticle.appendChild(removeButton);
      todoArticle.appendChild(editButton);
      section.appendChild(todoArticle);
    });
  } else {
    section.innerHTML = `<h2>You have no ${todosType} todos</h2>`;
  }
}

export function renderTodosByType(section) {
  const personalButton = document.querySelector("#personal-btn");
  const workButton = document.querySelector("#work-btn");
  const otherButton = document.querySelector("#other-btn");
  const allButton = document.querySelector("#all-btn");
  const urgentButton = document.querySelector("#urgent-btn");
  section = document.querySelector("#todos");

  allButton.addEventListener("click", () => {
    personalButton.style.backgroundColor = "#284b63";
    allButton.style.backgroundColor = "#0081a7";
    workButton.style.backgroundColor = "#284b63";
    urgentButton.style.backgroundColor = "#284b63";
    otherButton.style.backgroundColor = "#284b63";

    renderTodos(allTodos, section);
  });

  personalButton.addEventListener("click", () => {
    allButton.style.backgroundColor = "#284b63";
    personalButton.style.backgroundColor = "#0081a7";
    workButton.style.backgroundColor = "#284b63";
    urgentButton.style.backgroundColor = "#284b63";
    otherButton.style.backgroundColor = "#284b63";

    renderTodos(personalTodos, section, "personal");
  });

  workButton.addEventListener("click", () => {
    personalButton.style.backgroundColor = "#284b63";
    workButton.style.backgroundColor = "#0081a7";
    allButton.style.backgroundColor = "#284b63";
    urgentButton.style.backgroundColor = "#284b63";
    otherButton.style.backgroundColor = "#284b63";

    renderTodos(workTodos, section, "work");
  });

  otherButton.addEventListener("click", () => {
    personalButton.style.backgroundColor = "#284b63";
    otherButton.style.backgroundColor = "#0081a7";
    workButton.style.backgroundColor = "#284b63";
    urgentButton.style.backgroundColor = "#284b63";
    allButton.style.backgroundColor = "#284b63";

    renderTodos(otherTodos, section, "other");
  });

  urgentButton.addEventListener("click", () => {
    personalButton.style.backgroundColor = "#284b63";
    urgentButton.style.backgroundColor = "#0081a7";
    workButton.style.backgroundColor = "#284b63";
    allButton.style.backgroundColor = "#284b63";
    otherButton.style.backgroundColor = "#284b63";

    renderTodos(urgentTodos, section, "urgent");
  });
}
