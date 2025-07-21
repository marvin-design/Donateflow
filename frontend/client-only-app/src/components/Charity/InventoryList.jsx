import React, { useState } from 'react';
import AddInventoryItemForm from './AddInventoryItemForm';

const InventoryList = ({ inventory, beneficiaries }) => {
  const [showForm, setShowForm] = useState(false);

  const handleAddItem = (newItem) => {
    // In a real app, this would call an API
    console.log('Adding inventory item:', newItem);
    setShowForm(false);
  };

  return (
    <div className="list-container">
      <div className="list-header">
        <h2>Inventory</h2>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ Add Item'}
        </button>
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