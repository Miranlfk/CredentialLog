//Component to Display the credential details, download the public key and verify the file
import React, { useState } from "react";
import { Button } from "antd";
import axios from "axios";

const CredentialSet = (props) => {
  const { name, hash, signedReference, keyName, signAgent, keyFile } = props.credentials;
  const [verificationStatus, setVerificationStatus] = useState(null);
  //Call the verify file API to verify the file with the hash and key file
  const verifyFile = async () => {
    try {
      const URL = "http://localhost:8080/api/verify-file";
      const data = {
        hash: hash,
        keyFile: keyFile
      };

      const response = await axios.post(URL, data, {
        headers: {
          "Content-Type": "application/json"
        },
      });

      setVerificationStatus("success");
      console.log("Verification successful", response);
    } catch (error) {
      setVerificationStatus("error");
      console.error('Error verifying file:', error);
    }
  };

  const handleVerificationText = () => {
    if (verificationStatus === "success") {
      return <span style={{ color: "green", fontWeight: "bold" }}>File verified successfully</span>;
    } else if (verificationStatus === "error") {
      return <span style={{ color: "red", fontWeight: "bold" }}>File verification failed</span>;
    } else {
      return null;
    }
  };
//Call the download key API to download the public key
  const downloadKey = async () => {
    try {
      const URL = "http://localhost:8080/api/download-public-key";
      const data = {
        keyFile: keyFile
      };

      const response = await axios.post(URL, data, {
        headers: {
          "Content-Type": "application/json"
        },
        responseType: 'blob'
      });

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'public.pem';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      console.log("Download successful", response);
    } catch (error) {
      console.error("Error downloading key", error);
    }
  };

  return (
    <ul style={{ display: "flex", flexDirection: "column", gap: "10px", width: "500px", marginTop: 120 }}>
      <div style={{ display: "flex", backgroundColor: "#393E46", paddingLeft: 5, paddingRight: 3, color: "white", flexDirection: "column", gap: "10px", width: "500px" }}>
        <div className="header">Name: {name}</div>
        <div>Hash: {hash}</div>
        <div style={{ wordWrap: "break-word" }}>Signed Reference: {signedReference}</div>
        <div>Key Name: {keyName}</div>
        <div>Signature Agent: {signAgent}</div>
      </div>
      <div>
        <Button type="primary" htmltype="submit" className="login-form-button" style={{ marginTop: 20, marginLeft: 25 }} size="large" onClick={downloadKey}>Download</Button>
        <Button type="primary" htmltype="submit" className="login-form-button" style={{ marginTop: 20, backgroundColor: 'green', marginLeft: 250 }} size="large" onClick={verifyFile}>Verify</Button>
        {verificationStatus && <div style={{ marginTop: 10, textAlign: "center" }}>{handleVerificationText()}</div>}
      </div>
    </ul>
  );
};

export default CredentialSet;
