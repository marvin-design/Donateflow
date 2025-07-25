import React, { useState } from "react";

const CharityApplicationForm = () => {
  const [formData, setFormData] = useState({
    charity_name: "",
    email: "",
    description: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/charity/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          charity_name: formData.charity_name,
          email: formData.email,
          description: formData.description,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      localStorage.setItem("charity_application", JSON.stringify(data));
      setMessage("Application submitted successfully!");

      setFormData({
        charity_name: "",
        email: "",
        description: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error(err);
      setMessage(err.message);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #f97316 0%, #ea730c 50%, #dc2626 100%)",
      }}
    >
      <div
        className="card border-0 shadow-lg position-relative"
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(20px)",
          animation: "slideInUp 0.8s ease-out",
        }}
      >
        <div className="card-body p-5">
          <h2 className="text-center mb-4 fw-bold" style={{ fontSize: "2rem" }}>
            Apply as a Charity
          </h2>

          <form onSubmit={handleSubmit}>
            {[
              "charity_name",
              "email",
              "description",
              "password",
              "confirmPassword",
            ].map((field, index) => (
              <div className="form-group mb-3" key={index}>
                <label className="form-label">
                  {field.replace(/_/g, " ").toUpperCase()}
                </label>
                {field === "description" ? (
                  <textarea
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="form-control border-0 py-3 px-4 animated-input"
                    style={inputStyle}
                  />
                ) : (
                  <input
                    type={field.includes("password") ? "password" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="form-control border-0 py-3 px-4 animated-input"
                    style={inputStyle}
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              className="btn w-100 py-3 border-0 fw-bold text-white position-relative"
              style={{
                background: "linear-gradient(135deg, #f97316, #ea730c)",
                borderRadius: "15px",
                fontSize: "1.1rem",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(249,115,22,0.4)",
              }}
              onMouseEnter={(e) => {
                e.target.style.background =
                  "linear-gradient(135deg, #ea730c, #dc2626)";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background =
                  "linear-gradient(135deg, #f97316, #ea730c)";
                e.target.style.transform = "scale(1)";
              }}
            >
              Submit Application
            </button>
          </form>

          {message && (
            <div className="form-message mt-4 fade-in">
              <p
                className="text-center"
                style={{ color: "green", fontWeight: "bold" }}
              >
                {message}
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .fade-in {
          animation: fadeIn 0.5s ease forwards;
        }

        .animated-input {
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .animated-input:focus {
          outline: none;
          border-color: #f97316;
          box-shadow: 0 0 5px rgba(249, 115, 22, 0.5);
        }
      `}</style>
    </div>
  );
};

const inputStyle = {
  background: "#f8f9fa",
  borderRadius: "15px",
  fontSize: "1.1rem",
  transition: "all 0.3s ease",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
};

export default CharityApplicationForm;
