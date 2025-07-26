import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './ErrorBoundary';

function DonationForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handleBack = () => {
    navigate('/donors/charities');
  };

  const handleAmountChange = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    setSelectedAmount(null);
    setCustomAmount(e.target.value);
  };

  const validatePhoneNumber = (number) => {
    const cleaned = number.replace(/\D/g, '');
    const kenyanRegex = /^(?:07\d{8}|01\d{8}|\+254[17]\d{8})$/;
    
    if (!kenyanRegex.test(cleaned)) {
      setPhoneError('Invalid Kenyan phone number');
      return false;
    }
    
    setPhoneError('');
    return true;
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    if (value) validatePhoneNumber(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAnonymous && !validatePhoneNumber(phoneNumber)) {
      toast.error(phoneError || "Please enter a valid phone number");
      return;
    }

    const amount = selectedAmount
      ? Number(selectedAmount)
      : parseFloat(customAmount);

    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid donation amount.");
      return;
    }

    const donationData = {
      amount,
      is_recurring: isRecurring,
      frequency: isRecurring ? frequency : null,
      is_anonymous: isAnonymous,
      charity_id: id,
      phone_number: isAnonymous ? null : phoneNumber.replace(/\D/g, '')
    };

    try {
      await axios.post("/api/donors/donations", donationData);
      toast.success("Donation successful! Redirecting...", {
        autoClose: 2000,
        onClose: () => navigate("/thank-you"),
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to process donation.");
    }
  };

  return (
    <ErrorBoundary>
      <div className="p-6 max-w-md mx-auto mt-10 bg-white rounded shadow">
        <button 
          onClick={handleBack}
          className="mb-4 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Charities
        </button>
        
        <h2 className="text-2xl font-semibold mb-4">Make a Donation</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Select Amount:</label>
            <div className="flex gap-3">
              {[100, 500, 1000].map((amt) => (
                <button
                  type="button"
                  key={amt}
                  className={`px-4 py-2 rounded border ${
                    selectedAmount === amt
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100'
                  }`}
                  onClick={() => handleAmountChange(amt)}
                >
                  Ksh {amt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Custom Amount (Ksh):</label>
            <input
              type="number"
              className="w-full border px-3 py-2 rounded"
              value={customAmount}
              onChange={handleCustomAmountChange}
              placeholder="Enter custom amount"
            />
          </div>

          {!isAnonymous && (
            <div>
              <label className="block font-medium mb-1">Phone Number:</label>
              <input
                type="tel"
                className={`w-full border px-3 py-2 rounded ${
                  phoneError ? 'border-red-500' : 'border-gray-300'
                }`}
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="e.g. 0712345678 or +254712345678"
                required={!isAnonymous}
              />
              {phoneError && (
                <p className="text-red-500 text-sm mt-1">{phoneError}</p>
              )}
            </div>
          )}

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isRecurring}
              onChange={() => setIsRecurring(!isRecurring)}
            />
            <label>Recurring Donation</label>
          </div>

          {isRecurring && (
            <div>
              <label className="block font-medium mb-1">Frequency:</label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Select frequency</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          )}

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={() => setIsAnonymous(!isAnonymous)}
            />
            <label>Donate anonymously</label>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Donate
          </button>
        </form>
        <ToastContainer position="top-center" />
      </div>
    </ErrorBoundary>
  );
}

export default DonationForm;