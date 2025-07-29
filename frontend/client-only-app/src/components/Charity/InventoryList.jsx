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

  if (loading)
    return <p className="text-center mt-5 text-muted">Loading inventory...</p>;

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-orange fw-semibold mb-0">Charity Inventory</h2>
        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-dark"
            onClick={() => navigate(`/charity/dashboard/${charityId}`)}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#4b5563")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            Back to Dashboard
          </button>
          <button
            className="btn btn-outline-orange"
            onClick={() => setShowForm(!showForm)}
            style={{ borderColor: "#f97316", color: "#f97316" }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#f97316";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#f97316";
            }}
          >
            {showForm ? "Cancel" : "+ Add Item"}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="p-4 mb-4 bg-light border rounded shadow-sm">
          <AddInventoryItemForm
            beneficiaries={beneficiaries}
            onAdd={handleAddItem}
          />
        </div>
      )}

      <div className="row g-4">
        {inventory.length > 0 ? (
          inventory.map((item, index) => (
            <div key={index} className="col-md-4">
              <div className="bg-white border rounded p-4 shadow-sm h-100">
                <h5 className="fw-semibold text-dark mb-2">{item.item_name}</h5>
                <p className="mb-1">
                  <strong>To:</strong>{" "}
                  {beneficiaries.find((b) => b.id === item.beneficiary_id)
                    ?.name || "Unknown"}
                </p>
                <p className="mb-1">
                  <strong>Total Amount:</strong> {item.amount}
                </p>
                <p className="mb-0">
                  <strong>Sent:</strong> {item.sent_date}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted mt-4">
            No inventory items found.
          </p>
        )}
      </div>

      <style>{`
        .text-orange {
          color: #f97316;
        }
        .btn-outline-orange {
          border: 1px solid #f97316;
          color: #f97316;
          background-color: transparent;
        }
        .btn-outline-orange:hover {
          background-color: #f97316 !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
};

export default InventoryList;
