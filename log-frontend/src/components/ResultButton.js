//Component to provide the result of the uploaded file and provide buttons to navigate to the credentials page or re-upload the file
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const ResultButton = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const credentials = location.state.sentVariable;
    let hashValue;
    if (credentials) {
        const useCredential = [];
        useCredential.push(credentials[0]);
        hashValue = useCredential[0].hash
        console.log('Credential:', hashValue);
    } else {
        hashValue = null;
    }
   
    const redirectToCredentials = () => {
        navigate('/list', { state: { sentVariable: credentials }}); 
    };

    const redirectToReUpload = () => {
        navigate('/uploadfile'); 
    };

    return (
        <Button type="primary" htmlType="submit" className="login-form-button" style={{ marginTop:200, backgroundColor: hashValue ? 'green' : 'red' }} size="large" onClick={hashValue ? redirectToCredentials : redirectToReUpload}>
            {hashValue ? 'Credentials' : 'No Credentials'}
        </Button>

    );
    };

export default ResultButton;
