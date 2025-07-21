import React, { useEffect, useState } from 'react';

function DonationHistory({ donorId }) {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const token = localStorage.getItem('token'); 

        const response = await fetch(`/donor/${donorId}/donations`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (response.ok) {
          setDonations(data.donations);
        } else {
          setError(data.error || 'Failed to fetch donation history');
        }
      } catch (err) {
        console.error('Error fetching donation history:', err);
        setError('Server error while fetching donation history');
      }
    };

    fetchDonations();
  }, [donorId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Donation History</h2>
      {error && <p className="text-red-500">{error}</p>}
      {donations.length === 0 ? (
        <p>No donations found.</p>
      ) : (
        <ul className="space-y-4">
          {donations.map((donation) => (
            <li
              key={donation.id}
              className="border p-4 rounded shadow-md bg-white"
            >
              <p><strong>Amount:</strong> KES {donation.amount}</p>
              <p><strong>Recurring:</strong> {donation.is_recurring ? 'Yes' : 'No'}</p>
              {donation.is_recurring && (
                <p><strong>Frequency:</strong> {donation.frequency}</p>
              )}
              <p><strong>Payment Method:</strong> {donation.payment_method}</p>
              <p><strong>Date:</strong> {new Date(donation.donation_date).toLocaleString()}</p>
              <p><strong>Charity:</strong> {donation.charity.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DonationHistory;
