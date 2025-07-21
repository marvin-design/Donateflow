import React from 'react';
import BeneficiariesList from './BeneficiariesList';
import InventoryList from './InventoryList';
//import './styles/CharityDashboard.css';

const CharityDashboard = ({ charityData }) => {
  return (
    <div className="charity-dashboard">
      <h1>{charityData.name} Dashboard</h1>
      {/* Dashboard layout */}
      <BeneficiariesList beneficiaries={charityData.beneficiaries} />
      <InventoryList inventory={charityData.inventory} />
    </div>
  );
};

export default CharityDashboard;