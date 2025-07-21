import React, { useState } from 'react';

const AddBeneficiaryForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ name: '', location: '' }); // Reset form
  };

  return (
    <div className="form-container">
      <h3>Add New Beneficiary</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn-primary">Add Beneficiary</button>
      </form>
    </div>
  );
};

export default AddBeneficiaryForm;