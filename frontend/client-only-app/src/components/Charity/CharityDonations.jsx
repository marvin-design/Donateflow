import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../utils/axios'; // adjust path as needed

export default function CharityDonations() {
  const { charityId } = useParams();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get(`/api/charities/${charityId}/donations`);
        setDonations(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch donations.');
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [charityId]);

  if (loading) return <p className="p-4">Loading donations...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (donations.length === 0) return <p className="p-4">No donations yet.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Donations</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Donor</th>
              <th className="border px-4 py-2">Amount (KES)</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Message</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation.id} className="text-center">
                <td className="border px-4 py-2">{donation.donor_name}</td>
                <td className="border px-4 py-2">{donation.amount}</td>
                <td className="border px-4 py-2">{new Date(donation.date).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{donation.message || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
