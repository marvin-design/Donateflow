// src/pages/Register.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

const Register = ({ role }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const { name, email, password } = formData;

    try {
      const res = await axios.post(`/api/auth/register/${role}`, {
        name,
        email,
        password,
      });

      if (role === "charity") {
        alert("Charity application submitted. Awaiting approval.");
        navigate("/");
        return;
      }

      const {
        access_token,
        user_id,
        role: userRole,
        name: userName,
      } = res.data;

      localStorage.setItem("token", access_token);
      localStorage.setItem("role", userRole);
      localStorage.setItem("user_id", user_id);
      localStorage.setItem("name", userName);

      // Redirect to the appropriate dashboard
      if (userRole === "donor") navigate(`/donors/dashboard/${user_id}`);
      else if (userRole === "admin") navigate(`/admin/dashboard`);
      else if (userRole === "charity")
        navigate(`/charity/dashboard/${user_id}`);
    } catch (err) {
      const msg = err.response?.data?.error || "Registration failed.";
      setError(msg);
    } finally {
      setIsLoading(false);
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
      {/* Animated Background Elements */}
      <div className="position-absolute w-100 h-100">
        <div
          className="position-absolute rounded-circle"
          style={{
            width: "300px",
            height: "300px",
            background: "rgba(255,255,255,0.1)",
            top: "10%",
            left: "10%",
            animation: "float 6s ease-in-out infinite",
          }}
        />
        <div
          className="position-absolute rounded-circle"
          style={{
            width: "200px",
            height: "200px",
            background: "rgba(255,255,255,0.05)",
            bottom: "20%",
            right: "15%",
            animation: "float 8s ease-in-out infinite reverse",
          }}
        />
        <div
          className="position-absolute rounded-circle"
          style={{
            width: "150px",
            height: "150px",
            background: "rgba(255,255,255,0.08)",
            top: "60%",
            left: "5%",
            animation: "float 7s ease-in-out infinite",
          }}
        />
      </div>

      <div
        className="card border-0 shadow-lg position-relative"
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(20px)",
          transform: "translateY(0)",
          transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          animation: "slideInUp 0.8s ease-out",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
          e.currentTarget.style.boxShadow = "0 25px 50px rgba(0,0,0,0.25)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0) scale(1)";
          e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.1)";
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
              Register as {role.charAt(0).toUpperCase() + role.slice(1)}
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

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <div className="position-relative">
                <input
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control border-0 py-3 px-4"
                  style={{
                    background: "#f8f9fa",
                    borderRadius: "15px",
                    fontSize: "1.1rem",
                    transition: "all 0.3s ease",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  }}
                  onFocus={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow =
                      "0 8px 25px rgba(249,115,22,0.15)";
                    e.target.style.background = "#ffffff";
                  }}
                  onBlur={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
                    e.target.style.background = "#f8f9fa";
                  }}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <div className="position-relative">
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control border-0 py-3 px-4"
                  style={{
                    background: "#f8f9fa",
                    borderRadius: "15px",
                    fontSize: "1.1rem",
                    transition: "all 0.3s ease",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  }}
                  onFocus={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow =
                      "0 8px 25px rgba(249,115,22,0.15)";
                    e.target.style.background = "#ffffff";
                  }}
                  onBlur={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
                    e.target.style.background = "#f8f9fa";
                  }}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <div className="position-relative">
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control border-0 py-3 px-4"
                  style={{
                    background: "#f8f9fa",
                    borderRadius: "15px",
                    fontSize: "1.1rem",
                    transition: "all 0.3s ease",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  }}
                  onFocus={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow =
                      "0 8px 25px rgba(249,115,22,0.15)";
                    e.target.style.background = "#ffffff";
                  }}
                  onBlur={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
                    e.target.style.background = "#f8f9fa";
                  }}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn w-100 py-3 border-0 fw-bold text-white position-relative overflow-hidden"
              style={{
                background: isLoading
                  ? "linear-gradient(135deg, #9ca3af, #6b7280)"
                  : "linear-gradient(135deg, #f97316, #ea730c)",
                borderRadius: "15px",
                fontSize: "1.1rem",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(249,115,22,0.4)",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 8px 25px rgba(249,115,22,0.6)";
                  e.target.style.background =
                    "linear-gradient(135deg, #ea730c, #dc2626)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 15px rgba(249,115,22,0.4)";
                  e.target.style.background =
                    "linear-gradient(135deg, #f97316, #ea730c)";
                }
              }}
            >
              {isLoading ? (
                <div className="d-flex align-items-center justify-content-center">
                  <div
                    className="spinner-border spinner-border-sm me-2"
                    style={{
                      width: "1rem",
                      height: "1rem",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  Creating Account...
                </div>
              ) : (
                <>
                  Sign Up
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                      transform: "translateX(-100%)",
                      animation: "shine 2s ease-in-out infinite",
                    }}
                  />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

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

        @keyframes shine {
          0% { transform: translateX(-100%); }
          50%, 100% { transform: translateX(100%); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Register;
