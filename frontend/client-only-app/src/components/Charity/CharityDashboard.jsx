import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../utils/axios";

const CharityDashboard = () => {
  const [charityData, setCharityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [recentDonations, setRecentDonations] = useState([]);
  const [recentBeneficiaries, setRecentBeneficiaries] = useState([]);
  const [recentInventory, setRecentInventory] = useState([]);
  const navigate = useNavigate();
  const charityId = useRef();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      charityId.current = localStorage.getItem("user_id");

      if (!token || !charityId.current) {
        navigate("/login/charity");
        return;
      }

      try {
        const res = await axios.get(
          `/api/charity/dashboard/${charityId.current}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = res.data;

        setCharityData({
          ...data.charity,
          total_received: data.total_donations,
          current_funds: data.current_funds,
          total_donors: data.total_donors,
          total_beneficiaries: data.total_beneficiaries,
          total_stories: data.total_stories,
        });

        setLoading(false);
      } catch (err) {
        console.error("Failed to load dashboard:", err);
        setError("Failed to load dashboard.");
      }
    };

    fetchDashboardData();
  }, [navigate]);

  useEffect(() => {
    const fetchRecent = async (type, setter) => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          `/api/charity/charities/${charityId.current}/${type}?limit=3`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setter(res.data);
      } catch (err) {
        console.error(`Failed to fetch ${type}:`, err);
      }
    };

    fetchRecent("donations", setRecentDonations);
    fetchRecent("beneficiaries", setRecentBeneficiaries);
    fetchRecent("inventory_items", setRecentInventory);
  }, []);

  if (loading) return <p className="text-center mt-5">Loading dashboard...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;
  if (!charityData) return null;

  return (
    <div className="container py-5">
      <div className="mb-4">
        <h1 className="h2 fw-semibold text-dark mb-2">{charityData.name}</h1>
        <p className="text-muted">{charityData.description}</p>
      </div>

      {/* Stat Cards */}
      <div className="row g-4 mb-5">
        {[
          { label: "Total Received", value: charityData.total_received },
          { label: "Total Donors", value: charityData.total_donors },
          { label: "Beneficiaries", value: charityData.total_beneficiaries },
          { label: "Stories Published", value: charityData.total_stories },
          { label: "Current Funds", value: charityData.current_funds },
        ].map((stat, idx) => (
          <div className="col-md-4" key={idx}>
            <div className="border rounded p-4 bg-white shadow-sm text-center h-100">
              <div className="text-muted small mb-1">{stat.label}</div>
              <div className="h5 fw-bold text-dark">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-5">
        <div className="border rounded p-4 bg-white shadow-sm">
          <h4 className="mb-3">Quick Actions</h4>
          <div className="row g-3">
            {[
              {
                label: "Manage Beneficiaries",
                link: `/charity/${charityData.id}/beneficiaries`,
              },
              {
                label: "Manage Inventory",
                link: `/charity/${charityData.id}/inventory`,
              },
              { label: "Share a Story", link: "/charity/stories" },
              { label: "Update Profile", link: "/charity/profile" },
            ].map((action, i) => (
              <div className="col-sm-6 col-lg-3" key={i}>
                <Link
                  to={action.link}
                  className="btn w-100 fw-medium border rounded-pill py-2 px-3 text-center"
                  style={{
                    borderColor: "#f97316",
                    color: "#f97316",
                    backgroundColor: "transparent",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#f97316";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#f97316";
                  }}
                >
                  {action.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Sections */}
      <div className="row g-4">
        <div className="col-md-4">
          <div className="border rounded p-4 bg-white shadow-sm h-100">
            <h5 className="mb-3">Recent Donations</h5>
            {recentDonations.length > 0 ? (
              recentDonations.map((d) => (
                <div key={d.id} className="mb-3">
                  <div className="fw-bold">{d.donor?.name}</div>
                  <div className="text-muted small">{d.donation_date}</div>
                  <div className="text-success">KES {d.amount}</div>
                </div>
              ))
            ) : (
              <p className="text-muted">No donations yet.</p>
            )}
            <Link
              to={`/charity/${charityId.current}/donations`}
              className="d-block mt-2 text-decoration-none text-primary"
            >
              View More
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="border rounded p-4 bg-white shadow-sm h-100">
            <h5 className="mb-3">Beneficiaries</h5>
            {recentBeneficiaries.length > 0 ? (
              recentBeneficiaries.map((b) => (
                <div key={b.id} className="mb-2">
                  <div className="fw-bold">{b.name}</div>
                  <div className="text-muted">Location: {b.location}</div>
                </div>
              ))
            ) : (
              <p className="text-muted">No beneficiaries yet.</p>
            )}
            <Link
              to={`/charity/${charityId.current}/beneficiaries`}
              className="d-block mt-2 text-decoration-none text-primary"
            >
              View More
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="border rounded p-4 bg-white shadow-sm h-100">
            <h5 className="mb-3">Inventory</h5>
            {recentInventory.length > 0 ? (
              recentInventory.map((i) => (
                <div key={i.id} className="mb-2">
                  <div className="fw-bold">{i.item_name}</div>
                  <div className="text-muted small">
                    To: {i.beneficiary_name}
                  </div>
                  <div className="text-muted small">Amount: {i.amount}</div>
                  <div className="text-muted small">Sent: {i.sent_date}</div>
                </div>
              ))
            ) : (
              <p className="text-muted">No inventory yet.</p>
            )}
            <Link
              to={`/charity/${charityId.current}/inventory`}
              className="d-block mt-2 text-decoration-none text-primary"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharityDashboard;
