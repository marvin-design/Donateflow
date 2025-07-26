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
  const token = localStorage.getItem('token');
  const charityId = parseInt(localStorage.getItem("user_id")); 

  if (!token || !charityId) {
    setMessage("Not authorized or charity not found");
    return;
  }

  try {
    const res = await fetch(`http://localhost:5000/api/charity/${charityId}/beneficiaries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });
    //the fetch here and the token were the issue so do not alter them

    let data = null;
    const contentType = res.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      data = await res.json();
    }

    if (!res.ok) {
      throw new Error((data && data.error) || 'Failed to add beneficiary');
    }

    setMessage('Beneficiary added successfully!');
    if (data) onAdd(data); 
    setFormData({ name: '', location: '' });

  } catch (err) {
    console.error("Submission error:", err);
    setMessage(err.message || 'An error occurred');
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
