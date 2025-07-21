import React, { useState } from 'react';
import './styles/CharityApplicationForm.css';

const CharityApplicationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    charity_name: '',
    email: '',
    description: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="charity-application-form" onSubmit={handleSubmit}>
      <h2>Apply as a Charity</h2>
      {/* Form fields */}
    </form>
  );
};

export default CharityApplicationForm;