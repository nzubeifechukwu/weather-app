import { home } from "./home";
import "./styles.css";
import { allTodos, getTodos } from "./todos";

// persist data in case localStorage has some todos
getTodos();

// Initial render
home(allTodos);
