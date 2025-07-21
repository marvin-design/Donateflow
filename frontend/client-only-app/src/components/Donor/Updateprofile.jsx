import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Updateprofile({ donorId, token }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [donations, setDonations] = useState([]);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    axios
      .get('/donations/recurring', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res.data;
        setDonations(data);
        const initialSelections = {};
        data.forEach((donation) => {
          initialSelections[donation.id] = donation.is_recurring;
        });
        setSelected(initialSelections);
      })
      .catch((err) => console.error(err));
  }, [token]);

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`/donor/${donorId}/profile`, { name, email }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        alert('Profile updated: ' + res.data.message);
      })
      .catch((err) => console.error('Profile update error:', err));
  };

  const handleCheckboxChange = (donationId) => {
    setSelected((prevSelected) => ({
      ...prevSelected,
      [donationId]: !prevSelected[donationId],
    }));
  };

  const handleUpdate = async () => {
    const updates = Object.entries(selected).map(([donationId, isRecurring]) => ({
      donation_id: donationId,
      is_recurring: isRecurring,
    }));

    try {
      await Promise.all(
        updates.map((update) =>
          axios.patch('/isrecurring', update, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
        )
      );
      alert('Recurring donations updated!');
    } catch (err) {
      console.error(err);
      alert('Update failed.');
    }
  };

  return (
    <div>
      <h2>Update Your Donor Profile</h2>
      <form onSubmit={handleProfileSubmit}>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Update Profile</button>
      </form>

      <hr />

      <div>
        <h3>Recurring Donations</h3>
        <form>
          {donations.map((donation) => (
            <div key={donation.id}>
              <label>
                <input
                  type="checkbox"
                  checked={selected[donation.id] || false}
                  onChange={() => handleCheckboxChange(donation.id)}
                />
                Donation ID: {donation.id} — {donation.amount} KES
              </label>
            </div>
          ))}
        </form>
        <button type="button" onClick={handleUpdate}>
          Update Recurring Donations
        </button>
      </div>
    </div>
  );
}

export default Updateprofile;
