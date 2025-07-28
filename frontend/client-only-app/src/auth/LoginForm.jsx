// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios.js";

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
      const res = await axios.post(`/api/auth/login/${role}`, form);

      const { access_token, user_id, role: userRole, name} = res.data;
      
      localStorage.setItem("token", access_token);
      localStorage.setItem("role", userRole);
      localStorage.setItem("user_id", user_id);
      localStorage.setItem("name", name);
        
     

      // Redirect to appropriate dashboard
      if (userRole === "donor") {
        navigate(`/donors/dashboard/${user_id}`);
      } else if (userRole === "charity") {
        navigate(`/charity/dashboard/${user_id}`);
      } else if (userRole === "admin") {
        navigate(`/admin/dashboard`);
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
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden"
      style={{
        background:
          "rgba(243, 227, 220, 0.95)", // Static background
      }}
    >
      <div
        className="card border-0 shadow-lg position-relative"
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(20px)",
          animation: "slideInUp 0.8s ease-out",
        }}
      >
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h2
              className="mb-3 fw-bold"
              style={{
                background: "linear-gradient(135deg, #f97316, #ea730c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: "2.2rem",
                animation: "titleGlow 2s ease-in-out infinite alternate",
              }}
            >
              Login as {role.charAt(0).toUpperCase() + role.slice(1)}
            </h2>
            <div
              className="mx-auto"
              style={{
                width: "60px",
                height: "4px",
                background: "linear-gradient(90deg, #f97316, #ea730c)",
                borderRadius: "2px",
                animation: "expandLine 1s ease-out",
              }}
            />
          </div>

          {error && (
            <div
              className="alert alert-danger border-0 mb-4"
              style={{
                background: "linear-gradient(135deg, #dc2626, #b91c1c)",
                color: "white",
                animation: "shake 0.5s ease-in-out",
              }}
            >
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className="form-control border-0 py-3 px-4"
              style={{
                background: "#f8f9fa",
                borderRadius: "15px",
                fontSize: "1.1rem",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={form.password}
              onChange={handleChange}
              required
              className="form-control border-0 py-3 px-4"
              style={{
                background: "#f8f9fa",
                borderRadius: "15px",
                fontSize: "1.1rem",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            />
            <button
              type="submit"
              className="btn w-100 py-3 border-0 fw-bold text-white position-relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #f97316, #ea730c)",
                borderRadius: "15px",
                fontSize: "1.1rem",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(249,115,22,0.4)",
              }}
              onMouseEnter={(e) => {
                e.target.style.background =
                  "linear-gradient(135deg, #ea730c, #dc2626)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background =
                  "linear-gradient(135deg, #f97316, #ea730c)";
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes titleGlow {
          from { text-shadow: 0 0 10px rgba(249,115,22,0.5); }
          to { text-shadow: 0 0 20px rgba(249,115,22,0.8), 0 0 30px rgba(249,115,22,0.5); }
        }

        @keyframes expandLine {
          from { width: 0; }
          to { width: 60px; }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
};

export default Login;
