import React, { useEffect, useState, useContext } from "react";
import axios from "../../utils/axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const DonorDashboard = () => {
  const [donations, setDonations] = useState([]);
  const { donorId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [donorName, setDonorName] = useState(localStorage.getItem("name") || "");
  const navigate = useNavigate();

  const { token } = useContext(AuthContext);
  const activeToken = token || localStorage.getItem("access_token");

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get(`/api/donors/dashboard/${donorId}`, {
          headers: {
            Authorization: `Bearer ${activeToken}`,
          },
        });
        setDonations(response.data.donations);

        // ✅ Correction: update localStorage with latest donor name
        if (response.data.donor?.name) {
          setDonorName(response.data.donor.name);
          localStorage.setItem("name", response.data.donor.name);
        }
      } catch (err) {
        setError(
          err.response?.data?.error || "Failed to fetch donation history"
        );
        console.error("Error fetching donations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [donorId, activeToken]);

  const totalAmount = donations.reduce(
    (sum, donation) => sum + parseFloat(donation.amount),
    0
  );
  const totalDonations = donations.length;
  const displayedDonations = showAll
    ? [...donations].reverse()
    : donations.slice(-2).reverse();

  const handleHome = () => {
    navigate("/");
  };

  if (loading)
    return <div className="text-center p-4 text-muted">Loading...</div>;
  if (error) return <div className="text-danger text-center p-4">{error}</div>;

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Welcome back{donorName ? `, ${donorName}` : ""}</h2>
          <p className="text-muted">
            Thank you for choosing to make a difference
          </p>
        </div>
        <button
          onClick={handleHome}
          className="btn fw-medium rounded-pill border shadow-sm px-4"
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
          🏠 Home
        </button>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-5">
        {[
          { label: "Total Donated", value: `KES ${totalAmount.toFixed(2)}` },
          { label: "Total Donations", value: totalDonations },
          { label: "Charities Supported", value: "Coming soon..." },
        ].map((stat, i) => (
          <div className="col-md-4" key={i}>
            <div className="border rounded p-4 bg-white shadow-sm text-center h-100">
              <div className="text-muted small mb-1">{stat.label}</div>
              <div className="h5 fw-bold text-dark">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Donations */}
      <div className="mb-5">
        <div className="border rounded p-4 bg-white shadow-sm">
          <h4 className="mb-3">Recent Donations</h4>
          {donations.length === 0 ? (
            <p className="text-muted">No donations found.</p>
          ) : (
            <>
              <ul className="list-group mb-3">
                {displayedDonations.map((donation) => (
                  <li
                    key={donation.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>KES {donation.amount}</strong>
                      <br />
                      <small className="text-muted">
                        {donation.donation_date}
                      </small>
                    </div>
                    <span className="badge bg-success">✓</span>
                  </li>
                ))}
              </ul>
              {donations.length > 2 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="btn btn-outline-warning btn-sm rounded-pill px-3"
                  style={{
                    borderColor: "#f97316",
                    color: "#f97316",
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
                  {showAll ? "Show Less" : "View All Donations"}
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-3">
        <div className="border rounded p-4 bg-white shadow-sm">
          <h4 className="mb-3">Quick Actions</h4>
          <div className="row g-3">
            {[
              { text: "Browse Charities", path: "/donors/charities" },
              { text: "Read Impact Stories", path: "/charity/stories/feed" },
              { text: "Search a Charity", path: "/search-charities" },
              {
                text: "Manage Profile & Settings",
                path: "/donors/profile/update",
              },
              {
                text: "Update Recurring Donations",
                path: "/donors/recurring-donations",
              },
            ].map((link, i) => (
              <div className="col-sm-6 col-lg-4" key={i}>
                <Link
                  to={link.path}
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
                  {link.text}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
