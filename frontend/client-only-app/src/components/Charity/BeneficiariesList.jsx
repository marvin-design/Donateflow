import React, { useState } from 'react';
import AddBeneficiaryForm from './AddBeneficiaryForm';

const BeneficiariesList = ({ beneficiaries }) => {
  const [showForm, setShowForm] = useState(false);

  const handleAddBeneficiary = (newBeneficiary) => {
    // In a real app, this would call an API
    console.log('Adding beneficiary:', newBeneficiary);
    setShowForm(false);
  };

  return (
    <div className="list-container">
      <div className="list-header">
        <h2>Beneficiaries</h2>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ Add Beneficiary'}
        </button>
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