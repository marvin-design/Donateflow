import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const AddBeneficiaryForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
  });
  const [message, setMessage] = useState("");
  const { token, user } = useContext(AuthContext);
  const localToken = localStorage.getItem("token");
  const localUserId = parseInt(localStorage.getItem("user_id"));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const activeToken = token || localToken;
    const charityId = user?.id || localUserId;
    //const token = localStorage.getItem("token");
    //const charityId = parseInt(localStorage.getItem("user_id"));

    if (!activeToken || !charityId) {
      setMessage("Not authorized or charity not found");
      return;
    }

    try {
      const res = await fetch(
        `https://donateflow-1.onrender.com/api/charity/${charityId}/beneficiaries`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${activeToken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      let data = null;
      const contentType = res.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      }

      if (!res.ok) {
        throw new Error((data && data.error) || "Failed to add beneficiary");
      }

      setMessage("✅ Beneficiary added successfully!");
      if (data) onAdd(data);
      setFormData({ name: "", location: "" });
    } catch (err) {
      console.error("Submission error:", err);
      setMessage(err.message || "An error occurred");
    }
  };

  return (
    <div className="mb-4">
      <div className="card shadow-sm p-4 mb-3">
        <h4 className="mb-3 text-orange">Add New Beneficiary</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Beneficiary name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Location</label>
            <input
              type="text"
              className="form-control"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Beneficiary location"
            />
          </div>

          <button
            type="submit"
            className="btn custom-orange-btn w-100 fw-semibold"
          >
            Add Beneficiary
          </button>
        </form>
        {message && <p className="mt-3 text-muted">{message}</p>}
      </div>

      <style>{`
        .text-orange {
          color: #f97316;
        }

        .custom-orange-btn {
          background-color: transparent;
          color: #f97316;
          border: 2px solid #f97316;
          transition: all 0.3s ease;
        }

        .custom-orange-btn:hover {
          background-color: #f97316;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default AddBeneficiaryForm;
