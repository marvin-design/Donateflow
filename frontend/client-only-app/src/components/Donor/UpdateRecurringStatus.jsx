import React, { useState, useContext } from 'react';
import axios from '../../utils/axios';
import { AuthContext } from '../../context/AuthContext';  

const UpdateRecurringStatus = () => {
  const [form, setForm] = useState({
    donation_id: '',
    is_recurring: true,
    frequency: ''
  });

  const { token } = useContext(AuthContext);
  const activeToken = token || localStorage.getItem('access_token');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    //const token = localStorage.getItem('access_token');
    await axios.patch('/api/donors/isrecurring', form, {
      headers: { Authorization: `Bearer ${activeToken}` }
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
