import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CharityProfileForm = ({ onUpdate }) => {
  const storedCharity = JSON.parse(localStorage.getItem('logged_in_charity'));
  const [formData, setFormData] = useState({
  name: storedCharity?.name || '',
  email: storedCharity?.email || '',
  description: storedCharity?.description || ''
});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const charityId = parseInt(localStorage.getItem("user_id")); 

    if (!token || !charityId) {
      setMessage('Unauthorized: Please log in again.');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/charity/${charityId}/profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to update profile');

      setMessage('Profile updated successfully.');

      const updatedCharity = { ...storedCharity, ...formData };
      localStorage.setItem('logged_in_charity', JSON.stringify(updatedCharity));

      if (onUpdate) onUpdate(updatedCharity);

    } catch (err) {
      console.error(err);
      setMessage(err.message);
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Edit Profile</h2>
        <button 
          className="btn-secondary"
          onClick={() => navigate(`/charity/dashboard/${storedCharity?.id}`)}
        >
          Back to Dashboard
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Charity Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
          />
        </div>

        <button type="submit" className="btn-primary">Save Changes</button>
      </form>

      {message && <p className="form-message">{message}</p>}
    </div>
  );
};

export default CharityProfileForm;
