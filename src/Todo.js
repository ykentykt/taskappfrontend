export default function Todo({ todo, setTodos }) {
  
    const updateTodo = async (todoId, todoStatus) => {
      const res = await fetch(`/api/todos/${todoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: todoStatus }),
      });
      const updatedTodo = await res.json();
      if (updatedTodo.acknowledged) {
        setTodos(currentTodos => {
          return currentTodos.map((currentTodo) => {
            if (currentTodo._id === todoId) {
              return { ...currentTodo, status: !currentTodo.status };
            }
            return currentTodo;
          });
        });
      }
    };
  
    const deleteTodo = async (todoId) => {
      const res = await fetch(`/api/todos/${todoId}`, {
        method: "DELETE"
      });
      const deletedTodo = await res.json();
      if (deletedTodo.acknowledged) {
        setTodos(currentTodos => {
          return currentTodos.filter((currentTodo) => currentTodo._id !== todoId);
        });
      }
    };
  
    return (
      <div className="todo">
        <p>{todo.todo}</p>
        <div>
          <button
            className="todo_status"
            onClick={() => updateTodo(todo._id, todo.status)}
          >
            {todo.status ? "☑" : "☐"}
          </button>
          <button
            className="todo_delete"
            onClick={() => deleteTodo(todo._id)}
          >
            🗑️
          </button>
        </div>
      </div>
    );
  };