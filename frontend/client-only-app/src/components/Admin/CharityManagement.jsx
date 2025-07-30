import React, { useEffect, useState, useContext } from "react";
import axios from "../../utils/axios";
import { AuthContext } from "../../context/AuthContext";

function CharityManagement() {
  const [charities, setCharities] = useState([]);
  const { token } = useContext(AuthContext);
  //const token = localStorage.getItem("adminToken");
  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    axios
      .get("/api/admin/charities", {
        headers: { Authorization: `Bearer ${token|| adminToken}` },
      })
      .then((response) => {
        const approved = response.data.charities || [];
        setCharities(approved);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`/api/admin/charity/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setCharities((prev) => prev.filter((c) => c.id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="mb-5">
      <h5 className="fw-semibold text-dark mb-3">Approved Charities</h5>
      <ul className="list-unstyled">
        {charities.map((charity) => (
          <li
            key={charity.id}
            className="d-flex justify-content-between align-items-center border rounded p-3 mb-2 bg-light"
          >
            <span>
              {charity.name} - {charity.email}
            </span>
            <button
              onClick={() => handleDelete(charity.id)}
              className="btn btn-sm rounded-pill px-3 fw-medium shadow-sm"
              style={{
                borderColor: "#f97316",
                color: "#f97316",
                backgroundColor: "transparent",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#f97316";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#f97316";
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CharityManagement;
