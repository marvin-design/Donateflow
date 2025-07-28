import React, { useState } from "react";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";

const CreateStoryForm = () => {
  const token = localStorage.getItem("token");
  const charityId = localStorage.getItem("user_id");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
    image: null,
  });
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setForm((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("content", form.content);
      data.append("image", form.image);

      const res = await axios.post(`/api/charity/${charityId}/stories`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.id) {
        setMessage("✅ Story posted successfully!");
        setForm({ title: "", content: "", image: null });
        setPreview(null);
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
        <h2 className="text-center mb-4 text-warning">📢 Share a Story </h2>
         <button
              className="btn-secondary"
              onClick={() => navigate(`/charity/dashboard/${charityId}`)}
            >
              Back 
            </button>

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
            <label className="form-label fw-semibold">Upload Photo</label>
            <input
              type="file"
              className="form-control"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
            />
            {preview && (
              <div className="mt-3 text-center">
                <img
                  src={preview}
                  alt="Preview"
                  style={{ width: "100%", borderRadius: "8px", maxHeight: "250px", objectFit: "cover" }}
                />
              </div>
            )}
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
          .btn-secondary {
          background-color: #4b5563;
          color: white;
          width:100px;
          height: 30px;
        }

        .btn-secondary:hover {
          background-color: #374151;
        }
      `}</style>
    </div>
  );
};

export default CreateStoryForm;
