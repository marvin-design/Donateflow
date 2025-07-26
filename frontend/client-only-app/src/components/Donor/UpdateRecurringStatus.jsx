import React, { useState } from 'react';
import axios from '../../utils/axios';

const UpdateRecurringStatus = () => {
  const [form, setForm] = useState({
    donation_id: '',
    is_recurring: true,
    frequency: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    await axios.patch('/api/donors/isrecurring', form, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert('Recurring status updated');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="donation_id" value={form.donation_id} onChange={handleChange} placeholder="Donation ID" required />
      <input name="frequency" value={form.frequency} onChange={handleChange} placeholder="Frequency (e.g. monthly)" />
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateRecurringStatus;
