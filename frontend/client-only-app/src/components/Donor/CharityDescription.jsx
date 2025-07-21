import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CharityDescription() {
  const { id } = useParams();
  const [charity, setCharity] = useState(null);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {
    
    fetch(`/charities/${id}`)
      .then(res => res.json())
      .then(data => setCharity(data))
      .catch(err => console.error('Error fetching charity:', err));

   
    fetch(`/charities/${id}/beneficiaries`)
      .then(res => res.json())
      .then(data => setBeneficiaries(data))
      .catch(err => console.error('Error fetching beneficiaries:', err));

  
    fetch(`/charities/${id}/inventory_items`)
      .then(res => res.json())
      .then(data => setInventoryItems(data))
      .catch(err => console.error('Error fetching inventory items:', err));
  }, [id]);

  if (!charity) return <p className="p-4 text-gray-600">Loading charity details...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-2">{charity.name}</h2>
      <p className="text-gray-700 mb-4">{charity.description}</p>

     
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Beneficiary Stories</h3>
        {beneficiaries.length > 0 ? (
          <ul className="list-disc pl-5 space-y-2">
            {beneficiaries.map(b => (
              <li key={b.id}>
                <p><span className="font-medium">{b.name}</span>: {b.story}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No beneficiaries recorded yet.</p>
        )}
      </div>

     
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Inventory Usage History</h3>
        {inventoryItems.length > 0 ? (
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">Item Name</th>
                <th className="border px-4 py-2 text-left">Quantity</th>
                <th className="border px-4 py-2 text-left">Usage Description</th>
              </tr>
            </thead>
            <tbody>
              {inventoryItems.map(item => (
                <tr key={item.id}>
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">{item.quantity}</td>
                  <td className="border px-4 py-2">{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No inventory records available.</p>
        )}
      </div>
    </div>
  );
}

export default CharityDescription;
