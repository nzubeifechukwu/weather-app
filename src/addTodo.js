import { home } from "./home";
import {
  Todo,
  allTodos,
  personalTodos,
  workTodos,
  otherTodos,
  urgentTodos,
  storeTodos,
} from "./todos";

export function addNewTodo() {
  const body = document.querySelector("body");
  body.innerHTML = `<h1 id="add-new-todo">Add New Todo</h1>
    <form action="">
      <fieldset id="todo-main-info">
        <div><label for="title">Title</label
        ><input type="text" name="title" id="title" /></div>
        <div><label for="description" id="description-label">Description</label
        ><textarea name="description" id="description"></textarea></div>
        <div><label for="due-date">Due Date</label
        ><input type="date" name="due-date" id="due-date" /></div>
      </fieldset>
      <fieldset class="radio-fieldset">
        <p>Priority</p>
        <div>
          <input type="radio" name="priority" id="urgent" value="Urgent" /><label
            for="urgent"
          >Urgent</label>
        </div>
        <div>
          <input type="radio" name="priority" id="not-urgent" value="Not Urgent" checked /><label
            for="not-urgent"
          >Not Urgent</label>
        </div>
      </fieldset>
      <fieldset class="radio-fieldset">
        <p>Type</p>
        <div>
          <input type="radio" name="type" id="personal" value="Personal" /><label
            for="personal"
          >Personal</label>
        </div>
        <div>
          <input type="radio" name="type" id="work" value="Work" /><label
            for="work"
          >Work</label>
        </div>
        <div>
          <input type="radio" name="type" id="other" value="Other" checked /><label
            for="other"
          >Other</label>
        </div>
      </fieldset>
      <fieldset><button type="button" id="submit">Submit</button></fieldset>
    </form>`;

  const titleInput = document.querySelector("#title");
  const descriptionTextarea = document.querySelector("#description");
  const dueDateInput = document.querySelector("#due-date");
  const urgentRadio = document.querySelector("#urgent");
  const notUrgentRadio = document.querySelector("#not-urgent");
  const personalRadio = document.querySelector("#personal");
  const workRadio = document.querySelector("#work");
  const otherRadio = document.querySelector("#other");
  const submitButton = document.querySelector("#submit");

  let title, description, dueDate;

  // Get values of default-checked radio buttons
  let priority = document.querySelector('input[name="priority"]:checked').value;
  let type = document.querySelector('input[name="type"]:checked').value;

  titleInput.addEventListener(
    "change",
    () => (title = titleInput.value.trim())
  );

  descriptionTextarea.addEventListener(
    "change",
    () => (description = descriptionTextarea.value.trim())
  );

  dueDateInput.addEventListener("input", () => (dueDate = dueDateInput.value));

  urgentRadio.addEventListener("change", () => (priority = urgentRadio.value));

  notUrgentRadio.addEventListener(
    "change",
    () => (priority = notUrgentRadio.value)
  );

  personalRadio.addEventListener("change", () => (type = personalRadio.value));

  workRadio.addEventListener("change", () => (type = workRadio.value));

  otherRadio.addEventListener("change", () => (type = otherRadio.value));

  submitButton.addEventListener("click", () => {
    if (!title) {
      alert("Please input todo title");
    } else {
      if (!description) description = "nil";
      if (!dueDate || new Date(dueDate) < new Date()) {
        // set to tomorrow's date if dueDate is undefined or earlier than today's date
        dueDate = new Date(
          new Date().setDate(new Date().getDate() + 1)
        ).toDateString();
      }
      const newTodo = new Todo(title, description, dueDate, priority, type);
      allTodos.push(newTodo);

      if (type === "Personal") {
        personalTodos.push(newTodo);
      } else if (type === "Work") {
        workTodos.push(newTodo);
      } else {
        otherTodos.push(newTodo);
      }

      if (priority === "Urgent") urgentTodos.push(newTodo);

      storeTodos();
      home(allTodos);
    }
  });
}
