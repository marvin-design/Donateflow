import React from 'react';
import AddBeneficiaryForm from './AddBeneficiaryForm';
//import './styles/BeneficiariesList.css';

const BeneficiariesList = ({ beneficiaries }) => {
  return (
    <div className="beneficiaries-list">
      <h2>Beneficiaries</h2>
      <AddBeneficiaryForm />
      {/* List rendering */}
    </div>
  );
};

export default BeneficiariesList;