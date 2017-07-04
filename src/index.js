import {
  button,
  div,
  h1,
  header,
  input,
  ul,
  li,
  form,
  button
} from "./utils/elements";
import store from "./store/store";
import swapNodes from "./utils/swapNodes";

let id = store.state.todos.length;
const Input = () =>
  input({
    type: "text",
    value: store.state.formValue,
    placeholder: "new todo",
    name: "todo",
    onchange: e => {
      store.state.formValue = e.target.value;
    }
  });

const Todos = props => {
  let el;
  const render = () => {
    const liTodos = props.todos.map(todo =>
      li(todo.text, button({ onclick: () => store.removeTodo(todo) }, "x"))
    );
    return ul(liTodos);
  };
  el = render();
  store.subscribe("TODO_LISTS_UPDATE", () => {
    el = swapNodes(el, render());
  });
  return el;
};
const App = props => {
  return div(
    { id: `app` },
    h1("Todos"),
    form(
      {
        onsubmit: e => {
          e.preventDefault();
          debugger;
          store.addTodo({
            id: id++,
            text: store.state.formValue
          });
          store.state.formValue = "";
        }
      },
      Input(),
      button({ type: "submit" }, "add todo")
    ),
    Todos(store.state)
  );
};

document.querySelector(".dom").appendChild(App());
