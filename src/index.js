import {
  button,
  div,
  h1,
  header,
  input,
  ul,
  li,
  form,
  button,
  a
} from "./utils/elements";
import store from "./store/store";
import swapNodes from "./utils/swapNodes";

const route = {
  "/": () => {
    window.history.pushState({}, "", "/");
    swapNodes(document.querySelector(".dom").children["0"], App());
  },
  "/about": () => {
    window.history.pushState({}, "", "about");
    swapNodes(document.querySelector(".dom").children["0"], About());
  }
};

const About = () =>
  h1(
    "About",
    a(
      {
        href: "#",
        onclick: e => {
          e.preventDefault();
          route["/"]();
        }
      },
      "back"
    )
  );

let id = store.state.todos.length;
const Input = () =>
  input({
    type: "text",
    value: store.state.formValue,
    placeholder: "new todo",
    name: "todo",
    onchange: e => {
      store.state.formValue = e.target.value;
      e.target.value = "";
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
export const App = props => {
  return div(
    { id: `app` },
    h1("Todos"),
    Todos(store.state),
    form(
      {
        onsubmit: e => {
          e.preventDefault();
          store.addTodo({
            id: id++,
            text: store.state.formValue
          });
          store.state.formValue = "";
        }
      },
      Input(),
      button({ type: "submit" }, "add todo"),
      div(
        a(
          {
            onclick: e => {
              e.preventDefault();
              linkTo("SHOW_ALL");
            }
          },
          "SHOW_ALL"
        ),
        a(
          {
            onclick: e => {
              e.preventDefault();
              linkTo("SHOW_ACTIVE");
            }
          },
          "SHOW_ACTIVE"
        ),
        a(
          {
            onclick: e => {
              e.preventDefault();
              route["/about"]();
            }
          },
          "About"
        )
      )
    )
  );
};
function linkTo(state) {
  swapNodes;
}

document.querySelector(".dom").appendChild(App());
