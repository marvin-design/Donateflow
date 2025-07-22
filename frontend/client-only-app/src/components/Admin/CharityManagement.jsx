import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CharityManagement() {
  const [charities, setCharities] = useState([]);
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    axios.get('/api/admin/dashboard', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      axios.get('/api/admin/charity_applications?status=approved', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(response => {
        const approved = response.data.applications || [];
        setCharities(approved);
      });
    });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/admin/charity/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      setCharities(prev => prev.filter(c => c.id !== id));
    })
    .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Approved Charities</h2>
      <ul>
        {charities.map(charity => (
          <li key={charity.id}>
            {charity.charity_name} - {charity.email}
            <button onClick={() => handleDelete(charity.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CharityManagement;
