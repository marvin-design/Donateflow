import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CharityProfileForm = ({ charity, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: charity.name,
    email: charity.email,
    description: charity.description
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    const storedCharity = JSON.parse(localStorage.getItem('logged_in_charity'));

    if (!token || !storedCharity?.id) {
      setMessage('Unauthorized: Please log in again.');
      return;
    }

    try {
      const res = await fetch(`/api/charity/${storedCharity.id}/profile`, {
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
          onClick={() => navigate('/charity/dashboard')}
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
