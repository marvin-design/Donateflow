import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddBeneficiaryForm from './AddBeneficiaryForm';

const BeneficiariesList = () => {
  const [showForm, setShowForm] = useState(false);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

const token = localStorage.getItem('token');
const charity = {
  id: localStorage.getItem('user_id'),
  name: localStorage.getItem('name')
};

  useEffect(() => {
    if (!token || !charity?.id) {
      navigate('/login/charity');
      return;
    }

    const fetchBeneficiaries = async () => {
      try {
        const res = await fetch(`/api/charity/${charity.id}/beneficiaries`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Failed to fetch beneficiaries');

        setBeneficiaries(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
        navigate('/login/charity');
      }
    };

    fetchBeneficiaries();
  }, [charity?.id, token, navigate]);

  const handleAddBeneficiary = (newBeneficiary) => {
    setBeneficiaries(prev => [...prev, newBeneficiary]);
    setShowForm(false);
  };

  if (loading) return <p>Loading beneficiaries...</p>;

  return (
    <div className="list-container">
      <div className="list-header">
        <h2>Beneficiaries</h2>
        <div>
          <button 
            className="btn-secondary"
            onClick={() => navigate('/charity/dashboard')}
          >
            Back to Dashboard
          </button>
          <button 
            className="btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : '+ Add Beneficiary'}
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
          <p>No beneficiaries found.</p>
        )}
      </div>
    </div>
  );
};

export default BeneficiariesList;
