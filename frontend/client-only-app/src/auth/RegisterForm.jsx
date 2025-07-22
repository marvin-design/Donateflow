// src/pages/Register.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

const Register = ({ role }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const role = localStorage.getItem("role");
      const userId = localStorage.getItem("user_id");
      if (role === "donor") navigate(`/donors/dashboard/${userId}`);
      else if (role === "charity") navigate(`/charity/dashboard/${userId}`);
      else if (role === "admin") navigate("/admin/dashboard");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, email, password, confirmPassword, bio } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(`/api/auth/register/${role}`, {
        name,
        email,
        password
      });

      if (role === "charity") {
        alert("Charity application submitted. Awaiting approval.");
        navigate("/");
        return;
      }

      const { access_token, user_id, role: userRole, name: userName } = res.data;

      localStorage.setItem("token", access_token);
      localStorage.setItem("role", userRole);
      localStorage.setItem("user_id", user_id);
      localStorage.setItem("name", userName);

      // Redirect to the appropriate dashboard
      if (userRole === "donor") navigate(`/donors/dashboard/${user_id}`);
      else if (userRole === "admin") navigate(`/admin/dashboard`);
      else if (userRole === "charity") navigate(`/charity/dashboard/${user_id}`);
    } catch (err) {
      const msg = err.response?.data?.error || "Registration failed.";
      setError(msg);
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-card">
        <h2 className="auth-title">Register as {role.charAt(0).toUpperCase() + role.slice(1)}</h2>
        {error && <div className="error-message">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
            required
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="form-input"
            required
          />

          <button type="submit" className="form-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
