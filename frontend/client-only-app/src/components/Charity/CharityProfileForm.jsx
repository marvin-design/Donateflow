import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CharityProfileForm = ({ onUpdate }) => {
  const storedCharity = JSON.parse(localStorage.getItem("logged_in_charity"));
  const [formData, setFormData] = useState({
    name: storedCharity?.name || "",
    email: storedCharity?.email || "",
    description: storedCharity?.description || "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const charityId = parseInt(localStorage.getItem("user_id"));

    if (!token || !charityId) {
      setMessage("Unauthorized: Please log in again.");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/charity/${charityId}/profile`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to update profile");

      setMessage("✅ Profile updated successfully.");

      const updatedCharity = { ...storedCharity, ...formData };
      localStorage.setItem("logged_in_charity", JSON.stringify(updatedCharity));

      if (onUpdate) onUpdate(updatedCharity);
    } catch (err) {
      console.error(err);
      setMessage(err.message);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(-45deg, #f97316, #fb923c, #fdba74, #f97316)",
        backgroundSize: "400% 400%",
        animation: "gradientMove 10s ease infinite",
        padding: "20px",
      }}
    >
      <div
        className="card p-4 shadow"
        style={{ width: "100%", maxWidth: "600px", borderRadius: "12px" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-danger mb-0">✏️ Edit Charity Profile</h3>
          <button
            className="btn btn-warning"
            onClick={() => navigate(`/charity/dashboard/${storedCharity?.id}`)}
          >
            ← Back
          </button>
        </div>

        {message && (
          <div
            className={`alert ${
              message.includes("successfully")
                ? "alert-success"
                : "alert-danger"
            }`}
            role="alert"
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Charity Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. Save the Earth Org"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="email@example.com"
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Tell us about your charity's mission..."
            />
          </div>

          <button
            type="submit"
            className="btn w-100 fw-semibold text-white"
            style={{ backgroundColor: "#f97316" }}
          >
            💾 Save Changes
          </button>
        </form>
      </div>

      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default CharityProfileForm;
