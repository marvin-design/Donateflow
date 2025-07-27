import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";

const RecurringDonations = () => {
  const [recurring, setRecurring] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecurringDonations = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get("/api/donors/donations/recurring", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecurring(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load recurring donations"
        );
        console.error("Error fetching recurring donations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecurringDonations();
  }, []);

  const handleBack = () => {
    navigate("/donors/dashboard/3");
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 text-muted">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="ms-3">Loading recurring donations...</span>
      </div>
    );

  if (error)
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">{error}</div>
      </div>
    );

  if (recurring.length === 0)
    return (
      <div className="container mt-5 text-center">
        <button onClick={handleBack} className="btn btn-outline-secondary mb-4">
          ← Back
        </button>
        <p className="text-muted">No recurring donations found.</p>
      </div>
    );

  return (
    <div className="container py-5">
      {/* Back Button */}
      <div className="mb-4">
        <button onClick={handleBack} className="btn btn-outline-secondary">
          ← Back to Donor Page
        </button>
      </div>

      <h3 className="text-center fw-bold mb-4" style={{ color: "#f97316" }}>
        Recurring Donations
      </h3>

      <ul className="list-group">
        {recurring.map((d) => (
          <li
            key={d.id}
            className="list-group-item d-flex justify-content-between align-items-center shadow-sm mb-2"
          >
            <div>
              <span className="fw-semibold">KES {d.amount}</span> to{" "}
              <span className="text-secondary">Charity #{d.charity_id}</span>
            </div>
            <span className="badge rounded-pill text-bg-warning">
              {d.frequency}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecurringDonations;
