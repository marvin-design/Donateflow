import React, { useState } from 'react';

function DonationForm() {
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [charity_id, setCharityid] = useState('');

  const donationOptions = [5000, 10000, 20000];

  const handlePredefinedAmountClick = (amount) => {
    if (selectedAmount === amount) {
      setSelectedAmount(null);
    } else {
      setSelectedAmount(amount);
      setCustomAmount('');
    }
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const amount = selectedAmount || customAmount;

    
    if (!charity_id || isNaN(charity_id) || Number(charity_id) <= 0) {
      alert('Please enter a valid numeric Charity ID');
      return;
    }

    if (!amount || Number(amount) <= 0) {
      alert('Please enter a valid donation amount');
      return;
    }

    const phoneRegex = /^07\d{8}$/;
    if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
      alert('Please enter a valid Safaricom phone number (e.g. 07XXXXXXXX)');
      return;
    }

    const donationData = {
      amount: Number(amount),
      is_recurring: isRecurring,
      frequency: isRecurring ? frequency : null,
      is_anonymous: isAnonymous,
      payment_method: 'mpesa',
      charity_id: Number(charity_id),
      phone: phoneNumber,
      email: isAnonymous ? null : email,
      name: isAnonymous ? null : name
    };

    try {
      const response = await fetch('/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(donationData)
      });

      const result = await response.json();
      if (response.ok) {
        alert('M-Pesa prompt sent to your phone!');
        console.log(result);

      
        setIsRecurring(false);
        setFrequency('');
        setIsAnonymous(false);
        setSelectedAmount(null);
        setCustomAmount('');
        setPhoneNumber('');
        setEmail('');
        setName('');
        setCharityid('');
      } else {
        alert(result.msg || 'Failed to process donation');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing your donation.');
    }
  };

  return (
    <div>
      <h1>Make a Donation</h1>
      <p>Every contribution makes a difference</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="charity_id">Please enter the number that belongs to the charity you want to donate to</label>
          <input
            id="charity_id"
            type="number"
            name="charity_id"
            value={charity_id}
            onChange={(e) => setCharityid(e.target.value)}
            min="1"
            required
          />
        </div>

        <p>Donation Type</p>
        <label>
          <input
            type="radio"
            name="donationType"
            value="onetime"
            checked={!isRecurring}
            onChange={() => {
              setIsRecurring(false);
              setFrequency('');
            }}
          />
          One-Time
        </label>
        <label>
          <input
            type="radio"
            name="donationType"
            value="recurring"
            checked={isRecurring}
            onChange={() => setIsRecurring(true)}
          />
          Recurring
        </label>

        {isRecurring && (
          <div>
            <label>
              <input
                type="radio"
                name="frequency"
                value="weekly"
                checked={frequency === 'weekly'}
                onChange={(e) => setFrequency(e.target.value)}
              />
              Weekly
            </label>
            <label>
              <input
                type="radio"
                name="frequency"
                value="monthly"
                checked={frequency === 'monthly'}
                onChange={(e) => setFrequency(e.target.value)}
              />
              Monthly
            </label>
          </div>
        )}

        <p>Donation Amount</p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {donationOptions.map((amount) => (
            <button
              type="button"
              key={amount}
              onClick={() => handlePredefinedAmountClick(amount)}
              style={{
                padding: '10px',
                border: selectedAmount === amount ? '2px solid green' : '1px solid gray',
                backgroundColor: selectedAmount === amount ? '#e0ffe0' : 'white',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              sh.{amount.toLocaleString()}
            </button>
          ))}
        </div>

        <div style={{ marginTop: '10px' }}>
          <label>Custom amount:</label>
          <input
            type="number"
            name="customAmount"
            value={customAmount}
            onChange={handleCustomAmountChange}
          />
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
            />
            Make this donation anonymous
          </label>
        </div>

        {!isAnonymous && (
          <div>
            <p>Donor Information</p>
            <label>Email Address</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <p>Payment Method</p>
        <label>Enter M-Pesa phone number</label>
        <input
          type="text"
          name="number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="07XXXXXXXX"
        />

        <br />
        <button type="submit">Donate</button>
      </form>
    </div>
  );
}

export default DonationForm;
