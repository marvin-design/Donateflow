import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { useParams, Link } from 'react-router-dom';

const DonorDashboard = () => {
  const [donations, setDonations] = useState([]);
  const { donorId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/donors/dashboard/${donorId}`, {
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="donor-dashboard">
      <div className="dashboard-header">
        <h2>Welcome back</h2>
        <p>Thank you for choosing to make a difference</p>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <h4>Total Donated</h4>
          <p>KES {totalAmount.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h4>Total Donations</h4>
          <p>{totalDonations}</p>
        </div>
        <div className="stat-card">
          <h4>Charities Supported</h4>
          <p>{uniqueCharities}</p>
        </div>
      </div>

      <div className="donations-section">
        <h3>Recent Donations</h3>
        {donations.length === 0 ? (
          <p>No donations found.</p>
        ) : (
          <>
            <ul>
              {displayedDonations.map((donation) => (
                <li key={donation.id}>
                  <p>Amount: KES {donation.amount}</p>
                  <p>Date: {new Date(donation.donation_date).toLocaleDateString()}</p>
                  <p>Charity: {donation.charity.name}</p>
                </li>
              ))}
            </ul>
            {donations.length > 2 && (
              <button onClick={() => setShowAll(!showAll)}>
                {showAll ? 'Show Less' : 'View All Donations'}
              </button>
            )}
          </>
        )}
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <ul>
          <li><Link to="/charities">Browse Charities</Link></li>
          <li><Link to="/stories/feed">Read Impact Stories</Link></li>
          <li><Link to="/search-charity">Search a Charity</Link></li>
          <li><Link to="/donors/profile/update">Manage Profile & Settings</Link></li>
          <li><Link to="/donors/isrecurring">Update Recurring Donations</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default DonorDashboard;
