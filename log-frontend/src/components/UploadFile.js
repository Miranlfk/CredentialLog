import React, { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from 'react-router-dom';

const UploadFile = () => {
  const [file, setFile] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
  
    try {
      if (!file) {
        console.error('No file selected');
        return;
      }
   // Log the hash value
      const arrayBuffer = await readFileAsync(file);
      console.log('File content:', arrayBuffer);

      const formData = new FormData(); // Create FormData object
      formData.append('file', file);
      console.log('Form Data:', formData); // Log the payload object
  
      try {
        const response = await axios.post('http://localhost:8000/api/file', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('File uploaded successfully:', response.data);
        const credential = response.data.credential;
        const hash = credential.hash;
        console.log('Hash:', hash);
        if (!hash){
          navigate('/uploadfile');
        } else{
          const res = await axios.get(`http://localhost:8000/api/logs/${hash}`);
          console.log('Log:', res.data);
          const credentials = res.data.credentials; 
          console.log('Log:', credentials);
          navigate('/list');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        // Handle error response from the backend
        console.error('Error response:', error.response.data);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  // Function to read file asynchronously and return the file content
  const readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  
  const handleInputChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  return (
    <div className="ui main">
      <h2>Upload File</h2>
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="field">
          <label>File</label>
          <input
            type="file"
            name="file"
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="ui button blue">Upload</button>
      </form>
    </div>
  );
};

export default UploadFile;
