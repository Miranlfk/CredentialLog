import React from "react";

const CredentialSet = (props) => {
  const { name, hash, signedReference, keyName } = props.credentials;
  console.log('Credential:', props.credentials);
  return (
    <ul style={{ display: "flex", flexDirection: "column", gap: "10px", width: "500px", marginTop: 100 }}>
      <li>
        <div className="header">Name: {name}</div>
      </li>
      <li>
        <div>Hash: {hash}</div>
      </li>
      <li>
        <div style={{ wordWrap: "break-word" }}>Signed Reference: {signedReference}</div>
      </li>
      <li>
        <div>Key Name: {keyName}</div>
      </li>
    </ul>
  );
};

export default CredentialSet;
