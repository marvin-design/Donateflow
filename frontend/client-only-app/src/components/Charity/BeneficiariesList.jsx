import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddBeneficiaryForm from "./AddBeneficiaryForm";
import axios from "../../utils/axios";
import { AuthContext } from "../../context/AuthContext";

const BeneficiariesList = () => {
  const [showForm, setShowForm] = useState(false);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const {token, user} = useContext(AuthContext)
  const localToken = localStorage.getItem("token");
  const localUserId = localStorage.getItem("user_id");

  const activeToken = token || localToken;
  const charityId = user?.id || localUserId;

  useEffect(() => {
    if (!activeToken) {
      navigate("/login/charity");
      return;
    }

    const fetchBeneficiaries = async () => {
      try {
        const res = await axios.get(`/api/charity/${charityId}/beneficiaries`, {
          headers: {
            Authorization: `Bearer ${activeToken}`,
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
  }, [activeToken, charityId, navigate]);

  const handleAddBeneficiary = (newBeneficiary) => {
    setBeneficiaries((prev) => [...prev, newBeneficiary]);
    setShowForm(false);
  };

  if (loading)
    return (
      <p className="text-center mt-5 text-muted">Loading beneficiaries...</p>
    );

  return (
    <div className="container py-5">
      <div className="bg-white p-4 shadow rounded">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-orange fw-bold">Beneficiaries</h2>
          <div className="d-flex gap-2">
            <button
              className="btn btn-clear-orange"
              onClick={() => navigate(`/charity/dashboard/${charityId}`)}
            >
              Back to Dashboard
            </button>
            <button
              className="btn btn-clear-orange"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Cancel" : "+ Add Beneficiary"}
            </button>
          </div>
        </div>

        {showForm && <AddBeneficiaryForm onAdd={handleAddBeneficiary} />}

        <div className="row">
          {beneficiaries.length > 0 ? (
            beneficiaries.map((beneficiary, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title text-orange">
                      {beneficiary.name}
                    </h5>
                    <p className="card-text text-muted">
                      {beneficiary.location}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">No beneficiaries found.</p>
          )}
        </div>
      </div>

      <style>{`
        .text-orange {
          color: #f97316;
        }

        .btn-clear-orange {
          background-color: transparent;
          border: 2px solid #f97316;
          color: #f97316;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .btn-clear-orange:hover {
          background-color: #f97316;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default BeneficiariesList;
