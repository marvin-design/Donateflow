import React, { useEffect, useState, useContext } from "react";
import axios from "../../utils/axios";
import CharityApplicationsList from "./CharityApplicationsList";
import CharityManagement from "./CharityManagement";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const {token, logout} = useContext(AuthContext);
  //const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();
  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    axios
      .get("/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${token|| adminToken}` },
      })
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-end mb-4">
        <button
          onClick={handleLogout}
          className="btn btn-sm rounded-pill px-4 fw-medium shadow-sm"
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
          Logout
        </button>
      </div>

      <h1 className="h3 fw-semibold text-dark mb-4">Admin Dashboard</h1>

      {stats && (
        <div className="row g-4 mb-5">
          <div className="col-md-3">
            <div className="border rounded p-4 bg-white shadow-sm text-center h-100">
              <div className="text-muted small mb-1">Total Charities</div>
              <div className="h5 fw-bold text-dark">
                {stats.total_charities}
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="border rounded p-4 bg-white shadow-sm text-center h-100">
              <div className="text-muted small mb-1">Total Donors</div>
              <div className="h5 fw-bold text-dark">{stats.total_donors}</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="border rounded p-4 bg-white shadow-sm text-center h-100">
              <div className="text-muted small mb-1">Total Donations</div>
              <div className="h5 fw-bold text-dark">
                {stats.total_donations}
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="border rounded p-4 bg-white shadow-sm text-center h-100">
              <div className="text-muted small mb-1">Total Amount</div>
              <div className="h5 fw-bold text-success">
                Ksh {stats.total_amount}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-5">
        <CharityApplicationsList />
      </div>

      <div className="mb-5">
        <CharityManagement />
      </div>
    </div>
  );
}

export default AdminDashboard;
