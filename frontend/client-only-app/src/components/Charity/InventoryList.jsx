import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddInventoryItemForm from './AddInventoryItemForm';

const InventoryList = () => {
  const [inventory, setInventory] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem('access_token');
  const charity = JSON.parse(localStorage.getItem('logged_in_charity'));

  useEffect(() => {
    if (!token || !charity?.id) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
      
        const [itemsRes, beneficiariesRes] = await Promise.all([
          fetch(`/api/charity/${charity.id}/inventory_items`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch(`/api/charity/${charity.id}/beneficiaries`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        const items = await itemsRes.json();
        const beneficiaries = await beneficiariesRes.json();

        if (!itemsRes.ok || !beneficiariesRes.ok) {
          throw new Error(items.error || beneficiaries.error || 'Fetch error');
        }

        setInventory(items);
        setBeneficiaries(beneficiaries);
        setLoading(false);

      } catch (err) {
        console.error(err);
        navigate('/login');
      }
    };

    fetchData();
  }, [charity?.id, token, navigate]);

  const handleAddItem = (newItem) => {
    setInventory(prev => [...prev, newItem]);
    setShowForm(false);
  };

  if (loading) return <p>Loading inventory...</p>;

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
        {inventory.length > 0 ? (
          inventory.map((item, index) => (
            <div key={index} className="list-item">
              <h3>{item.item_name} (x{item.amount})</h3>
              <p>Assigned to: {
                beneficiaries.find(b => b.id === item.beneficiary_id)?.name || 'Unknown'
              }</p>
              <p>Sent on: {item.sent_date}</p>
            </div>
          ))
        ) : (
          <p>No inventory items found.</p>
        )}
      </div>
    </div>
  );
};

export default InventoryList;
