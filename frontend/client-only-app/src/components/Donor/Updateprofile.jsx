import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';

const UpdateDonorProfile = ({ donorId }) => {
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: ''
  });
  const [donations, setDonations] = useState([]);
  const [recurringSelections, setRecurringSelections] = useState({});
  const [loading, setLoading] = useState({
    profile: false,
    donations: false,
    updates: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch donor profile and recurring donations
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    
    const fetchData = async () => {
      try {
        setLoading(prev => ({ ...prev, donations: true }));
        
        // Fetch profile data
        const profileResponse = await axios.get(`/donor/${donorId}/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfileForm({
          name: profileResponse.data.name || '',
          email: profileResponse.data.email || ''
        });

        // Fetch recurring donations
        const donationsResponse = await axios.get('/donations/recurring', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setDonations(donationsResponse.data);
        
        // Initialize recurring selections
        const initialSelections = {};
        donationsResponse.data.forEach(donation => {
          initialSelections[donation.id] = donation.is_recurring;
        });
        setRecurringSelections(initialSelections);
        
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load profile data');
      } finally {
        setLoading(prev => ({ ...prev, donations: false }));
      }
    };

    fetchData();
  }, [donorId]);

  const handleProfileChange = e => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };

  const handleRecurringToggle = donationId => {
    setRecurringSelections(prev => ({
      ...prev,
      [donationId]: !prev[donationId]
    }));
  };

  const handleProfileSubmit = async e => {
    e.preventDefault();
    setLoading(prev => ({ ...prev, profile: true }));
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('access_token');
      await axios.patch(`/donor/${donorId}/profile`, profileForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(prev => ({ ...prev, profile: false }));
    }
  };

  const handleRecurringUpdate = async () => {
    setLoading(prev => ({ ...prev, updates: true }));
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('access_token');
      const updates = Object.entries(recurringSelections).map(([id, isRecurring]) => ({
        donation_id: id,
        is_recurring: isRecurring
      }));

      await Promise.all(
        updates.map(update => 
          axios.patch('/donations/recurring', update, {
            headers: { Authorization: `Bearer ${token}` }
          })
      ));

      setSuccess('Recurring donations updated successfully!');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update recurring donations');
    } finally {
      setLoading(prev => ({ ...prev, updates: false }));
    }
  };

  if (loading.donations) return <div className="loading-spinner">Loading profile data...</div>;

  return (
    <div className="donor-profile-container">
      <h2 className="profile-title">Update Your Profile</h2>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="profile-section">
        <h3 className="section-title">Personal Information</h3>
        <form onSubmit={handleProfileSubmit} className="profile-form">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              value={profileForm.name}
              onChange={handleProfileChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              value={profileForm.email}
              onChange={handleProfileChange}
              className="form-input"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={loading.profile}
          >
            {loading.profile ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>

      <div className="recurring-section">
        <h3 className="section-title">Manage Recurring Donations</h3>
        
        {donations.length === 0 ? (
          <p className="no-donations">No recurring donations found.</p>
        ) : (
          <>
            <ul className="donation-list">
              {donations.map(donation => (
                <li key={donation.id} className="donation-item">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={recurringSelections[donation.id] || false}
                      onChange={() => handleRecurringToggle(donation.id)}
                      className="checkbox-input"
                    />
                    <span className="donation-info">
                      {donation.charity?.name || 'Unknown Charity'} - 
                      KES {donation.amount} ({donation.frequency})
                    </span>
                  </label>
                </li>
              ))}
            </ul>
            
            <button
              onClick={handleRecurringUpdate}
              className="submit-button"
              disabled={loading.updates}
            >
              {loading.updates ? 'Updating...' : 'Save Changes'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UpdateDonorProfile;