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
    console.log("Key Pressed:", e.key, "Ctrl:", e.ctrlKey); // Debug

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "a") {
      e.preventDefault();
      console.log("🎯 Triggering Admin Modal!");
      setShowAdminLogin(true);
    }

    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);


  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
      navigate("/admin/dashboard");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

    if (!showAdminLogin) return null;

  return (
    <div style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: "white",
      padding: "20px",
      zIndex: 1000,
      border: "2px solid black"
    }}>
      <h3>Admin Login</h3>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <input name="secret_key" placeholder="Secret Key" value={form.secret_key} onChange={handleChange} />
        <button type="submit">Login</button>
        <button type="button" onClick={() => setShowAdminLogin(false)}>Cancel</button>
      </form>
    </div>
  );

}