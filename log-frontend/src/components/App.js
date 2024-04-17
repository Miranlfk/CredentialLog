//Component to provide the routing for the application using browser router

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Layout from './Layout';
import Login from './Login';
import Register from './Register';
import UploadFile from './UploadFile';
import CredentialList from './CredentialList';
import ResultButton from './ResultButton';
import "./App.css";

function App() {

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
                    <Route path="/list" element={<CredentialList />} />
                    <Route path='/result' element={<ResultButton />} />
                </Routes>
            </Router>
        </div>
    </div>
);
}

export default App;