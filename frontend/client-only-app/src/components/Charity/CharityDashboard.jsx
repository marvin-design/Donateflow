import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../utils/axios";

const CharityDashboard = () => {
  const [charityData, setCharityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [recentDonations, setRecentDonations] = useState([]);
  const [recentBeneficiaries, setRecentBeneficiaries] = useState([]);
  const [recentInventory,setRecentInventory] = useState([]);
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
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = res.data;

       setCharityData({
          ...data.charity,
          total_received: data.total_donations,
          current_funds: data.current_funds,
          total_donors: data.total_donors,
          total_beneficiaries: data.total_beneficiaries,
          total_stories: data.total_stories
        });

                setLoading(false);
      } catch (err) {
        console.error("Failed to load dashboard:", err);
        navigate("/login/charity");
      }
    };

    fetchDashboardData();
  }, [navigate]);

    useEffect(() => {
    const fetchRecentDonations = async () => {
      const token = localStorage.getItem("token");
      // charityId.current = localStorage.getItem("user_id");


      try {
        const res = await axios.get(`/api/charity/charities/${charityId.current}/donations?limit=3`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecentDonations(res.data);
      } catch (err) {
        console.error("Failed to fetch recent donations:", err);
      }
    };

    fetchRecentDonations();
  }, []);
  useEffect(() => {
    const fetchRecentBeneficiaries = async () => {
      const token = localStorage.getItem("token");
      // charityId.current = localStorage.getItem("user_id");


      try {
        const res = await axios.get(`/api/charity/charities/${charityId.current}/beneficiaries?limit=3`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecentBeneficiaries(res.data);
      } catch (err) {
        console.error("Failed to fetch recent donations:", err);
      }
    };

    fetchRecentBeneficiaries();
  }, []);
  useEffect(() => {
    const fetchRecentInventory = async () => {
      const token = localStorage.getItem("token");
      // charityId.current = localStorage.getItem("user_id");


      try {
        const res = await axios.get(`/api/charity/charities/${charityId.current}/inventory_items?limit=3`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecentInventory(res.data);
      } catch (err) {
        console.error("Failed to fetch recent donations:", err);
      }
    };

    fetchRecentInventory();
  }, []);

  



  if (loading) return <p className="loading-text">Loading dashboard...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!charityData) return null;

  return (
    <div className="dashboard-container">
     
        <h1 className="dashboard-title">{charityData.name}</h1>
        <p className="dashboard-description">{charityData.description}
        </p>
      
        <div className="dashboard-card">
          <p>Total Recieved</p>
          <p>{charityData.total_received || 0}</p>
        </div>
        <div className="dashboard-card">
          <p>Total Donors</p>
          <p>{charityData.total_donors || 0}</p>
        </div>
        <div className="dashboard-card">
          <p>Beneficiaries</p>
          <p className="card-value">{charityData.total_beneficiaries}</p>
        </div>
        <div className="dashboard-card">
          <p>Stories Published</p>
          <p>{charityData.total_stories || 0}</p>
        </div>

        <div className="dashboard-card">
          <p>Current Funds </p>
          <p>{charityData.current_funds}</p>
        </div>
  

      <div className="dashboard-grid">
         <div className="dashboard-card">
      <div className="card-content">
        <h3 className="card-title">Recent Donations</h3>
        <p>Latest contributions to your charity</p>

        {recentDonations.length > 0 ? (
          recentDonations.map((donation) => (
            <div key={donation.id}>
              <p><strong>{donation.donor.name}</strong></p>
              <p> {donation.donation_date}</p>
              <b>KES {donation.amount}</b>
            </div>
          ))
        ) : (
          <p>No donations yet.</p>
        )}

        <Link to={`/charity/${charityId.current}/donations`}>
          <span>View All Donations</span>
        </Link>
      </div>
    </div>
       
         <div className="quick-actions-section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="quick-actions-grid">
          {[
            {
              label: "Manage Beneficiaries",
              link: `/charity/${charityData.id}/beneficiaries`,
            },
            {
              label: "Manage Inventory",
              link: `/charity/${charityData.id}/inventory`,
            },
            {
              label: "Share a Story",
              link: "/charity/stories",
            },
            {
              label: "Update Profile",
              link: "/charity/profile",
            },
          ].map((action, i) => (
            <Link key={i} to={action.link} className="quick-action">
              <span className="action-label">{action.label}</span>
              <span className="action-icon">→</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="dashboard-card">
           <div className="card-content">
        <h3 className="card-title">Beneficiaries</h3>
        <p>People helped by your charity</p>

        {recentBeneficiaries.length > 0 ? (
          recentBeneficiaries.map((beneficiary) => (
            <div key={beneficiary.id}>
              <strong>{beneficiary.name}</strong> donated <b>KES {beneficiary.location}</b>
            </div>
          ))
        ) : (
          <p>No beneficiaries yet.</p>
        )}

        <Link to={`/charity/${charityId.current}/beneficiaries`}>
          <span>View More</span>
        </Link>
      </div>

       </div>
      <div className="dashboard-card">
         <div className="card-content">
        <h3 className="card-title">Inventory</h3>
        <p>Items distributed to your beneficiaries</p>

        {recentInventory.length > 0 ? (
          recentInventory.map((inventory) => (
            <div key={inventory.id}>
              <p><strong>{inventory.item_name}</strong></p>
              <b>
            <p><strong>To:</strong> {inventory.beneficiary_name}</p>

              <p>Total Amount:{inventory.amount} </p>
              </b> 
              <p>Sent:{inventory.sent_date}</p>
            </div>
          ))
        ) : (
          <p>No inventory yet.</p>
        )}

        <Link to={`/charity/${charityId.current}/inventory`}>
          <span>View More</span>
        </Link>
      </div>

        </div>  
        </div>
 
     
      

 

      <style jsx>{`
        .dashboard-container {
          padding: 2rem;
          background: #fff
          min-height: 100vh;
          font-family: "Inter", sans-serif;
        }

        .dashboard-header {
          background: white;
          padding: 2rem;
          border-radius: 10px;
          margin-bottom: 2rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .dashboard-title {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .dashboard-description {
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 20px;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .btn-primary {
          background: #f97316;
          color: white;
        }

        .btn-primary:hover {
          background: #ea580c;
        }

        .btn-text {
          margin-right: 0.5rem;
        }

        .btn-icon {
          font-size: 1.2rem;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .dashboard-card {
          background: white;
          padding: 2rem;
          border-radius: 10px;
          text-align: center;
          cursor: pointer;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
          position: relative;
          overflow: hidden;
          transition: transform 0.2s ease;
        }

        .dashboard-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        .card-content {
          position: relative;
          z-index: 1;
        }

        .card-title {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .card-value {
          font-size: 2rem;
          font-weight: bold;
        }

        .card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(249, 115, 22, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .dashboard-card:hover .card-overlay {
          opacity: 1;
        }

        .overlay-text {
          color: white;
          font-size: 1.2rem;
          margin-right: 0.5rem;
        }

        .overlay-icon {
          color: white;
          font-size: 1.5rem;
        }

        .quick-actions-section {
          background: white;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .section-title {
          font-size: 1.8rem;
          margin-bottom: 1rem;
        }

        .quick-actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }

        .quick-action {
          background: #f97316;
          color: white;
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s;
        }

        .quick-action:hover {
          background: #ea580c;
        }

        .action-label {
          margin-right: 0.5rem;
        }

        .action-icon {
          font-size: 1.2rem;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 100vw;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-card {
          background: white;
          padding: 2rem;
          border-radius: 10px;
          position: relative;
          max-width: 500px;
          width: 90%;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .close-btn {
          position: absolute;
          top: 10px;
          right: 15px;
          background: transparent;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }

        .modal-title {
          font-size: 1.8rem;
          margin-bottom: 1rem;
        }

        .modal-description {
          font-size: 1.1rem;
        }

        .loading-text {
          font-size: 1.2rem;
          text-align: center;
          margin-top: 2rem;
        }

        .error-text {
          font-size: 1.2rem;
          color: #e53e3e;
          text-align: center;
          margin-top: 2rem;
        }
      `}</style>
    </div>
  );
};

export default CharityDashboard;
