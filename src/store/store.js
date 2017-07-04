export default {
  state: {
    todos: [],
    formValue: ""
  },
  listeners: {},
  addTodo(todo) {
    this.state.todos.push(todo);
    this.triggerListener("TODO_LISTS_UPDATE");
  },
  removeTodo(todo) {
    this.state.todos = this.state.todos.filter(t => t.id != todo.id);
    this.triggerListener("TODO_LISTS_UPDATE");
  },
  triggerListener(id, payload) {
    const callbacks = this.listeners[id];

    if (callbacks && callbacks.length) {
      callbacks.forEach(callback => callback(payload));
    }
  },
  subscribe(id, callback) {
    if (!callback || typeof callback !== `function`) {
      console.warn(
        `You must pass a function as the second argument to store.subsribe()`
      );
    }

    this.listeners[id] = this.listeners[id] || [];
    this.listeners[id].push(callback);
  }
};
