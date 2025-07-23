import React, { useState } from 'react';
import axios from "../../utils/axios";

function ApplicationReviewModal({ application, onClose, onSuccess }) {
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('adminToken');

  const handleAction = (action) => {
    axios.post(`/api/admin/charity_applications/${application.id}/review`, { action }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setMessage(res.data.message);
      onSuccess();
    })
    .catch(err => {
      setMessage(err.response?.data?.error || 'Action failed');
    });
  };

  return (
    <div>
      <h3>Review Application</h3>
      <p>Name: {application.charity_name}</p>
      <p>Email: {application.email}</p>
      <p>Status: {application.status}</p>
      <button onClick={() => handleAction('approve')}>Approve</button>
      <button onClick={() => handleAction('reject')}>Reject</button>
      <button onClick={onClose}>Close</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ApplicationReviewModal;
