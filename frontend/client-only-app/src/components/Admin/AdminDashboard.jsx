import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CharityApplicationsList from './CharityApplicationsList';
import CharityManagement from './CharityManagement';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    axios.get('/api/admin/dashboard', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setStats(res.data))
    .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {stats && (
        <div>
          <div>Total Charities: {stats.total_charities}</div>
          <div>Total Donors: {stats.total_donors}</div>
          <div>Total Donations: {stats.total_donations}</div>
          <div>Total Amount: Ksh {stats.total_amount}</div>
        </div>
      )}
      <CharityApplicationsList />
      <CharityManagement />
    </div>
  );
}

export default AdminDashboard;
