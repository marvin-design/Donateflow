import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function CharityList() {
  const [charities, setCharities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/charities') 
      .then(res => res.json())
      .then(data => setCharities(data))
      .catch(err => console.error('Error fetching charities:', err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Available Charities</h2>
      {charities.map(charity => (
        <div
          key={charity.id}
          className="border rounded p-4 mb-4 shadow-md flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">#{charity.id} - {charity.name}</p>
          </div>
          <div className="flex gap-2">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              onClick={() => navigate(`/charities/${charity.id}`)}
            >
              Learn More
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
              onClick={() => navigate(`/donate/${charity.id}`)}
            >
              Donate
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CharityList;
