import { useState, useEffect } from 'react';
import Todo from './Todo';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    async function fetchTodos() {
      const response = await fetch("/api/todos");
      const todos = await response.json();
      setTodos(todos);
    }
    fetchTodos();
  }, []);

  const createNewTodo = async (e) => {
    e.preventDefault();
    if (newTodo.length > 3) {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todo: newTodo }),
      });
      const task = await res.json();

      setTodos([...todos, task]);
      setNewTodo("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Todo List App</h1>
      <form className="form" onSubmit={createNewTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new task..."
          className="form_input"
          required
        />
        <button type="submit" className="form_button">Add</button>
      </form>
      <div className="todos">
        {(todos.length > 0) && /*<pre>{JSON.stringify(todos, null, 2)}</pre>*/
          todos.map((todo) => (
            <Todo key={todo._id} todo={todo} setTodos={setTodos} />
          ))
        }
      </div>
    </div>
  );
};