import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddBeneficiaryForm from "./AddBeneficiaryForm";
import axios from "../../utils/axios";

const BeneficiariesList = () => {
  const [showForm, setShowForm] = useState(false);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const charityId = localStorage.getItem("user_id");

  useEffect(() => {
    if (!token) {
      navigate("/login/charity");
      return;
    }

    const fetchBeneficiaries = async () => {
      try {
        const res = await axios.get(`/api/charity/${charityId}/beneficiaries`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status !== 200)
          throw new Error(res.data.error || "Failed to fetch beneficiaries");

        setBeneficiaries(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
        navigate("/login/charity");
      }
    };

    fetchBeneficiaries();
  }, [token, charityId, navigate]);

  const handleAddBeneficiary = (newBeneficiary) => {
    setBeneficiaries((prev) => [...prev, newBeneficiary]);
    setShowForm(false);
  };

  if (loading) return <p className="loading-text">Loading beneficiaries...</p>;

  return (
    <div className="beneficiaries-bg">
      <div className="list-container">
        <div className="list-header">
          <h2>Beneficiaries</h2>
          <div>
            <button
              className="btn-secondary"
              onClick={() => navigate(`/charity/dashboard/${charityId}`)}
            >
              Back to Dashboard
            </button>
            <button
              className="btn-primary"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Cancel" : "+ Add Beneficiary"}
            </button>
          </div>
        </div>

        {showForm && <AddBeneficiaryForm onAdd={handleAddBeneficiary} />}

        <div className="items-list">
          {beneficiaries.length > 0 ? (
            beneficiaries.map((beneficiary, index) => (
              <div key={index} className="list-item">
                <h3>{beneficiary.name}</h3>
                <p>{beneficiary.location}</p>
              </div>
            ))
          ) : (
            <p className="no-items">No beneficiaries found.</p>
          )}
        </div>
      </div>

      <style>{`
        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
        }

        .beneficiaries-bg {
          min-height: 100vh;
          background: linear-gradient(270deg, #f97316, #f59e0b, #f97316);
          background-size: 600% 600%;
          animation: moveBg 15s ease infinite;
          display: flex;
          justify-content: center;
          align-items: start;
          padding: 60px 20px;
        }

        @keyframes moveBg {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .list-container {
          width: 100%;
          max-width: 1000px;
          background: #ffffff;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.07);
        }

        .list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .list-header h2 {
          font-size: 1.8rem;
          font-weight: 600;
          color: #f97316;
        }

        .btn-primary,
        .btn-secondary {
          padding: 10px 15px;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-primary {
          background-color: #f97316;
          color: white;
        }

        .btn-primary:hover {
          background-color: #ea580c;
        }

        .btn-secondary {
          background-color: #4b5563;
          color: white;
        }

        .btn-secondary:hover {
          background-color: #374151;
        }

        .items-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }

        .list-item {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.03);
          transition: transform 0.2s ease;
        }

        .list-item:hover {
          transform: translateY(-4px);
        }

        .list-item h3 {
          font-size: 1.2rem;
          font-weight: 600;
          color: #f97316;
          margin-bottom: 8px;
        }

        .list-item p {
          font-size: 0.95rem;
          color: #4b5563;
        }

        .loading-text,
        .no-items {
          text-align: center;
          margin-top: 40px;
          font-size: 1rem;
          color: #6b7280;
        }
      `}</style>
    </div>
  );
};

export default BeneficiariesList;
