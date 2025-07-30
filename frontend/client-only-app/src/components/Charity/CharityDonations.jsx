import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";

export default function CharityDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const charityId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchDonations = async () => {
      if (!token || !charityId) {
        navigate("/login/charity");
        return;
      }

      try {
        const response = await axios.get(
          `/api/charity/charities/${charityId}/donations`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDonations(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch donations.");
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [charityId, navigate, token]);

  if (loading) return <p className="loading-text">Loading donations...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (donations.length === 0)
    return <p className="no-donations">No donations yet.</p>;

  return (
    <div className="donation-bg">
      <div className="donation-container">
        <h2 className="donation-title">Donation History</h2>
        <div className="donation-table-wrapper">
          <table className="donation-table">
            <thead>
              <tr>
                <th>Donor</th>
                <th>Amount (KES)</th>
                <th>Date</th>
                <th>Frequency</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation.id}>
                  <td>{donation.donor_name || "Anonymous"}</td>
                  <td>{donation.amount.toLocaleString()}</td>
                  <td>{donation.donation_date}</td>
                  <td>{donation.frequency || "one-time"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
        }

        .donation-bg {
          min-height: 100vh;
          background: (270deg, #faf6f3ff, #f59e0b, #f97316);
          background-size: 600% 600%;
          animation: moveBg 15s ease infinite;
          display: flex;
          justify-content: center;
          align-items: start;
          padding: 60px 20px;
        }

        @keyframes moveBg {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .donation-container {
          width: 100%;
          max-width: 1100px;
          background: #ffffff;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.07);
        }

        .donation-title {
          font-size: 1.8rem;
          font-weight: 600;
          color: #f97316;
          text-align: center;
          margin-bottom: 30px;
        }

        .donation-table-wrapper {
          overflow-x: auto;
        }

        .donation-table {
          width: 100%;
          border-collapse: collapse;
          background: #fff;
          border-radius: 10px;
          overflow: hidden;
        }

        .donation-table thead {
          background: #f97316;
          color: #fff;
        }

        .donation-table th,
        .donation-table td {
          padding: 14px 20px;
          text-align: center;
          border-bottom: 1px solid #eee;
        }

        .donation-table tbody tr {
          transition: background 0.2s ease;
        }

        .donation-table tbody tr:hover {
          background-color: #fff7ed;
        }

        .loading-text,
        .no-donations,
        .error-text {
          text-align: center;
          margin-top: 40px;
          font-size: 1rem;
          color: #6b7280;
        }

        .error-text {
          color: #dc2626;
        }
      `}</style>
    </div>
  );
}
