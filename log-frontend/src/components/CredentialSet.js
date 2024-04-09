import React from "react";

const CredentialSet = (props) => {
  const { name, hash, signedReference, keyName } = props.credentials;
  return (
    <div className="item">
      <div className="content">
        <div className="header">{name}</div>
        <div>{hash}</div>
        <div>{signedReference}</div>
        <div>{keyName}</div>
      </div>
    </div>
  );
};

export default CredentialSet;
