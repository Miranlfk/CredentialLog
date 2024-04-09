import React from "react";
import { useLocation } from 'react-router-dom';
import CredentialSet from "./CredentialSet";


const CredentialList = () => {
  const location = useLocation();
  const retrievedCredentials = location.state.sentVariable; //retrieve the credentials from the location state
  const useCredential = [];
  useCredential.push(retrievedCredentials[0]);
  console.log('Retrieved Credentials:', retrievedCredentials);
  console.log('credentials', useCredential);

//map the credentials to the CredentialSet component to display the credential details
  const renderCredentialList = useCredential.map((useCredential, index ) => {
    return (
      <CredentialSet
        credentials={useCredential}
        key={useCredential.hash}
      />
    );
  });
  return <div className="ui celled list">{renderCredentialList}</div>;
};

export default CredentialList;
