import React, { useState } from 'react';
import BeneficiariesList from './BeneficiariesList';
import InventoryList from './InventoryList';
import CharityProfileForm from './CharityProfileForm';

const CharityDashboard = ({ charityData }) => {
  const [activeTab, setActiveTab] = useState('beneficiaries');

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>{charityData.name} Dashboard</h1>
        <p>{charityData.description}</p>
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