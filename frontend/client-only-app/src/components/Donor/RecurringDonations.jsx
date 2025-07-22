import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';

const RecurringDonations = () => {
  const [recurring, setRecurring] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    axios.get('/api/donors/donations/recurring', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setRecurring(res.data));
  }, []);

  return (
    <div>
      <h3>Recurring Donations</h3>
      <ul>
        {recurring.map(d => (
          <li key={d.id}>
            ${d.amount} to charity #{d.charity_id} every {d.frequency}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecurringDonations;
