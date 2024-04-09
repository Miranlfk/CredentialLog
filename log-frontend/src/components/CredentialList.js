import React from "react";
import CredentialSet from "./CredentialSet";

const CredentialList = (props) => {
  console.log(props);

  const renderCredentialList = props.credentials.map((credentials) => {
    return (
      <CredentialSet
        credentials={credentials}
        key={credentials.hash}
      />
    );
  });
  return <div className="ui celled list">{renderCredentialList}</div>;
};

export default CredentialList;
