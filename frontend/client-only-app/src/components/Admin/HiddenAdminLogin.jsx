import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";

export default function HiddenAdminLogin() {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", secret_key: "" });
  const navigate = useNavigate();
  const VITE_SECRET_KEY = import.meta.env.VITE_ADMIN_KEY;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "a") {
        e.preventDefault();
        setShowAdminLogin(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.secret_key !== VITE_SECRET_KEY) {
      alert("Invalid secret key!");
      return;
    }
    try {
      const res = await axios.post("/api/auth/login/admin", form);
      localStorage.setItem("adminToken", res.data.access_token);
      localStorage.setItem("role", res.data.role);
      setShowAdminLogin(false);
      navigate("/admin/dashboard");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  if (!showAdminLogin) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#ffffff",
        padding: "30px",
        zIndex: 1000,
        borderRadius: "12px",
        width: "100%",
        maxWidth: "400px",
        boxShadow: "0 0 20px rgba(0,0,0,0.15)",
        border: "1px solid #ddd",
      }}
    >
      <h4 className="text-center mb-4 fw-semibold text-dark">Admin Login</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            name="email"
            className="form-control"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            name="password"
            type="password"
            className="form-control"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <input
            name="secret_key"
            className="form-control"
            placeholder="Secret Key"
            value={form.secret_key}
            onChange={handleChange}
          />
        </div>
        <div className="d-flex justify-content-between">
          <button
            type="submit"
            className="btn btn-sm rounded-pill px-4 fw-medium shadow-sm"
            style={{
              borderColor: "#f97316",
              color: "#f97316",
              backgroundColor: "transparent",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#f97316";
              e.currentTarget.style.color = "#ffffff";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#f97316";
            }}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setShowAdminLogin(false)}
            className="btn btn-sm rounded-pill px-4 fw-medium shadow-sm"
            style={{
              borderColor: "#f97316",
              color: "#f97316",
              backgroundColor: "transparent",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#f97316";
              e.currentTarget.style.color = "#ffffff";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#f97316";
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
