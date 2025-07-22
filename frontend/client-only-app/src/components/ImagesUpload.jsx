// src/components/ImageUpload.jsx
import React, { useState } from 'react';
import axios from '../utils/axios';

const ImageUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setError('');
  };

  const handleUpload = async () => {
    if (!file) return setError('Please select a file first');

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    try {
      const response = await axios.post('/api/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (onUploadSuccess) {
        onUploadSuccess(response.data.url); // send URL to parent form
      }
    } catch (err) {
      setError('Upload failed. Try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="image-upload">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && <img src={preview} alt="Preview" style={{ width: '150px', marginTop: '10px' }} />}
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload Image'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ImageUpload;
