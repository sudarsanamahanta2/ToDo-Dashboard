import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Todo from "./components/Todo";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/todos" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={() => window.location.href = "/todos"} />} />
        <Route path="/register" element={<Register onRegister={() => window.location.href = "/login"} />} />
        <Route path="/todos" element={<Todo />} />
      </Routes>
    </Router>
  );
}

export default App;