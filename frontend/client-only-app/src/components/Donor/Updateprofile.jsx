import React, { useState, useEffect } from "react";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";

const UpdateDonorProfile = ({ donorId }) => {
  const [profileForm, setProfileForm] = useState({ name: "", email: "" });
  const [donations, setDonations] = useState([]);
  const [recurringSelections, setRecurringSelections] = useState({});
  const [loading, setLoading] = useState({
    profile: false,
    donations: false,
    updates: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const donorId = localStorage.getItem('user_id')
    const fetchData = async () => {
      try {
        setLoading((prev) => ({ ...prev, donations: true }));

        const profileResponse = await axios.get(
          `/api/donors/${donorId}/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProfileForm({
          name: profileResponse.data.name || "",
          email: profileResponse.data.email || "",
        });

        const donationsResponse = await axios.get(
          "/api/donors/donations/recurring",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setDonations(donationsResponse.data);

        const initialSelections = {};
        donationsResponse.data.forEach((d) => {
          initialSelections[d.id] = d.is_recurring;
        });
        setRecurringSelections(initialSelections);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load profile data");
      } finally {
        setLoading((prev) => ({ ...prev, donations: false }));
      }
    };

    fetchData();
  }, [donorId]);

  const handleBack = () => navigate("/donors/dashboard/3");

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRecurringToggle = (id) => {
    setRecurringSelections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading((prev) => ({ ...prev, profile: true }));
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem('token');
      const donorId = localStorage.getItem('user_id')
      await axios.patch(`/api/donors/${donorId}/profile`, profileForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update profile");
    } finally {
      setLoading((prev) => ({ ...prev, profile: false }));
    }
  };

  const handleRecurringUpdate = async () => {
    setLoading((prev) => ({ ...prev, updates: true }));
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem('token');
      const donorId = localStorage.getItem('user_id')
      const updates = Object.entries(recurringSelections).map(([id, isRecurring]) => ({
        donation_id: id,
        is_recurring: isRecurring
      }));

      await Promise.all(
        updates.map((update) =>
          axios.patch("/api/donors/donations/recurring", update, {
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );

      setSuccess("Recurring donations updated successfully!");
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to update recurring donations"
      );
    } finally {
      setLoading((prev) => ({ ...prev, updates: false }));
    }
  };

  if (loading.donations)
    return <div className="text-center mt-5">Loading profile data...</div>;

  return (
    <div className="min-vh-100 py-5" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container d-flex justify-content-center">
        <div
          className="bg-white p-5 rounded-4 shadow w-100"
          style={{ maxWidth: "700px" }}
        >
          <button
            onClick={handleBack}
            className="btn btn-outline-dark mb-4"
            style={{
              borderColor: "#f97316",
              color: "#f97316",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f97316";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#f97316";
            }}
          >
            ← Back
          </button>

          <h3 className="text-center mb-4 fw-bold" style={{ color: "#f97316" }}>
            Update Your Profile
          </h3>

          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          {/* Profile Form */}
          <form onSubmit={handleProfileSubmit} className="mb-5">
            <div className="mb-3">
              <label className="form-label fw-semibold">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={profileForm.name}
                onChange={handleProfileChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={profileForm.email}
                onChange={handleProfileChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn w-100 text-white fw-semibold"
              style={{
                backgroundColor: "#f97316",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#ea580c")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#f97316")
              }
              disabled={loading.profile}
            >
              {loading.profile ? "Updating..." : "Update Profile"}
            </button>
          </form>

          {/* Recurring Donations */}
          <div className="mb-3">
            <h4 className="fw-semibold mb-3" style={{ color: "#f97316" }}>
              Manage Recurring Donations
            </h4>

            {donations.length === 0 ? (
              <p className="text-muted">No recurring donations found.</p>
            ) : (
              <>
                <ul className="list-group mb-3">
                  {donations.map((d) => (
                    <li
                      key={d.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <strong>{d.charity?.name || "Unknown Charity"}</strong>
                        <br />
                        KES {d.amount} ({d.frequency})
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={recurringSelections[d.id] || false}
                          onChange={() => handleRecurringToggle(d.id)}
                          id={`recurring-${d.id}`}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`recurring-${d.id}`}
                        >
                          Recurring
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleRecurringUpdate}
                  className="btn w-100 text-white fw-semibold"
                  style={{
                    backgroundColor: "#f97316",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#ea580c")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f97316")
                  }
                  disabled={loading.updates}
                >
                  {loading.updates ? "Updating..." : "Save Changes"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateDonorProfile;