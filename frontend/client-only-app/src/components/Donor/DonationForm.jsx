import React, { useState } from 'react';
import axios from '../../utils/axios';
import { useNavigate } from 'react-router-dom';

const DonationForm = ({ charityId }) => {
  const [form, setForm] = useState({
    amount: '',
    charity_id: charityId || '',
    payment_method: 'mpesa',
    is_recurring: false,
    frequency: '',
    is_anonymous: false,
    phone: '',
    email: '',
    name: ''
  });

  const [selectedAmount, setSelectedAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [donationId, setDonationId] = useState(null);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const donationOptions = [500, 1000, 5000];

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePredefinedAmount = (amount) => {
    setSelectedAmount(amount === selectedAmount ? null : amount);
    setForm(prev => ({ ...prev, amount: amount === selectedAmount ? '' : amount.toString() }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setStatus('');

    if (!form.amount || Number(form.amount) < 10) {
      setError('Please enter a valid amount (min KSh 10)');
      setLoading(false);
      return;
    }

    if (form.payment_method === 'mpesa' && !/^07\d{8}$/.test(form.phone)) {
      setError('Enter a valid Safaricom number (07XXXXXXXX)');
      setLoading(false);
      return;
    }

    try {
      // Step 1: Submit donation record
      const { data } = await axios.post('/donations', form);
      setDonationId(data.donation_id);

      if (form.payment_method === 'mpesa') {
        // Step 2: Trigger M-Pesa STK Push
        await axios.post('/api/mpesa/donate', {
          phone: form.phone.replace(/^0/, '254'), // 07XXXXXXXX -> 2547XXXXXXXX
          amount: form.amount,
          charity_id: form.charity_id,
          donor_id: data.donor_id || null
        });

        setStatus('pending');

        // Step 3: Poll for payment status
        const interval = setInterval(async () => {
          try {
            const res = await axios.get(`/api/mpesa/donation/${data.donation_id}/status`);
            if (res.data.status !== 'pending') {
              setStatus(res.data.status);
              clearInterval(interval);
            }
          } catch (err) {
            console.error(err);
            setError('Error checking M-Pesa status');
            clearInterval(interval);
          }
        }, 5000);
      } else {
        alert('Donation submitted successfully!');
        navigate('/donation-success');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Donation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="donation-form-container">
      <h1>Make a Donation</h1>
      <p>Every contribution makes a difference.</p>

      {error && <div className="error-message">{error}</div>}

      {status === 'completed' && (
        <div className="alert alert-success">
          <p>Payment successful! Thank you for your donation.</p>
          <p>Transaction ID: {donationId}</p>
        </div>
      )}

      {status === 'failed' && (
        <div className="alert alert-danger">
          <p>Payment failed. Please try again.</p>
        </div>
      )}

      {status === 'pending' && (
        <div className="alert alert-info">
          <p>Waiting for M-Pesa confirmation... Check your phone.</p>
        </div>
      )}

      {!status && (
        <form onSubmit={handleSubmit} className="donation-form">
          {!charityId && (
            <div className="form-group">
              <label>Charity ID</label>
              <input
                type="number"
                name="charity_id"
                value={form.charity_id}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Donation Amount</label>
            <div className="amount-options">
              {donationOptions.map(amount => (
                <button
                  key={amount}
                  type="button"
                  className={selectedAmount === amount ? 'selected' : ''}
                  onClick={() => handlePredefinedAmount(amount)}
                >
                  KSh {amount}
                </button>
              ))}
            </div>
            <input
              type="number"
              name="amount"
              placeholder="Or enter custom amount"
              value={selectedAmount ? '' : form.amount}
              onChange={handleChange}
              min="10"
              required
            />
          </div>

          <div className="form-group">
            <label>Payment Method</label>
            <select name="payment_method" value={form.payment_method} onChange={handleChange} required>
              <option value="mpesa">M-Pesa</option>
              <option value="card">Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>

          <div className="form-group">
            <label>M-Pesa Phone (07XXXXXXXX)</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required={form.payment_method === 'mpesa'}
            />
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="is_anonymous"
                checked={form.is_anonymous}
                onChange={handleChange}
              />
              Donate anonymously
            </label>
          </div>

          {!form.is_anonymous && (
            <>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label>Recurring Donation?</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="is_recurring"
                  checked={!form.is_recurring}
                  onChange={() => setForm(prev => ({ ...prev, is_recurring: false, frequency: '' }))}
                />
                One-time
              </label>
              <label>
                <input
                  type="radio"
                  name="is_recurring"
                  checked={form.is_recurring}
                  onChange={() => setForm(prev => ({ ...prev, is_recurring: true }))}
                />
                Recurring
              </label>
            </div>
          </div>

          {form.is_recurring && (
            <div className="form-group">
              <label>Frequency</label>
              <select name="frequency" value={form.frequency} onChange={handleChange} required>
                <option value="">Select frequency</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Donate Now'}
          </button>
        </form>
      )}
    </div>
  );
};

export default DonationForm;
