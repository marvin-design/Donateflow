import React, { useState } from 'react';
import axios from '../../utils/axios';
import ImageUpload from '../ImagesUpload'
import { useParams } from 'react-router-dom';

const CreateStoryForm = () => {
  const { id: charityId } = useParams();  // From route param
  const [form, setForm] = useState({
    title: '',
    content: '',
    photo_url: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUploadSuccess = (url) => {
    setForm(prev => ({ ...prev, photo_url: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`/api/charity/${charityId}/stories`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (res.data.id) {
        setMessage('Story posted successfully!');
        setForm({ title: '', content: '', photo_url: '' });
      }
    } catch (err) {
      setMessage('Failed to post story');
      console.error(err);
    }
  };

  return (
    <div className="story-form-container">
      <h2>Share a Story</h2>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <label>Content:</label>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          required
        />

        <label>Upload Image:</label>
        <ImageUpload onUploadSuccess={handleImageUploadSuccess} />

        <button type="submit">Post Story</button>
      </form>
    </div>
  );
};

export default CreateStoryForm;
