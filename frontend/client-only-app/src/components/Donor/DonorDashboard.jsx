import React, { useEffect, useState } from 'react';

function DonorDashboard({ donorId }) {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState('');
  const [showAll, setShowAll] = useState(false);

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
        console.error('Error:', err);
        setError('Server error while fetching donation history');
      }
    };

    fetchDonations();
  }, [donorId]);

 
  const totalAmount = donations.reduce((sum, donation) => sum + parseFloat(donation.amount), 0);
  const totalDonations = donations.length;
  const uniqueCharities = new Set(donations.map(d => d.charity.name)).size;


  const displayedDonations = showAll ? donations.slice().reverse() : donations.slice(-2).reverse();

  return (
    <div className="p-6">
      <p className="text-xl font-semibold">Welcome back</p>
      <p className="mb-4">Thank you for choosing to make a difference</p>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded shadow">
          <p className="font-semibold">Total Amount Donated</p>
          <div className="text-2xl text-green-700">KES {totalAmount.toFixed(2)}</div>
        </div>

        <div className="bg-blue-100 p-4 rounded shadow">
          <p className="font-semibold">Total Donations Made</p>
          <div className="text-2xl text-blue-700">{totalDonations}</div>
        </div>

        <div className="bg-purple-100 p-4 rounded shadow">
          <p className="font-semibold">Different Charities Donated To</p>
          <div className="text-2xl text-purple-700">{uniqueCharities}</div>
        </div>
      </div>

      <div>
        <p className="text-lg font-semibold">Recent Donations</p>
        <p className="mb-2 text-gray-600">Your latest contributions</p>
        {donations.length === 0 ? (
          <p>No donations found.</p>
        ) : (
          <ul className="space-y-4">
            {displayedDonations.map((donation) => (
              <li key={donation.id} className="bg-white border p-4 rounded shadow">
                <p><strong>Amount:</strong> KES {donation.amount}</p>
                <p><strong>Date:</strong> {new Date(donation.donation_date).toLocaleString()}</p>
                <p><strong>Charity:</strong> {donation.charity.name}</p>
              </li>
            ))}
          </ul>
        )}

        {donations.length > 2 && (
          <div className="mt-4">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-blue-600 hover:underline"
            >
              {showAll ? 'Show Less' : 'View All Donations'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DonorDashboard;
