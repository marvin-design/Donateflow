import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';

const DonationHistory = ({ donorId }) => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(`/donor/${donorId}/donations`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Handle both response formats
        const donationsData = response.data.donations || response.data;
        setDonations(donationsData || []);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load donation history');
        console.error('Error fetching donations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [donorId]);

  const displayedDonations = showAll ? [...donations].reverse() : donations.slice(0, 3).reverse();

  if (loading) return <div className="loading-spinner">Loading donation history...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="donation-history-container">
      <h2 className="donation-history-title">Your Donation History</h2>
      
      {donations.length === 0 ? (
        <p className="no-donations-message">No donations found.</p>
      ) : (
        <>
          <ul className="donation-list">
            {displayedDonations.map(donation => (
              <li key={donation.id} className="donation-card">
                <div className="donation-header">
                  <h3 className="charity-name">{donation.charity.name}</h3>
                  <p className="donation-date">
                    {new Date(donation.donation_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                
                <div className="donation-details">
                  <p className="donation-amount">KES {donation.amount.toLocaleString()}</p>
                  <p className="payment-method">Paid via {donation.payment_method}</p>
                  
                  {donation.is_recurring && (
                    <div className="recurring-info">
                      <span className="recurring-badge">Recurring</span>
                      <span className="frequency">{donation.frequency}</span>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {donations.length > 3 && (
            <button 
              className="toggle-history-button"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show Less' : 'View All Donations'}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default DonationHistory;