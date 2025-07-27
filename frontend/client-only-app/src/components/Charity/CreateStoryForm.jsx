import React, { useState } from "react";
import axios from "../../utils/axios";

const CreateStoryForm = () => {
  const token = localStorage.getItem("token");
  const charityId = localStorage.getItem("user_id");

  const [form, setForm] = useState({
    title: "",
    content: "",
    photo_url: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(`/api/charity/${charityId}/stories`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.data.id) {
        setMessage("✅ Story posted successfully!");
        setForm({ title: "", content: "", photo_url: "" });
      }
    } catch (err) {
      setMessage("❌ Failed to post story.");
      console.error(err);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(-45deg, #f97316, #fb923c, #fdba74, #f97316)",
        backgroundSize: "400% 400%",
        animation: "gradientMove 10s ease infinite",
        padding: "20px",
      }}
    >
      <div
        className="card shadow p-4"
        style={{ width: "100%", maxWidth: "600px", borderRadius: "12px" }}
      >
        <h2 className="text-center mb-4 text-warning">📢 Share a Story</h2>

        {message && (
          <div
            className={`alert ${
              message.includes("successfully")
                ? "alert-success"
                : "alert-danger"
            }`}
            role="alert"
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="Enter story title"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Content</label>
            <textarea
              className="form-control"
              name="content"
              value={form.content}
              onChange={handleChange}
              required
              placeholder="Write your story..."
              rows={5}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Photo URL</label>
            <input
              type="text"
              className="form-control"
              name="photo_url"
              value={form.photo_url}
              onChange={handleChange}
              required
              placeholder="Enter image URL"
            />
          </div>

          <button
            type="submit"
            className="btn w-100 fw-semibold"
            style={{ backgroundColor: "#f97316", color: "white" }}
          >
            🚀 Post Story
          </button>
        </form>
      </div>

      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default CreateStoryForm;
