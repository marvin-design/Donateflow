import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddInventoryItemForm from "./AddInventoryItemForm";
import axios from "../../utils/axios";

const InventoryList = () => {
  const [inventory, setInventory] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const charityId = localStorage.getItem("user_id");

  useEffect(() => {
    if (!token || !charityId) {
      navigate("/login/charity");
      return;
    }

    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const [itemsRes, beneficiariesRes] = await Promise.all([
          axios.get(`/api/charity/${charityId}/inventory_items`, { headers }),
          axios.get(`/api/charity/${charityId}/beneficiaries`, { headers }),
        ]);

        setInventory(itemsRes.data);
        setBeneficiaries(beneficiariesRes.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        navigate("/login/charity");
      }
    };

    fetchData();
  }, [charityId, token, navigate]);

  const handleAddItem = (newItem) => {
    setInventory((prev) => [...prev, newItem]);
    setShowForm(false);
  };

  if (loading) return <p className="loading-text">Loading inventory...</p>;

  return (
    <div className="inventory-container">
      <div className="inventory-header">
        <h2>Charity Inventory</h2>
        <div className="button-group">
          <button
            className="btn-secondary"
            onClick={() => navigate(`/charity/dashboard/${charityId}`)}
          >
            Back to Dashboard
          </button>
          <button
            className="btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "+ Add Item"}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="add-form-container">
          <AddInventoryItemForm
            beneficiaries={beneficiaries}
            onAdd={handleAddItem}
          />
        </div>
      )}

      <div className="inventory-grid">
        {inventory.length > 0 ? (
          inventory.map((item, index) => (
            <div key={index} className="inventory-card">
              <h4>{item.item_name}</h4>
              <p>
                <strong>To:</strong>{" "}
                {beneficiaries.find((b) => b.id === item.beneficiary_id)
                  ?.name || "Unknown"}
              </p>
              <p>
                <strong>Total Amount:</strong> {item.amount}
              </p>
              <p>
                <strong>Sent:</strong> {item.sent_date}
              </p>
            </div>
          ))
        ) : (
          <p className="no-items">No inventory items found.</p>
        )}
      </div>

      <style jsx>{`
        body {
          margin: 0;
          font-family: "Inter", sans-serif;
          background: linear-gradient(-45deg, #f97316, #f59e0b, #f97316);
          background-size: 600% 600%;
          animation: gradientMove 12s ease infinite;
        }

        @keyframes gradientMove {
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

        .inventory-container {
          max-width: 1000px;
          margin: 60px auto;
          background: #fff;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .inventory-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .inventory-header h2 {
          color: #f97316;
          font-size: 1.8rem;
          font-weight: 600;
        }

        .button-group {
          display: flex;
          gap: 10px;
        }

        .btn-primary,
        .btn-secondary {
          padding: 10px 16px;
          border-radius: 6px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: 0.3s;
        }

        .btn-primary {
          background-color: #f97316;
          color: white;
        }

        .btn-primary:hover {
          background-color: #ea580c;
        }

        .btn-secondary {
          background-color: #4b5563;
          color: white;
        }

        .btn-secondary:hover {
          background-color: #374151;
        }

        .add-form-container {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
          margin-bottom: 30px;
        }

        .inventory-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
          gap: 20px;
        }

        .inventory-card {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s ease;
        }

        .inventory-card:hover {
          transform: translateY(-4px);
        }

        .inventory-card h4 {
          color: #111827;
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .inventory-card p {
          margin: 5px 0;
          color: #374151;
          font-size: 0.95rem;
        }

        .no-items,
        .loading-text {
          text-align: center;
          margin-top: 40px;
          color: #6b7280;
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
};

export default InventoryList;
