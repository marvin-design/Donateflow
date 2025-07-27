import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { useParams, Link, useNavigate } from "react-router-dom";

const DonorDashboard = () => {
  const [donations, setDonations] = useState([]);
  const { donorId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/donors/dashboard/${donorId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDonations(response.data.donations);
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
  }, [donorId]);

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
    <div
      className="min-vh-100 px-4 py-5"
      style={{
        background: "linear-gradient(135deg, #f97316, #ea730c)",
        color: "#fff",
      }}
    >
      <div className="container bg-white text-dark p-4 rounded shadow-lg animate__animated animate__fadeIn">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold">Welcome back</h2>
            <p className="text-muted">
              Thank you for choosing to make a difference
            </p>
          </div>
          <button
            onClick={handleHome}
            className="btn btn-outline-primary rounded-pill shadow-sm"
          >
            🏠 Home
          </button>
        </div>

        {/* Stats Cards */}
        <div className="row text-center mb-5">
          <div className="col-md-4 mb-3">
            <div className="bg-light p-4 rounded shadow-sm h-100 hover-shadow transition-all">
              <h5>Total Donated</h5>
              <p className="fw-bold text-success">
                KES {totalAmount.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="bg-light p-4 rounded shadow-sm h-100 hover-shadow transition-all">
              <h5>Total Donations</h5>
              <p className="fw-bold">{totalDonations}</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="bg-light p-4 rounded shadow-sm h-100 hover-shadow transition-all">
              <h5>Charities Supported</h5>
              <p className="text-muted">Coming soon...</p>
            </div>
          </div>
        </div>

        {/* Recent Donations */}
        <div className="mb-4">
          <h4 className="mb-3">Recent Donations</h4>
          {donations.length === 0 ? (
            <p className="text-muted">No donations found.</p>
          ) : (
            <>
              <ul className="list-group mb-3">
                {displayedDonations.map((donation) => (
                  <li
                    key={donation.id}
                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center transition-all"
                    style={{ cursor: "pointer" }}
                    title="Donation details"
                  >
                    <div>
                      <strong>KES {donation.amount}</strong>
                      <br />
                      <small className="text-muted">
                        {new Date(donation.donation_date).toLocaleDateString()}
                      </small>
                    </div>
                    <span className="badge bg-primary-subtle text-primary">
                      ✓
                    </span>
                  </li>
                ))}
              </ul>
              {donations.length > 2 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="btn btn-sm btn-outline-warning"
                >
                  {showAll ? "Show Less" : "View All Donations"}
                </button>
              )}
            </>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mb-3">
          <h4 className="mb-3">Quick Actions</h4>
          <ul className="list-group">
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
              <li
                key={i}
                className="list-group-item d-flex justify-content-between align-items-center hover-bg-light transition-all"
              >
                <Link
                  to={link.path}
                  className="text-decoration-none text-primary fw-semibold"
                >
                  {link.text}
                </Link>
                <i className="bi bi-chevron-right text-muted"></i>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
