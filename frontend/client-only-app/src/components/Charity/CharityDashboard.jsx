import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../utils/axios";

const CharityDashboard = () => {
  const [charityData, setCharityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalData, setModalData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const charityId = useRef();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      charityId.current = localStorage.getItem("user_id");

      if (!token || !charityId.current) {
        navigate("/login/charity");
        return;
      }

      try {
        const res = await axios.get(
          `/api/charity/dashboard/${charityId.current}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = res.data;

        setCharityData({
          ...data.charity,
          total_beneficiaries: data.total_beneficiaries,
          total_inventory: data.total_inventory,
          last_beneficiary: data.recent_activity.last_beneficiary_added,
          last_inventory: data.recent_activity.last_inventory_added,
        });
        setLoading(false);
      } catch (err) {
        console.error("Failed to load dashboard:", err);
        navigate("/login/charity");
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const handleCardClick = (type) => {
    if (type === "beneficiaries") {
      setModalData(charityData.last_beneficiary);
    } else if (type === "inventory") {
      setModalData(charityData.last_inventory);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  if (loading) return <p className="loading-text">Loading dashboard...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!charityData) return null;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">{charityData.name}</h1>
        <p className="dashboard-description">{charityData.description}</p>
        <Link
          to={`/charity/${charityId.current}/donations`}
          className="btn btn-primary"
        >
          <span className="btn-text">View Donations</span>
          <span className="btn-icon">→</span>
        </Link>
      </div>

      <div className="dashboard-grid">
        <div
          className="dashboard-card"
          onClick={() => handleCardClick("beneficiaries")}
        >
          <div className="card-content">
            <h3 className="card-title">Beneficiaries</h3>
            <p className="card-value">{charityData.total_beneficiaries}</p>
          </div>
          <div className="card-overlay">
            <p className="overlay-text">View Details</p>
            <span className="overlay-icon">→</span>
          </div>
        </div>
        <div
          className="dashboard-card"
          onClick={() => handleCardClick("inventory")}
        >
          <div className="card-content">
            <h3 className="card-title">Inventory Items</h3>
            <p className="card-value">{charityData.total_inventory}</p>
          </div>
          <div className="card-overlay">
            <p className="overlay-text">View Details</p>
            <span className="overlay-icon">→</span>
          </div>
        </div>
      </div>

      <div className="quick-actions-section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="quick-actions-grid">
          {[
            {
              label: "Manage Beneficiaries",
              link: `/charity/${charityData.id}/beneficiaries`,
            },
            {
              label: "Manage Inventory",
              link: "/charity/inventory",
            },
            {
              label: "Share a Story",
              link: "/charity/stories",
            },
            {
              label: "Update Profile",
              link: "/charity/profile",
            },
          ].map((action, i) => (
            <Link key={i} to={action.link} className="quick-action">
              <span className="action-label">{action.label}</span>
              <span className="action-icon">→</span>
            </Link>
          ))}
        </div>
      </div>

      {showModal && modalData && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>
              &times;
            </button>
            <h3 className="modal-title">
              {modalData.name || modalData.item_name}
            </h3>
            <p className="modal-description">
              {modalData.description || "No description available."}
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        .dashboard-container {
          padding: 2rem;
          background: linear-gradient(120deg, #f97316, #f59e0b);
          min-height: 100vh;
          font-family: "Inter", sans-serif;
        }

        .dashboard-header {
          background: white;
          padding: 2rem;
          border-radius: 10px;
          margin-bottom: 2rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .dashboard-title {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .dashboard-description {
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 20px;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .btn-primary {
          background: #f97316;
          color: white;
        }

        .btn-primary:hover {
          background: #ea580c;
        }

        .btn-text {
          margin-right: 0.5rem;
        }

        .btn-icon {
          font-size: 1.2rem;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .dashboard-card {
          background: white;
          padding: 2rem;
          border-radius: 10px;
          text-align: center;
          cursor: pointer;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
          position: relative;
          overflow: hidden;
          transition: transform 0.2s ease;
        }

        .dashboard-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        .card-content {
          position: relative;
          z-index: 1;
        }

        .card-title {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .card-value {
          font-size: 2rem;
          font-weight: bold;
        }

        .card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(249, 115, 22, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .dashboard-card:hover .card-overlay {
          opacity: 1;
        }

        .overlay-text {
          color: white;
          font-size: 1.2rem;
          margin-right: 0.5rem;
        }

        .overlay-icon {
          color: white;
          font-size: 1.5rem;
        }

        .quick-actions-section {
          background: white;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .section-title {
          font-size: 1.8rem;
          margin-bottom: 1rem;
        }

        .quick-actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }

        .quick-action {
          background: #f97316;
          color: white;
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s;
        }

        .quick-action:hover {
          background: #ea580c;
        }

        .action-label {
          margin-right: 0.5rem;
        }

        .action-icon {
          font-size: 1.2rem;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 100vw;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-card {
          background: white;
          padding: 2rem;
          border-radius: 10px;
          position: relative;
          max-width: 500px;
          width: 90%;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .close-btn {
          position: absolute;
          top: 10px;
          right: 15px;
          background: transparent;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }

        .modal-title {
          font-size: 1.8rem;
          margin-bottom: 1rem;
        }

        .modal-description {
          font-size: 1.1rem;
        }

        .loading-text {
          font-size: 1.2rem;
          text-align: center;
          margin-top: 2rem;
        }

        .error-text {
          font-size: 1.2rem;
          color: #e53e3e;
          text-align: center;
          margin-top: 2rem;
        }
      `}</style>
    </div>
  );
};

export default CharityDashboard;
