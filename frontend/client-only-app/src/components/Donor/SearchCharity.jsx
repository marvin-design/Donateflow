import React, { useState } from 'react';
import axios from '../../utils/axios';
import { useNavigate } from 'react-router-dom'

const SearchCharity = () => {
  const [name, setName] = useState('');
  const [result, setResult] = useState(null);
  const navigate = useNavigate()

  const handleSearch = async () => {
    const token = localStorage.getItem('access_token');
    const res = await axios.get(`/api/donors/charity?name=${encodeURIComponent(name)}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setResult(res.data);
  };

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Charity Name" />
      <button onClick={handleSearch}>Search</button>
      {result && (
        <div className="charity-result">
          <h4>{result.name}</h4>
          <p>{result.description}</p>
          <p>ID: {result.id}</p>
          <button onClick={() => navigate(`/donate/${result.id}`)}>Donate</button>
          <button onClick={() => navigate(`/charities/${result.id}`)}>Learn More</button>
        </div>
      )}
    </div>
  );
};

export default SearchCharity;
