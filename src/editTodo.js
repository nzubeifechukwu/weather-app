import { home } from "./home";
import {
  allTodos,
  otherTodos,
  personalTodos,
  urgentTodos,
  workTodos,
  storeTodos,
} from "./todos";

export function editTodo(id, todos) {
  const months = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };
  const body = document.querySelector("body");
  const selectedTodo = todos.find((todo) => id === todo.id);
  console.log(selectedTodo.dueDate);
  body.innerHTML = `
    <h1 id="edit-todo">Edit Todo</h1>
    <form>
      <fieldset id="todo-main-info">
        <div>
          <label for="title">Title</label
          ><input type="text" name="title" id="title" value="${
            selectedTodo.title
          }" />
        </div>
        <div>
          <label for="description" id="description-label">Description</label
          ><textarea name="description" id="description">${
            selectedTodo.description
          }</textarea>
        </div>
        <div>
          <label for="due-date">Due Date</label
          ><input type="date" name="due-date" id="due-date" value="${selectedTodo.dueDate.slice(
            11
          )}-${
    months[selectedTodo.dueDate.slice(4, 7)]
  }-${selectedTodo.dueDate.slice(8, 10)}" />
        </div>
      </fieldset>
      <fieldset id="priority-fieldset" class="radio-fieldset">
      </fieldset>
      <fieldset id="type-fieldset" class="radio-fieldset">
      </fieldset>
      <fieldset><button type="button" id="submit">Submit</button></fieldset>
    </form>
  `;
  const priorityFieldset = document.querySelector("#priority-fieldset");
  const typeFieldset = document.querySelector("#type-fieldset");

  if (selectedTodo.priority === "Urgent") {
    priorityFieldset.innerHTML = `
      <p>Priority</p>
      <div>
        <input type="radio" name="priority" id="urgent" value="Urgent" checked /><label
          for="urgent"
        >Urgent</label>
      </div>
      <div>
        <input type="radio" name="priority" id="not-urgent" value="Not Urgent" /><label
          for="not-urgent"
        >Not Urgent</label>
      </div>
    `;
  } else {
    priorityFieldset.innerHTML = `
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
    `;
  }

  if (selectedTodo.type === "Personal") {
    typeFieldset.innerHTML = `
      <p>Type</p>
      <div>
        <input type="radio" name="type" id="personal" value="Personal" checked /><label
          for="personal"
        >Personal</label>
      </div>
      <div>
        <input type="radio" name="type" id="work" value="Work" /><label
          for="work"
        >Work</label>
      </div>
      <div>
        <input type="radio" name="type" id="other" value="Other" /><label
          for="other"
        >Other</label>
      </div>
    `;
  } else if (selectedTodo.type === "Work") {
    typeFieldset.innerHTML = `
      <p>Type</p>
      <div>
        <input type="radio" name="type" id="personal" value="Personal" /><label
          for="personal"
        >Personal</label>
      </div>
      <div>
        <input type="radio" name="type" id="work" value="Work" checked /><label
          for="work"
        >Work</label>
      </div>
      <div>
        <input type="radio" name="type" id="other" value="Other" /><label
          for="other"
        >Other</label>
      </div>
    `;
  } else {
    typeFieldset.innerHTML = `
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
    `;
  }
  const titleInput = document.querySelector("#title");
  const descriptionTextarea = document.querySelector("#description");
  const dueDateInput = document.querySelector("#due-date");
  const urgentRadio = document.querySelector("#urgent");
  const notUrgentRadio = document.querySelector("#not-urgent");
  const personalRadio = document.querySelector("#personal");
  const workRadio = document.querySelector("#work");
  const otherRadio = document.querySelector("#other");
  const submitButton = document.querySelector("#submit");

  // Retain previous values should in case they are not changed
  let title = titleInput.value;
  let description = descriptionTextarea.value;
  let dueDate = dueDateInput.value;
  let priority = document.querySelector('input[name="priority"]:checked').value; // Get value of previously checked radio button
  let type = document.querySelector('input[name="type"]:checked').value; // Get value of previously checked radio button

  // Use these to possibly remove/add todo in different todos list group(s)
  const previousPriority = priority;
  const previousType = type;

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
    // Update relevant todos list based on edited values
    if (previousPriority !== priority) {
      if (priority === "Urgent") {
        urgentTodos.push(selectedTodo);
      } else {
        const index = urgentTodos.indexOf(selectedTodo);
        urgentTodos.splice(index, 1);
      }
    }

    // Update relevant todos list based on edited values
    if (previousType !== type) {
      if (type === "Personal") {
        personalTodos.push(selectedTodo);
      } else if (type === "Work") {
        workTodos.push(selectedTodo);
      } else {
        otherTodos.push(selectedTodo);
      }

      if (previousType === "Personal") {
        const index = personalTodos.indexOf(selectedTodo);
        personalTodos.splice(index, 1);
      } else if (previousType === "Work") {
        const index = workTodos.indexOf(selectedTodo);
        workTodos.splice(index, 1);
      } else {
        const index = otherTodos.indexOf(selectedTodo);
        otherTodos.splice(index, 1);
      }
    }

    if (!title) {
      alert("Please input todo title");
    } else {
      selectedTodo.title = title;
      selectedTodo.description = description ? description : "nil";

      if (!dueDate || new Date(dueDate) < new Date()) {
        // set to tomorrow's date if dueDate is undefined or earlier than today's date
        selectedTodo.dueDate = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() + 1
        ).toDateString();
      } else {
        selectedTodo.dueDate = new Date(dueDate).toDateString();
      }

      selectedTodo.priority = priority;
      selectedTodo.type = type;

      // Replace updated todo in allTodos list
      if (previousPriority !== priority || previousType !== type) {
        const index = allTodos.indexOf(selectedTodo);
        allTodos.splice(index, 1, selectedTodo);
      }

      storeTodos();
      home(todos);
    }
  });
}
