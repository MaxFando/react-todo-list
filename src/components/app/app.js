import React, { useState, useReducer } from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list/";
import ItemStatusFilter from "../item-status-filter/item-status-filter";
import ItemAddForm from "../item-add-form";

import "./app.css";

const createTodoItem = (label, maxId) => {
  return {
    label,
    important: false,
    done: false,
    id: maxId++
  };
};

const toggleProperty = (arr, id, propName) => {
  const idx = arr.findIndex(el => el.id === id);

  const oldItem = arr[idx];
  const newItem = { ...oldItem, [propName]: !oldItem[propName] };

  return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
};

const maxId = 0;
const initialTodos = [
  createTodoItem("Drink Coffee", maxId),
  createTodoItem("Make Awesome App", maxId),
  createTodoItem("Have a lunch", maxId)
];

const todoReducer = (state, action) => {
  switch (action.type) {
    case "delete":
      const idx = state.findIndex(el => el.id === action.id);
      const newArray = [...state.slice(0, idx), ...state.slice(idx + 1)];

      return (state = newArray);

    case "add":
      const newItem = createTodoItem(action.text, maxId);
      const newData = [...state, newItem];

      return (state = newData);
    case "toggle_done":
      return (state = toggleProperty(state, action.id, "done"));

    case "toggle_important":
      return (state = toggleProperty(state, action.id, "important"));
  }
};

const App = () => {
  const [term, setTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [todoData, dispatch] = useReducer(todoReducer, initialTodos);

  const deleteItem = id => {
    dispatch({ type: "delete", id });
  };

  const addItem = text => {
    dispatch({ type: "add", text });
  };

  const onToggleDone = id => {
    dispatch({ type: "toggle_done", id });
  };

  const onToggleImportant = id => {
    dispatch({ type: "imported", id });
  };

  const onSearchChange = term => {
    setTerm(term);
  };

  const onFilterChange = filter => {
    setFilter(filter);
  };

  const search = (items, term) => {
    if (term === "") {
      return items;
    }

    return items.filter(
      item => item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
    );
  };

  const filterTodos = (items, filter) => {
    switch (filter) {
      case "all":
        return items;
      case "active":
        return items.filter(item => !item.done);
      case "done":
        return items.filter(item => item.done);
      default:
        return items;
    }
  };

  const visibleItems = filterTodos(search(todoData, term), filter);
  const doneCount = todoData.filter(el => el.done).length;
  const todoCount = todoData.length - doneCount;

  return (
    <div className="todo-app">
      <AppHeader toDo={todoCount} done={doneCount} />
      <div className="top-panel d-flex">
        <SearchPanel onSearchChange={onSearchChange} />
        <ItemStatusFilter
          filter={filterTodos}
          onFilterChange={onFilterChange}
        />
      </div>

      <TodoList
        todos={visibleItems}
        onDeleted={deleteItem}
        onToggleDone={onToggleDone}
        onToggleImportant={onToggleImportant}
      />
      <ItemAddForm onItemAdded={addItem} />
    </div>
  );
};

export default App;
