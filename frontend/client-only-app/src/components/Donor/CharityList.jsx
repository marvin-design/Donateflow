import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';

const CharityList = () => {
  const [charities, setCharities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharities = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('/api/donors/charities', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCharities(response.data.charities || response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load charities');
        console.error('Error fetching charities:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharities();
  }, []);

  if (loading) return <div className="loading-spinner">Loading charities...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (charities.length === 0) return <div className="no-charities">No charities found</div>;

  return (
    <div className="charity-list-container">
      <h2 className="charity-list-title">Available Charities</h2>
      
      <div className="charities-grid">
        {charities.map(charity => (
          <div key={charity.id} className="charity-card">
            <div className="charity-info">
              <h3 className="charity-name">{charity.name}</h3>
              <p className="charity-description">{charity.description}</p>
              <p className="charity-id">ID: {charity.id}</p>
            </div>
            
            <div className="charity-actions">
              <button
                className="details-button"
                onClick={() => navigate(`/api/donors/charities/${charity.id}`)}
              >
                Learn More
              </button>
              <button
                className="donate-button"
                onClick={() => navigate(`/api/donors/donate/${charity.id}`)}
              >
                Donate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharityList;