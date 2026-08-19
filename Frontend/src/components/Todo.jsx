import { useState, useEffect } from "react";
import axios from "axios";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const token = localStorage.getItem("token");

  const API_URL = "https://todo-backend-4v7l.onrender.com/api/todos";

  const fetchTodos = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTodos(res.data);
    } catch (err) {
      console.error("Failed to fetch todos", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      await axios.post(
        API_URL,
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      fetchTodos();
    } catch (err) {
      console.error("Failed to add todo", err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchTodos();
    } catch (err) {
      console.error("Failed to delete todo", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
      }}
    >
      <button
        onClick={logout}
        style={{
          float: "right",
          padding: "8px 12px",
        }}
      >
        Logout
      </button>

      <h2>My To-Do Dashboard</h2>

      <form
        onSubmit={addTodo}
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="New task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            flex: 1,
            padding: "8px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "8px 16px",
          }}
        >
          Add
        </button>
      </form>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
        }}
      >
        {todos.map((todo) => (
          <li
            key={todo._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
              borderBottom: "1px solid #ddd",
            }}
          >
            <span>{todo.title}</span>

            <button
              onClick={() => deleteTodo(todo._id)}
              style={{
                color: "red",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;