import React, { useState } from 'react';

const AddBeneficiaryForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    const charity = JSON.parse(localStorage.getItem('logged_in_charity'));

    if (!token || !charity?.id) {
      setMessage("Not authorized or charity not found");
      return;
    }

    try {
      const res = await fetch(`/api/charity/${charity.id}/beneficiaries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to add beneficiary');

      setMessage('Beneficiary added successfully!');
      onAdd(data); 
      setFormData({ name: '', location: '' });

    } catch (err) {
      console.error(err);
      setMessage(err.message);
    }
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

      {message && <p>{message}</p>}
    </div>
  );
};

export default AddBeneficiaryForm;
