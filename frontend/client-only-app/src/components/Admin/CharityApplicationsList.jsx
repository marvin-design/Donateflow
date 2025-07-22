import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ApplicationReviewModal from './ApplicationReviewModal';

function CharityApplicationsList() {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    axios.get('/api/admin/charity_applications', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setApplications(res.data.applications))
    .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Pending Charity Applications</h2>
      <table>
        <thead>
          <tr>
            <th>Charity Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app.id}>
              <td>{app.charity_name}</td>
              <td>{app.email}</td>
              <td>{app.status}</td>
              <td>
                <button onClick={() => setSelectedApp(app)}>Review</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedApp && (
        <ApplicationReviewModal
          application={selectedApp}
          onClose={() => setSelectedApp(null)}
          onSuccess={() => {
            setSelectedApp(null);
            axios.get('/api/admin/charity_applications', {
              headers: { Authorization: `Bearer ${token}` }
            }).then(res => setApplications(res.data.applications));
          }}
        />
      )}
    </div>
  );
}

export default CharityApplicationsList;
