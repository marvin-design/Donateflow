import React, { useState } from 'react';

const CharityApplicationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    charity_name: '',
    email: '',
    description: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    onSubmit(formData);
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
    </div>
  );
};

export default CharityApplicationForm;