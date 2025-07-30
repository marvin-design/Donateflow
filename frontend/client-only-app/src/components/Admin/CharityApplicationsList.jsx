import React, { useEffect, useState, useContext } from "react";
import axios from "../../utils/axios";
import ApplicationReviewModal from "./ApplicationReviewModal";
import { AuthContext } from "../../context/AuthContext";

function CharityApplicationsList() {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const { token } = useContext(AuthContext);
  //const token = localStorage.getItem("adminToken");
  const adminToken = localStorage.getItem("adminToken");
  useEffect(() => {
    axios
      .get("/api/admin/charity_applications?status=pending", {
        headers: { Authorization: `Bearer ${token || adminToken}` },
      })
      .then((res) => setApplications(res.data.applications))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="mb-5">
      <h5 className="fw-semibold text-dark mb-3">
        Pending Charity Applications
      </h5>
      <div className="table-responsive">
        <table className="table table-hover align-middle table-bordered">
          <thead className="table-light">
            <tr>
              <th>Charity Name</th>
              <th>Email</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.charity_name}</td>
                <td>{app.email}</td>
                <td>{app.description}</td>
                <td>
                  <span className="badge bg-warning text-dark text-capitalize">
                    {app.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => setSelectedApp(app)}
                    className="btn btn-sm rounded-pill px-3 fw-medium shadow-sm"
                    style={{
                      borderColor: "#f97316",
                      color: "#f97316",
                      backgroundColor: "transparent",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#f97316";
                      e.currentTarget.style.color = "#ffffff";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#f97316";
                    }}
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedApp && (
        <ApplicationReviewModal
          application={selectedApp}
          onClose={() => setSelectedApp(null)}
          onSuccess={() => {
            setSelectedApp(null);
            axios
              .get("/api/admin/charity_applications?status=pending", {
                headers: { Authorization: `Bearer ${token}` },
              })
              .then((res) => setApplications(res.data.applications));
          }}
        />
      )}
    </div>
  );
}

export default CharityApplicationsList;
