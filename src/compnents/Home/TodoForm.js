// we need useState and useEffect hooks
import React, { useState, useEffect } from "react";

// icons from react icons kit
// main Icon component
import { Icon } from "react-icons-kit";
import { edit2 } from "react-icons-kit/feather/edit2";
import { trash } from "react-icons-kit/feather/trash";

// getting todos from local storage
const getTodosFromLS = () => {
  const data = localStorage.getItem("Todos");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

export const TodoForm = () => {
  // todo value state
  const [todoValue, setTodoValue] = useState("");

  // todos array of objects
  const [todos, setTodos] = useState(getTodosFromLS());
  // console.log(todos);

  // form submit event
  const handleSubmit = (e) => {
    e.preventDefault();

    // creating a unique ID for every todo
    const date = new Date();
    const time = date.getTime();
    // end of creating a ID

    // creating a todo object
    let todoObject = {
      ID: time,
      TodoValue: todoValue,
      completed: false,
    };
    // end of creating a todo object
    setTodos([...todos, todoObject]);
    setTodoValue("");
  };

  // saving data to local storage
  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(todos));
  }, [todos]);

  // delete todo
  const handleDelete = (id) => {
    // console.log(id);
    const filtered = todos.filter((todo) => {
      return todo.ID !== id;
    });
    setTodos(filtered);
  };

  // edit form
  const [editForm, setEditForm] = useState(false);

  // id state
  const [id, setId] = useState();

  // edit todo
  const handleEdit = (todo, index) => {
    setEditForm(true);
    setTodoValue(todo.TodoValue);
    setId(index);
  };

  // edit todo submit
  const handleEditSubmit = (e) => {
    e.preventDefault();
    // copying todos state in items variable
    let items = [...todos];
    // storing the element at a particular index in item variable
    let item = items[id];
    // manipulating the item (object) keys
    item.TodoValue = todoValue;
    item.completed = false;
    // after manipulating item, saving it at the same index in items
    items[id] = item;
    // updating todos with items
    setTodos(items);
    setEditForm(false);
    setTodoValue("");
  };

  // handle checkbox
  const handleCheckbox = (id) => {
    let todoArray = [];
    todos.forEach((todo) => {
      if (todo.ID === id) {
        if (todo.completed === false) {
          todo.completed = true;
        } else if (todo.completed === true) {
          todo.completed = false;
        }
      }
      todoArray.push(todo);
      // console.log(todoArray);
      setTodos(todoArray);
    });
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-black"
        id="navbarId"
        style={{ color: "white" }}
      >
        ToDo List
      </nav>
      <h5>ToDo List </h5>
      {/* form component */}
      {editForm === false && (
        <div className="form">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="New Task"
                required
                onChange={(e) => setTodoValue(e.target.value)}
                value={todoValue}
                style={{ width: "80%" }}
              />
              &nbsp;
              <button
                type="submit"
                style={{ paddingRight: "5%" }}
                className="btn btn-primary"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      )}
      {/* end of form component */}

      {/* edit form component */}
      {editForm === true && (
        <div className="form">
          <form autoComplete="off" onSubmit={handleEditSubmit}>
            <div className="input-and-button">
              <input
                type="text"
                placeholder="Edit your Item"
                style={{ width: "100%" }}
                required
                onChange={(e) => setTodoValue(e.target.value)}
                value={todoValue}
              />
              &nbsp;&nbsp;
              <div className="button edit">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                >
                  UPDATE
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      {/* end of edit form component */}

      {/* start of rendering todos depending on
          if we have length of todos greater than 0 */}
      {todos.length > 0 && (
        <>
          {todos.map((individualTodo, index) => (
            <div className="todo" key={individualTodo.ID}>
              <div>
                {/* we dont need to show checkbox when edit
                      button is clicked */}
                {editForm === false && (
                  <input
                    type="checkbox"
                    checked={individualTodo.completed}
                    onChange={() => handleCheckbox(individualTodo.ID)}
                  />
                )}
                <span
                  style={
                    individualTodo.completed === true
                      ? { textDecoration: "line-through" }
                      : { textDecoration: "none" }
                  }
                >
                  {individualTodo.TodoValue}
                </span>
              </div>

              {/* we dont need to show edit and delete icons when edit
                  button is clicked */}
              {editForm === false && (
                <div className="edit-and-delete">
                  <div
                    style={{ marginRight: 7 + "px" }}
                    onClick={() => handleEdit(individualTodo, index)}
                  >
                    <Icon icon={edit2} size={18} className="btn btn-primary" />
                  </div>
                  <div onClick={() => handleDelete(individualTodo.ID)}>
                    <Icon className="btn btn-danger" icon={trash} size={18} />
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* delete all todos */}
          {editForm === false && (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button className="btn btn-danger" onClick={() => setTodos([])}>
                Delete All Items
              </button>
            </div>
          )}
        </>
      )}
      {/* end of rendering todos depending on
          if we have length of todos greater than 0 */}
    </>
  );
};
