import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "./ErrorBoundary";

function DonationForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handleBack = () => {
    navigate("/donors/charities");
  };

  const handleAmountChange = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e) => {
    setSelectedAmount(null);
    setCustomAmount(e.target.value);
  };

  const validatePhoneNumber = (number) => {
    const cleaned = number.replace(/\D/g, "");
    const kenyanRegex = /^(?:07\d{8}|01\d{8}|\+254[17]\d{8})$/;
    if (!kenyanRegex.test(cleaned)) {
      setPhoneError("Invalid Kenyan phone number");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    if (value) validatePhoneNumber(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAnonymous && !validatePhoneNumber(phoneNumber)) {
      toast.error(phoneError || "Please enter a valid phone number");
      return;
    }

    const amount = selectedAmount
      ? Number(selectedAmount)
      : parseFloat(customAmount);

    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid donation amount.");
      return;
    }

    const donationData = {
      amount,
      is_recurring: isRecurring,
      frequency: isRecurring ? frequency : null,
      is_anonymous: isAnonymous,
      charity_id: id,
      phone_number: isAnonymous ? null : phoneNumber.replace(/\D/g, ""),
    };

    try {
      await axios.post("/api/donors/donations", donationData);
      toast.success("Donation successful! Redirecting...", {
        autoClose: 2000,
        onClose: () => navigate("/thank-you"),
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to process donation.");
    }
  };

  return (
    <ErrorBoundary>
      <div className="container py-5">
        <div
          className="bg-white shadow-lg rounded-4 p-4 p-md-5 mx-auto"
          style={{ maxWidth: "600px" }}
        >
          <button
            onClick={handleBack}
            className="btn btn-sm btn-outline-dark mb-4"
          >
            ← Back to Charities
          </button>

          <h2 className="mb-4 fw-bold text-orange">Make a Donation</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-medium">Select Amount:</label>
              <div className="d-flex gap-3 flex-wrap">
                {[100, 500, 1000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => handleAmountChange(amt)}
                    className={`btn ${
                      selectedAmount === amt
                        ? "btn-warning text-white"
                        : "btn-outline-secondary"
                    } rounded-pill px-4`}
                  >
                    Ksh {amt}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-medium">
                Custom Amount (Ksh):
              </label>
              <input
                type="number"
                className="form-control"
                value={customAmount}
                onChange={handleCustomAmountChange}
                placeholder="Enter custom amount"
              />
            </div>

            {!isAnonymous && (
              <div className="mb-3">
                <label className="form-label fw-medium">Phone Number:</label>
                <input
                  type="tel"
                  className={`form-control ${phoneError ? "is-invalid" : ""}`}
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="e.g. 0712345678 or +254712345678"
                  required={!isAnonymous}
                />
                {phoneError && (
                  <div className="invalid-feedback">{phoneError}</div>
                )}
              </div>
            )}

            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="recurringDonation"
                checked={isRecurring}
                onChange={() => setIsRecurring(!isRecurring)}
              />
              <label className="form-check-label" htmlFor="recurringDonation">
                Recurring Donation
              </label>
            </div>

            {isRecurring && (
              <div className="mb-3">
                <label className="form-label fw-medium">Frequency:</label>
                <select
                  className="form-select"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                >
                  <option value="">Select frequency</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            )}

            <div className="form-check mb-4">
              <input
                type="checkbox"
                className="form-check-input"
                id="anonymousDonation"
                checked={isAnonymous}
                onChange={() => setIsAnonymous(!isAnonymous)}
              />
              <label className="form-check-label" htmlFor="anonymousDonation">
                Donate anonymously
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-lg w-100 text-white"
              style={{
                backgroundColor: "#f97316",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#ea730c")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#f97316")
              }
            >
              Donate
            </button>
          </form>
          <ToastContainer position="top-center" />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default DonationForm;
