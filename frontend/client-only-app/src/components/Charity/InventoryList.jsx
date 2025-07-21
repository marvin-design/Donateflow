import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddInventoryItemForm from './AddInventoryItemForm';

const InventoryList = ({ inventory, beneficiaries }) => {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleAddItem = (newItem) => {
    console.log('Adding inventory item:', newItem);
    setShowForm(false);
  };

  return (
    <div className="list-container">
      <div className="list-header">
        <h2>Inventory</h2>
        <div>
          <button 
            className="btn-secondary"
            onClick={() => navigate('/charity/dashboard')}
          >
            Back to Dashboard
          </button>
          <button 
            className="btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : '+ Add Item'}
          </button>
        </div>
      </div>

      {showForm && (
        <AddInventoryItemForm 
          beneficiaries={beneficiaries} 
          onAdd={handleAddItem} 
        />
      )}

      <div className="items-list">
        {inventory.map((item, index) => (
          <div key={index} className="list-item">
            <h3>{item.item_name} (x{item.amount})</h3>
            <p>Assigned to: {
              beneficiaries.find(b => b.id === item.beneficiary_id)?.name || 'Unknown'
            }</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryList;