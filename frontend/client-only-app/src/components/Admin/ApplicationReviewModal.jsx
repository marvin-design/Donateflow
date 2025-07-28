import React, { useState } from "react";
import axios from "../../utils/axios";

function ApplicationReviewModal({ application, onClose, onSuccess }) {
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("adminToken");

  const handleAction = (action) => {
    axios
      .post(
        `/api/admin/charity_applications/${application.id}/review`,
        { action },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setMessage(res.data.message);
        onSuccess();
      })
      .catch((err) => {
        setMessage(err.response?.data?.error || "Action failed");
      });
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#ffffff",
        padding: "30px",
        zIndex: 1000,
        borderRadius: "12px",
        width: "100%",
        maxWidth: "450px",
        boxShadow: "0 0 20px rgba(0,0,0,0.15)",
        border: "1px solid #ddd",
      }}
    >
      <h5 className="fw-semibold text-dark mb-3">Review Application</h5>
      <p className="mb-1">
        <strong>Name:</strong> {application.charity_name}
      </p>
      <p className="mb-1">
        <strong>Email:</strong> {application.email}
      </p>
      <p className="mb-4">
        <strong>Status:</strong> {application.status}
      </p>

      <div className="d-flex justify-content-between mb-3">
        <button
          onClick={() => handleAction("approve")}
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
          Approve
        </button>

        <button
          onClick={() => handleAction("reject")}
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
          Reject
        </button>

        <button
          onClick={onClose}
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
          Close
        </button>
      </div>

      {message && (
        <div className="alert alert-info py-2 px-3 mb-0 rounded">{message}</div>
      )}
    </div>
  );
}

export default ApplicationReviewModal;
