import React from "react";
import "./Todo.css";
import { useState, useRef, useEffect } from "react";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdDoneAll } from "react-icons/io";

function Todo() {
  // useState obj
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]); // Values are stored in this array
  const [editId, setEditID] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addTodo = () => {
    if (todo !== "") {
      // Check if the todo already exists in the array
      const isDuplicate = todos.some((item) => item.list === todo);

      if (isDuplicate) {
        // Handle duplicate case, e.g., show an error message or perform other actions
        console.log("Duplicate todo detected!");
      } else {
        // Add the todo to the array
        setTodos([
          ...todos,
          {
            list: todo,
            id: Date.now(),
            status: false,
          },
        ]);
      }
      setTodo("");
      setEditID(0);
    }
    if (editId) {
      const editTodo = todos.find((todo) => todo.id === editId);
      const updateTodo = todos.map((to) =>
        to.id === editTodo.id
          ? (to = { id: to.id, list: todo })
          : (to = { id: to.id, list: to.list })
      );
      setTodos(updateTodo);
      setEditID(0);
      setTodo("");
    }
  };

  const inputRef = useRef("null");

  // Focus on the Input Field
  useEffect(() => {
    inputRef.current.focus();
  });

  // Delete fuction
  const onDelete = (id) => {
    setTodos(todos.filter((to) => to.id !== id));
  };

  // Complete function
  const onComplete = (id) => {
    let complete = todos.map((list) => {
      if (list.id === id) {
        return { ...list, status: !list.status };
      }
      return list;
    });
    setTodos(complete);
  };

  // Edit function
  const onEdit = (id) => {
    const editTodo = todos.find((to) => to.id === id);
    setTodo(editTodo.list);
    setEditID(editTodo.id);
  };

  return (
    <div className="container">
      <h2>TODO APP</h2>

      <form action="" className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          ref={inputRef}
          placeholder="Enter your Todo"
          className="form-control"
          onChange={(event) => setTodo(event.target.value)}
        />
        <button onClick={addTodo}>{editId ? "EDIT" : "ADD"}</button>
      </form>

      <div className="list">
        <ul>
          {todos.map((to) => (
            <li className="list-items">
              <div className="list-item-list" id={to.status ? "list-item" : ""}>
                {to.list}
              </div>
              <span>
                <IoMdDoneAll
                  className="list-item-icon"
                  id="complete"
                  title="Complete"
                  onClick={() => onComplete(to.id)}
                />
                <BiEditAlt
                  className="list-item-icon"
                  id="edit"
                  title="Edit"
                  onClick={() => onEdit(to.id)}
                />
                <RiDeleteBin6Line
                  className="list-item-icon"
                  id="delete"
                  title="Delete"
                  onClick={() => onDelete(to.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
