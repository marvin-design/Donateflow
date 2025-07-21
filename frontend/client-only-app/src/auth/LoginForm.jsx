// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios.js"; // Axios instance with JWT support

const Login = ({ role }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`/login/${role}`, form);

      const { access_token, user_id, role: userRole, name } = res.data;

      localStorage.setItem("token", access_token);
      localStorage.setItem("role", userRole);
      localStorage.setItem("user_id", user_id);
      localStorage.setItem("name", name);

      // Redirect to appropriate dashboard
      if (userRole === "donor") {
        navigate(`/dashboard/donor/${user_id}`);
      } else if (userRole === "charity") {
        navigate(`/dashboard/charity/${user_id}`);
      } else if (userRole === "admin") {
        navigate(`/dashboard/admin`);
      } else {
        setError("Unrecognized user role.");
      }
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        "Login failed. Please check your credentials.";
      setError(msg);
    }
  };

  return (
    <div className="form-container">
      <h2 className="text-xl font-bold mb-4">Login as {role.toUpperCase()}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Login;
