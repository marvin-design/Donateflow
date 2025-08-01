import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import { AuthContext } from "../../context/AuthContext";

const CharityList = () => {
  const [charities, setCharities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);
  const activeToken = token || localStorage.getItem("access_token");
  const currentUser= user || JSON.parse(localStorage.getItem("logged_in_user"));

  useEffect(() => {
    const fetchCharities = async () => {
      try {
        //const token = localStorage.getItem("access_token");
        const response = await axios.get("/api/donors/charities", {
          headers: { Authorization: `Bearer ${activeToken}` },
        });
        setCharities(response.data.charities || response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load charities");
        console.error("Error fetching charities:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharities();
  }, [activeToken]);

  const handleBack = () => {
    const donorId = currentUser?.id || localStorage.getItem("user_id");
    navigate(`/donors/dashboard/${donorId}`);
  };

  if (loading)
    return (
      <div className="text-center py-5 text-muted">Loading charities...</div>
    );
  if (error)
    return <div className="alert alert-danger text-center mt-4">{error}</div>;
  if (charities.length === 0)
    return (
      <div className="text-center py-5 text-muted">No charities found</div>
    );


  return (
    <div className="min-vh-100 py-5 px-3" style={{ background: "#ffffff" }}>
      <div className="container bg-white rounded-4 shadow p-4 animate__animated animate__fadeIn">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-dark mb-0">Available Charities</h2>
          <button
            onClick={handleBack}
            className="btn btn-outline-dark rounded-pill px-3 py-1 shadow-sm"
            style={{
              transition: "all 0.3s ease",
              borderColor: "#f97316",
              color: "#f97316",
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
        </div>

        <div className="row">
          {charities.map((charity) => (
            <div key={charity.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 border-0 shadow-sm rounded-4">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-semibold text-dark">
                    {charity.name}
                  </h5>
                  <p className="card-text text-muted">
                    {charity.description?.length > 100
                      ? charity.description.slice(0, 100) + "..."
                      : charity.description}
                  </p>
                  <small className="text-muted">ID: {charity.id}</small>

                  <div className="mt-auto pt-3 d-flex gap-2">
                    <button
                      className="btn btn-outline-dark btn-sm flex-fill rounded-pill"
                      onClick={() => navigate(`/charities/${charity.id}`)}
                      style={{
                        transition: "all 0.3s ease",
                        borderColor: "#f97316",
                        color: "#f97316",
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
                    <button
                      className="btn btn-sm flex-fill rounded-pill"
                      onClick={() => navigate(`/donate/${charity.id}`)}
                      style={{
                        backgroundColor: "#f97316",
                        color: "#fff",
                        border: "none",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#ea580c")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "#f97316")
                      }
                    >
                      Donate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharityList;
