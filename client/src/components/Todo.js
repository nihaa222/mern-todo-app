import React from "react";

const Todo = ({ todo, onDelete, onToggle }) => {
  const handleToggle = () => {
    onToggle(todo._id);
  };

  const handleDelete = () => {
    onDelete(todo._id);
  };

  return (
    <div style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
      {todo.task}
      <button onClick={handleToggle}>
        {todo.completed ? "Undo" : "Complete"}
      </button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Todo;
