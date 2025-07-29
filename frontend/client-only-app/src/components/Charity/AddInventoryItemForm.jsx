import React, { useState } from "react";

const AddInventoryItemForm = ({ beneficiaries, onAdd }) => {
  const [formData, setFormData] = useState({
    item_name: "",
    amount: 1,
    beneficiary_id: beneficiaries[0]?.id || "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const charityId = parseInt(localStorage.getItem("user_id"));

    if (!token || !charityId) {
      setMessage("You must be logged in as a charity.");
      return;
    }

    try {
      const payload = {
        ...formData,
        sent_date: new Date().toISOString().split("T")[0],
      };

      const res = await fetch(
        `http://localhost:5000/api/charity/${charityId}/inventory_items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to add item");

      onAdd(data); // add to parent
      setMessage("Inventory item added successfully!");
      setFormData({
        item_name: "",
        amount: 1,
        beneficiary_id: beneficiaries[0]?.id || "",
      });
    } catch (err) {
      console.error(err);
      setMessage(err.message);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h4 className="mb-3 text-dark">Add Inventory Item</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-medium">Item Name</label>
          <input
            type="text"
            name="item_name"
            value={formData.item_name}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g., Food package"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-medium">Amount</label>
          <input
            type="number"
            name="amount"
            min="1"
            value={formData.amount}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-medium">Beneficiary</label>
          <select
            name="beneficiary_id"
            value={formData.beneficiary_id}
            onChange={handleChange}
            className="form-select"
            required
          >
            {beneficiaries.map((beneficiary) => (
              <option key={beneficiary.id} value={beneficiary.id}>
                {beneficiary.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="btn border text-orange"
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
          Add Item
        </button>
      </form>

      {message && <p className="mt-3 text-muted">{message}</p>}
    </div>
  );
};

export default AddInventoryItemForm;
