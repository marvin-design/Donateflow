import React, { useState } from 'react';
//import './styles/AddBeneficiaryForm.css';

const AddBeneficiaryForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <form className="add-beneficiary-form" onSubmit={handleSubmit}>
      <h3>Add New Beneficiary</h3>
      {/* Form fields */}
    </form>
  );
};

export default AddBeneficiaryForm;