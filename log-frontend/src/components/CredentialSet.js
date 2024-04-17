//Component used to display the credential details obtained via the json payload response
import React from "react";

const CredentialSet = (props) => {
  const { name, hash, signedReference, keyName, signAgent } = props.credentials;
  console.log('Credential:', props.credentials);
  return (
    <ul style={{ display: "flex", flexDirection: "column", gap: "10px", width: "500px", marginTop: 120 }}>
      <div style={{ display: "flex", backgroundColor: "#393E46", paddingLeft:5, paddingRight:3, color: "white", flexDirection: "column", gap: "10px", width: "500px"}}>
          <div className="header">Name: {name}</div>
          <div>Hash: {hash}</div>
          <div style={{ wordWrap: "break-word" }}>Signed Reference: {signedReference}</div>
          <div>Key Name: {keyName}</div>
          <div>Signature Agent: {signAgent}</div>
      </div>
      
    </ul>
  );
};

export default CredentialSet;
