import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../utils/axios';
import BeneficiariesList from './BeneficiariesList';
import InventoryList from './InventoryList';
import CharityProfileForm from './CharityProfileForm';
import CharityDonations from './CharityDonations';

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
        const res = await axios.get(`/api/charity/dashboard/${charityId.current}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!charityData) return null;

  return (
    <div
      className="dashboard-container"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f97316, #ea730c)",
        padding: "20px",
      }}
    >
      <div
        className="dashboard-card"
        style={{
          width: "100%",
          maxWidth: "1200px",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          borderRadius: "15px",
          padding: "20px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        }}
      >
        <h1
          className="text-center mb-4 fw-bold"
          style={{ fontSize: "2rem", color: "#dc2626" }}
        >
          {charityData.name} Dashboard
        </h1>
        <p
          className="text-center"
          style={{ color: "#333", marginBottom: "20px" }}
        >
          {charityData.description}
        </p>

        <div className="dashboard-nav-buttons">
          
         <div>
        <Link to={`/charity/${charityId.current}/donations`}>Donations </Link>
      </div>
              
        </div>
     

        {/* Enhanced Quick Actions Section */}
        <div className="quick-actions text-center mt-5">
          <h3 style={{ color: "#00796b", marginBottom: "20px" }}>
            Quick Actions
          </h3>
          <div className="row">
            {[
              {
                label: "Manage Beneficiaries",
                link: `/charity/${charityData.id}/beneficiaries`,
              },
              { label: "Manage Inventory", link: "/charity/inventory" },
              { label: "Share a Story", link: "/charity/stories" },
              { label: "Update Charity Profile", link: "/charity/profile" },
            ].map((action, index) => (
              <div className="col-md-3 mb-4" key={index}>
                <Link to={action.link} style={quickActionStyle}>
                  <div className="card action-card">
                    <div className="card-body text-center">
                      <h5 className="card-title">{action.label}</h5>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && modalData && (
        <div className="modal" style={modalStyle}>
          <div className="modal-content" style={modalContentStyle}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>{modalData.name || modalData.item_name}</h2>
            <p>{modalData.description || "No description available."}</p>
          </div>
        </div>
      )}

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

        .fade-in {
          animation: fadeIn 0.5s ease forwards;
        }

        .interactive-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }

        .interactive-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        .interactive-button {
          transition: transform 0.3s ease, background-color 0.3s ease;
        }

        .interactive-button:hover {
          transform: translateY(-5px);
          background-color: rgba(249, 115, 22, 0.9);
        }

        .quick-actions {
          padding: 20px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .action-card {
          transition: transform 0.3s ease;
          cursor: pointer;
        }

        .action-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .modal {
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          z-index: 1000;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgba(0, 0, 0, 0.5);
        }

        .modal-content {
          background-color: #fefefe;
          margin: 15% auto;
          padding: 20px;
          border: 1px solid #888;
          border-radius: 10px;
          width: 80%;
          max-width: 500px;
        }

        .close {
          color: #aaa;
          float: right;
          font-size: 28px;
          font-weight: bold;
        }

        .close:hover,
        .close:focus {
          color: black;
          text-decoration: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

// Styles
const cardStyle = {
  background: "rgba(255, 255, 255, 0.9)",
  borderRadius: "10px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
};

const buttonStyle = {
  background: "linear-gradient(135deg, #f97316, #ea730c)",
  borderRadius: "15px",
  fontSize: "1.1rem",
  transition: "all 0.3s ease",
  boxShadow: "0 4px 15px rgba(249,115,22,0.4)",
};

const quickActionStyle = {
  textDecoration: "none",
  color: "#00796b",
};

const modalStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  zIndex: 1000,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  overflow: "auto",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
};

const modalContentStyle = {
  backgroundColor: "#fefefe",
  margin: "15% auto",
  padding: "20px",
  border: "1px solid #888",
  borderRadius: "10px",
  width: "80%",
  maxWidth: "500px",
};

export default CharityDashboard;
