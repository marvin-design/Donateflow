import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../utils/axios';
import BeneficiariesList from './BeneficiariesList';
import InventoryList from './InventoryList';
import CharityProfileForm from './CharityProfileForm';

const CharityDashboard = () => {
  const [activeTab, setActiveTab] = useState('beneficiaries');
  const [charityData, setCharityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

 useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('token');
      const charity = {
        id: localStorage.getItem('user_id'),
        name: localStorage.getItem('name'),
      };

      if (!token || !charity?.id) {
        navigate('/login/charity');
        return;
      }

      try {
        const res = await axios.get(`/api/charity/dashboard/${charity.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data;

        setCharityData({
          ...data.charity,
          total_beneficiaries: data.total_beneficiaries,
          total_inventory: data.total_inventory,
          last_beneficiary: data.recent_activity.last_beneficiary_added,
          last_inventory: data.recent_activity.last_inventory_added,
        });
        setLoading(false);
      } catch (err) {
        console.error('Failed to load dashboard:', err);
        navigate('/login/charity');
      }
    };

    fetchDashboardData();
  }, [navigate])

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!charityData) return null;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>{charityData.name} Dashboard</h1>
        <p>{charityData.description}</p>

        <div className="dashboard-nav-buttons">
          <button 
            className="btn-secondary"
            onClick={() => navigate('/charities')}
          >
            View All Charities
          </button>
          <button 
            className="btn-secondary"
            onClick={() => navigate('/donations')}
          >
            View Donations
          </button>
        </div>

        <div className="dashboard-stats">
          <p>Total Beneficiaries: {charityData.total_beneficiaries}</p>
          <p>Total Inventory Items: {charityData.total_inventory}</p>
          {charityData.last_beneficiary && (
            <p>Last Beneficiary: {charityData.last_beneficiary.name}</p>
          )}
          {charityData.last_inventory && (
            <p>Last Inventory Item: {charityData.last_inventory.item_name}</p>
          )}
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <ul>
          <li><Link to="/charity/${charityData.id}/beneficiaries">Manage Beneficiaries</Link></li>
          <li><Link to="/charity/inventory">Manage Inventory</Link></li>
          <li><Link to="/charity/stories">Share a Story</Link></li>
          <li><Link to="/charity/profile">Update Charity Profile</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default CharityDashboard;
