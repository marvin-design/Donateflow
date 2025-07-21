import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BeneficiariesList from './BeneficiariesList';
import InventoryList from './InventoryList';
import CharityProfileForm from './CharityProfileForm';

const CharityDashboard = ({ charityData }) => {
  const [activeTab, setActiveTab] = useState('beneficiaries');
  const navigate = useNavigate();

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
          <BeneficiariesList beneficiaries={charityData.beneficiaries} />
        )}
        {activeTab === 'inventory' && (
          <InventoryList inventory={charityData.inventory} />
        )}
        {activeTab === 'profile' && (
          <CharityProfileForm charity={charityData} />
        )}
      </div>
    </div>
  );
};

export default CharityDashboard;