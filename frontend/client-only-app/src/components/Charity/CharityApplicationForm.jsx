import React, { useState } from 'react';

const CharityApplicationForm = () => {
  const [formData, setFormData] = useState({
    charity_name: '',
    email: '',
    description: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const response = await fetch('/api/charity/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          charity_name: formData.charity_name,
          email: formData.email,
          description: formData.description,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      
      localStorage.setItem('charity_application', JSON.stringify(data));
      setMessage('Application submitted successfully!');

      setFormData({
        charity_name: '',
        email: '',
        description: '',
        password: '',
        confirmPassword: ''
      });

    } catch (err) {
      console.error(err);
      setMessage(err.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Apply as a Charity</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Charity Name</label>
          <input
            type="text"
            name="charity_name"
            value={formData.charity_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn-primary">Submit Application</button>
      </form>

      {message && (
        <div className="form-message">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default CharityApplicationForm;
