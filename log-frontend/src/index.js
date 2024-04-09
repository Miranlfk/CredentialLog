import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import App from './components/App';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";
// import CredentialList from "./components/CredentialList";
// import Login from "./components/Login";
// // import Register from "./components/Register";
// import UploadFile from "./components/UploadFile";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);