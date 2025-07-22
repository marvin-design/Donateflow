import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DonorDashboard = ({ donorId }) => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/donor/${donorId}/donations`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setDonations(response.data.donations);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch donation history');
        console.error('Error fetching donations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [donorId]);

  const totalAmount = donations.reduce((sum, donation) => sum + parseFloat(donation.amount), 0);
  const totalDonations = donations.length;
  const uniqueCharities = new Set(donations.map(d => d.charity.name)).size;
  const displayedDonations = showAll ? [...donations].reverse() : donations.slice(-2).reverse();

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="donor-dashboard">
      <div className="dashboard-header">
        <h2 className="welcome-title">Welcome back</h2>
        <p className="welcome-message">Thank you for choosing to make a difference</p>
      </div>

      <div className="stats-container">
        <div className="stat-card amount-card">
          <h3 className="stat-title">Total Amount Donated</h3>
          <div className="stat-value">KES {totalAmount.toFixed(2)}</div>
        </div>

        <div className="stat-card count-card">
          <h3 className="stat-title">Total Donations Made</h3>
          <div className="stat-value">{totalDonations}</div>
        </div>

        <div className="stat-card charities-card">
          <h3 className="stat-title">Different Charities Donated To</h3>
          <div className="stat-value">{uniqueCharities}</div>
        </div>
      </div>

      <div className="donations-section">
        <h3 className="section-title">Recent Donations</h3>
        <p className="section-subtitle">Your latest contributions</p>
        
        {donations.length === 0 ? (
          <p className="no-donations">No donations found.</p>
        ) : (
          <ul className="donations-list">
            {displayedDonations.map((donation) => (
              <li key={donation.id} className="donation-item">
                <p className="donation-amount">Amount: KES {donation.amount}</p>
                <p className="donation-date">Date: {new Date(donation.donation_date).toLocaleString()}</p>
                <p className="donation-charity">Charity: {donation.charity.name}</p>
              </li>
            ))}
          </ul>
        )}

        {donations.length > 2 && (
          <button 
            className="toggle-donations-btn"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : 'View All Donations'}
          </button>
        )}
      </div>
    </div>
  );
};

export default DonorDashboard;