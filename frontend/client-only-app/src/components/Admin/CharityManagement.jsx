import React, { useEffect, useState } from 'react';
import axios from "../../utils/axios";

function CharityManagement() {
  const [charities, setCharities] = useState([]);
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    axios.get('/api/admin/charities', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      const approved = response.data.charities || [];
      setCharities(approved);
    }).catch(err => console.error(err));
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
            {charity.name} - {charity.email}
            <button onClick={() => handleDelete(charity.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CharityManagement;
