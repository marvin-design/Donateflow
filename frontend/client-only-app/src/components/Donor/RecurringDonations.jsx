import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { useNavigate } from 'react-router-dom';

const RecurringDonations = () => {
  const [recurring, setRecurring] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecurringDonations = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('/api/donors/donations/recurring', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRecurring(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load recurring donations');
        console.error('Error fetching recurring donations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecurringDonations();
  }, []);

  const handleBack = () => {
    navigate('/donors/dashboard/3'); // Adjust this path if your donor page has a different route
  };

  if (loading) return <div className="loading-spinner">Loading recurring donations...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (recurring.length === 0) return (
    <div className="no-donations">
      <button 
        onClick={handleBack}
        className="back-button"
      >
        ← Back 
      </button>
      <p>No recurring donations found.</p>
    </div>
  );

  return (
    <div className="recurring-donations-container">
      <button 
        onClick={handleBack}
        className="back-button"
      >
        ← Back to Donor Page
      </button>

      <h3 className="section-title">Recurring Donations</h3>
      <ul className="donation-list">
        {recurring.map(d => (
          <li key={d.id} className="donation-item">
            ${d.amount} to charity #{d.charity_id} every {d.frequency}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecurringDonations;