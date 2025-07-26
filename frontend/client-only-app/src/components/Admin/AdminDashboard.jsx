import React, { useEffect, useState } from 'react';
import axios from "../../utils/axios";
import CharityApplicationsList from './CharityApplicationsList';
import CharityManagement from './CharityManagement';
import { useNavigate } from 'react-router-dom';
function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const token = localStorage.getItem('adminToken');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/admin/dashboard', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setStats(res.data))
    .catch(err => console.error(err));
  }, []);


   const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <div>
                <button onClick={handleLogout}>Logout</button>
                </div>
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
