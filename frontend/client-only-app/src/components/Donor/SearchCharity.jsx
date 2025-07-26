import React, { useState } from 'react';
import axios from '../../utils/axios';
import { useNavigate } from 'react-router-dom';

const SearchCharity = () => {
  const [name, setName] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!name.trim()) {
      setError('Please enter a charity name');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('access_token');
      const res = await axios.get('/api/charity/search', {
        params: { q: name },
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data && res.data.length > 0) {
        setResult(res.data[0]);
      } else {
        setError('No charities found');
        setResult(null);
      }
    } catch (err) {
      console.error('Search error:', err);
      setError(err.response?.data?.error || 'Search failed');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  // New back button handler
  const handleBack = () => {
    navigate('/donors/dashboard/3'); // Adjust this path to match your donor route
  };

  return (
    <div className="search-container">
      {/* Back Button - Add at the top */}
      <button 
        onClick={handleBack}
        className="back-button"
        style={{
          marginBottom: '20px',
          padding: '8px 16px',
          background: '#f0f0f0',
          border: '1px solid #ccc',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        ← Back 
      </button>

      <div className="search-input-group">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter charity name"
          className="search-input"
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button 
          onClick={handleSearch}
          disabled={loading}
          className="search-button"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {result && (
        <div className="charity-result">
          <h4>{result.name}</h4>
          <p>{result.description}</p>
          <div className="action-buttons">
            <button 
              onClick={() => navigate(`/donate/${result.id}`)}
              className="donate-button"
            >
              Donate
            </button>
            <button 
              onClick={() => navigate(`/charities/${result.id}`)}
              className="details-button"
            >
              Learn More
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchCharity;