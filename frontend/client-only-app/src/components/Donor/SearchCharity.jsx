import React, { useState } from "react";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";

const SearchCharity = () => {
  const [name, setName] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!name.trim()) {
      setError("Please enter a charity name");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("access_token");
      const res = await axios.get("/api/charity/search", {
        params: { q: name },
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data && res.data.length > 0) {
        setResult(res.data[0]);
      } else {
        setError("No charities found");
        setResult(null);
      }
    } catch (err) {
      console.error("Search error:", err);
      setError(err.response?.data?.error || "Search failed");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/donors/dashboard/3"); // Adjust if dynamic
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center py-5"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div className="container">
        <div className="bg-white rounded-4 shadow p-4 p-md-5">
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

          <h4 className="mb-4 text-center fw-bold" style={{ color: "#f97316" }}>
            Search for a Charity
          </h4>

          <div className="input-group mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="form-control"
              placeholder="Enter charity name"
            />
            <button
              className="btn text-white"
              style={{
                backgroundColor: "#f97316",
                transition: "all 0.3s",
              }}
              onClick={handleSearch}
              disabled={loading}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#ea580c")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#f97316")
              }
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          {error && (
            <div className="alert alert-danger mb-4" role="alert">
              {error}
            </div>
          )}

          {result && (
            <div className="p-4 bg-light border border-2 rounded-4">
              <h5 className="fw-semibold mb-3" style={{ color: "#f97316" }}>
                {result.name}
              </h5>
              <p className="text-muted mb-3">{result.description}</p>
              <div className="d-flex gap-2">
                <button
                  className="btn text-white"
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
                  onClick={() => navigate(`/donate/${result.id}`)}
                >
                  Donate
                </button>
                <button
                  className="btn btn-outline-dark"
                  onClick={() => navigate(`/charities/${result.id}`)}
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
                  Learn More
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchCharity;