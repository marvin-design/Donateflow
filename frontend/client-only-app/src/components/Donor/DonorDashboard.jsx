import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { useParams, Link, useNavigate } from "react-router-dom";

const DonorDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [donorName, setDonorName] = useState(""); // 👈 For dynamic name
  const { donorId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/donors/dashboard/${donorId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDonations(response.data.donations || []);
        setDonorName(response.data.name || "Donor");
      } catch (err) {
        setError(
          err.response?.data?.error || "Failed to fetch donation history"
        );
        console.error("Error fetching donations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [donorId]);

  const totalAmount = donations.reduce(
    (sum, donation) => sum + parseFloat(donation.amount),
    0
  );
  const totalDonations = donations.length;
  const displayedDonations = showAll
    ? [...donations].reverse()
    : donations.slice(-3).reverse();

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
            <h2 className="fw-bold">Welcome back, {donorName}!</h2>
            <p className="text-muted">
              Thank you for making a difference in girls' education
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
            <div className="bg-light p-4 rounded shadow-sm h-100">
              <h5>Total Donated</h5>
              <p className="fw-bold text-success">${totalAmount.toFixed(0)}</p>
              <small className="text-muted">Lifetime donations</small>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="bg-light p-4 rounded shadow-sm h-100">
              <h5>Total Donations</h5>
              <p className="fw-bold">{totalDonations}</p>
              <small className="text-muted">Individual donations</small>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="bg-light p-4 rounded shadow-sm h-100">
              <h5>Organizations Supported</h5>
              <p className="fw-bold">3</p>
              <small className="text-muted">Charities</small>
            </div>
          </div>
        </div>

        {/* Recent Donations */}
        <div className="mb-5">
          <div className="border rounded p-4 bg-white shadow-sm">
            <h4 className="mb-3">Recent Donations</h4>
            <p className="text-muted">Your latest contributions</p>
            {donations.length === 0 ? (
              <p className="text-muted">No donations found.</p>
            ) : (
              <>
                <ul className="list-group mb-3">
                  {displayedDonations.map((donation) => (
                    <li
                      key={donation.id}
                      className="list-group-item list-group-item-action p-3"
                    >
                      <div className="d-flex justify-content-between">
                        <div>
                          <strong>
                            {donation.charity_name || "Donation"}
                          </strong>
                          <br />
                          <small className="text-muted">
                            {new Date(
                              donation.donation_date
                            ).toLocaleDateString()}
                          </small>
                        </div>
                        <div className="text-end">
                          <small className="text-muted d-block">
                            {donation.payment_method}
                          </small>
                          <strong>${donation.amount}</strong>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="text-end">
                  <Link to="/donations" className="text-primary">
                    View All Donations
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

        <hr className="my-4" />

        {/* Subscriptions */}
        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <div className="bg-light p-3 rounded text-center">
              <h5>Subscriptions</h5>
              <p className="fw-bold">2</p>
              <small className="text-muted">Active subscriptions</small>
            </div>
          </div>
        </div>

        {/* Quick Actions as Tiles */}
        <div className="mb-4">
          <div className="border rounded p-4 bg-white shadow-sm">
            <h4 className="mb-3">Quick Actions</h4>
            <p className="text-muted">Manage your donations and settings</p>
            <div className="d-flex flex-wrap gap-3 justify-content-start">
              {[
                { text: "❤️ Browse Charities", path: "/donors/charities" },
                { text: "📖 Read Impact Stories", path: "/charity/stories/feed" },
                { text: "🔍 Search a Charity", path: "/search-charities" },
                {
                  text: "⚙️ Manage Profile & Settings",
                  path: "/donors/profile/update",
                },
                {
                  text: "🔁 Update Recurring Donations",
                  path: "/donors/recurring-donations",
                },
              ].map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="text-decoration-none"
                  style={{
                    width: "220px",
                    height: "110px",
                    border: "2px solid #f97316",
                    borderRadius: "20px",
                    color: "#f97316",
                    backgroundColor: "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "500",
                    textAlign: "center",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#f97316";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.boxShadow =
                      "0 4px 10px rgba(0,0,0,0.1)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#f97316";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
