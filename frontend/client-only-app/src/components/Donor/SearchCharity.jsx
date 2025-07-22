import React, { useState } from 'react';
import axios from '../../api/axios';

const SearchCharity = () => {
  const [name, setName] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = async () => {
    const token = localStorage.getItem('access_token');
    const res = await axios.get(`/charity?name=${encodeURIComponent(name)}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setResult(res.data);
  };

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Charity Name" />
      <button onClick={handleSearch}>Search</button>
      {result && <p>Found: {result.name} (ID: {result.id})</p>}
    </div>
  );
};

export default SearchCharity;
