// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = ({ role }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`/register/${role}`, form);

      if (role === "charity") {
        alert("Charity application submitted. Awaiting approval.");
        navigate("/");
      } else {
        const { access_token, role: userRole } = res.data;
        localStorage.setItem("token", access_token);
        localStorage.setItem("role", userRole);
        navigate(`/dashboard/${userRole}`);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed.");
    }
  };

  return (
    <div className="form-container">
      <h2>Register as {role.charAt(0).toUpperCase() + role.slice(1)}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Create Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default Register;
