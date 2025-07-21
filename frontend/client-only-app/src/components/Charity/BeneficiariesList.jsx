import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddBeneficiaryForm from './AddBeneficiaryForm';

const BeneficiariesList = ({ beneficiaries }) => {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleAddBeneficiary = (newBeneficiary) => {
    console.log('Adding beneficiary:', newBeneficiary);
    setShowForm(false);
  };

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
        {beneficiaries.map((beneficiary, index) => (
          <div key={index} className="list-item">
            <h3>{beneficiary.name}</h3>
            <p>{beneficiary.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeneficiariesList;