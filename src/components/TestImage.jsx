import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';

const FileUpload = () => {
  const [files, setFiles] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('productId', 25); // Replace 123 with actual product ID
      for (const file of files) {
        formData.append('files', file);
      }
      await axios.post('https://localhost:7211/api/ProductImage/upload/25', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Files uploaded successfully.');
    } catch (error) {
      setMessage('An error occurred: ' + error.message);
    }
  };

  return (
    <div>
      <h2>File Upload</h2>
    
      <Form  onSubmit={handleSubmit}>
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>Multiple files input example</Form.Label>
        <Form.Control type="file" multiple onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </Form.Group>
      </Form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FileUpload;
