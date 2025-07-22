import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BeneficiariesList from './BeneficiariesList';
import InventoryList from './InventoryList';
import CharityProfileForm from './CharityProfileForm';

const CharityDashboard = () => {
  const [activeTab, setActiveTab] = useState('beneficiaries');
  const [charityData, setCharityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('access_token');
      const charity = JSON.parse(localStorage.getItem('logged_in_charity'));

      if (!token || !charity?.id) {
        navigate('/login');
        return;
      }

      try {
        const res = await fetch(`/api/charity/${charity.id}/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Failed to load dashboard');

        setCharityData({
          ...data.charity,
          total_beneficiaries: data.total_beneficiaries,
          total_inventory: data.total_inventory,
          last_beneficiary: data.recent_activity.last_beneficiary_added,
          last_inventory: data.recent_activity.last_inventory_added
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        navigate('/login');
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (loading) return <p>Loading dashboard...</p>;
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

      <div className="dashboard-tabs">
        <button 
          className={activeTab === 'beneficiaries' ? 'active' : ''}
          onClick={() => setActiveTab('beneficiaries')}
        >
          Beneficiaries
        </button>
        <button 
          className={activeTab === 'inventory' ? 'active' : ''}
          onClick={() => setActiveTab('inventory')}
        >
          Inventory
        </button>
        <button 
          className={activeTab === 'profile' ? 'active' : ''}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'beneficiaries' && (
          <BeneficiariesList beneficiaries={charityData.beneficiaries || []} />
        )}
        {activeTab === 'inventory' && (
          <InventoryList inventory={charityData.inventory_items || []} />
        )}
        {activeTab === 'profile' && (
          <CharityProfileForm charity={charityData} />
        )}
      </div>
    </div>
  );
};

export default CharityDashboard;
