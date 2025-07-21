import React, { useState } from 'react';

const AddInventoryItemForm = ({ beneficiaries, onAdd }) => {
  const [formData, setFormData] = useState({
    item_name: '',
    amount: 1,
    beneficiary_id: beneficiaries[0]?.id || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      item_name: '',
      amount: 1,
      beneficiary_id: beneficiaries[0]?.id || ''
    });
  };

  return (
    <div className="form-container">
      <h3>Add Inventory Item</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Item Name</label>
          <input
            type="text"
            name="item_name"
            value={formData.item_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            min="1"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Beneficiary</label>
          <select
            name="beneficiary_id"
            value={formData.beneficiary_id}
            onChange={handleChange}
            required
          >
            {beneficiaries.map(beneficiary => (
              <option key={beneficiary.id} value={beneficiary.id}>
                {beneficiary.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn-primary">Add Item</button>
      </form>
    </div>
  );
};

export default AddInventoryItemForm;