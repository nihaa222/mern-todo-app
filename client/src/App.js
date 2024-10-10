import React, { useState, useEffect } from "react";
import axios from "axios";
import Todo from "./components/Todo";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  const fetchTodos = async () => {
    const response = await axios.get("http://localhost:5000/api/todos");
    setTodos(response.data);
  };

  const addTodo = async () => {
    if (!task) return;
    const response = await axios.post("http://localhost:5000/api/todos", {
      task,
    });
    setTodos([...todos, response.data]);
    setTask("");
  };

  const toggleTodo = async (id) => {
    const response = await axios.put(`http://localhost:5000/api/todos/${id}`);
    setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h1>ToDo List</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTodo}>Add</button>
      <div>
        {todos.map((todo) => (
          <Todo
            key={todo._id}
            todo={todo}
            onDelete={deleteTodo}
            onToggle={toggleTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
