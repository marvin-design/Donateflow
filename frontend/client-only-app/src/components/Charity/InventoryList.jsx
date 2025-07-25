import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddInventoryItemForm from './AddInventoryItemForm';
import axios from '../../utils/axios'; // <-- Adjust this path if necessary

const InventoryList = () => {
  const [inventory, setInventory] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

const token = localStorage.getItem('token');
const charityId = localStorage.getItem('user_id');

  useEffect(() => {
    if (!token || !charityId) {
      navigate('/login/charity');
      return;
    }

    const fetchData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`
        };

        const [itemsRes, beneficiariesRes] = await Promise.all([
          axios.get(`/api/charity/${charityId}/inventory_items`, { headers }),
          axios.get(`/api/charity/${charityId}/beneficiaries`, { headers })
        ]);

        setInventory(itemsRes.data);
        setBeneficiaries(beneficiariesRes.data);
        setLoading(false);

      } catch (err) {
        console.error(err);
        navigate('/login/charity');
      }
    };

    fetchData();
  }, [charityId, token, navigate]);

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
            onClick={() => navigate(`/charity/dashboard/${charityId.id}`)}
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
