import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Layout from './Layout';
import Login from './Login';
import Register from './Register';
import UploadFile from './UploadFile';
import CredentialList from './CredentialList';
import "./App.css";

function App() {
  const credentials = [
      {
          "name": "Textfile1.txt",
          "hash": "0x123456",
          "signedReference": "0xabcdef",
          "keyName": "key1.pem"
      },
      {
          "name": "Textfile2.txt",
          "hash": "0x223456",
          "signedReference": "0xbbcdef",
          "keyName": "key2.pem"
      }
  ];

  return (
    <div className="ui container">
        <Header />
        <div className="ui main" style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 75 }}>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />} />
                    <Route path="/uploadfile" element={<UploadFile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/list" element={<CredentialList credentials={credentials} />} />
                </Routes>
            </Router>
        </div>
    </div>
);
}

export default App;