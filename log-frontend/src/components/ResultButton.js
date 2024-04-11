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
        navigate('/list', { state: { sentVariable: credentials }}); // Change '/credentials' to your desired route
    };

    const redirectToReUpload = () => {
        navigate('/uploadfile'); // Change '/credentials' to your desired route
    };

    return (
        <Button type="primary" htmlType="submit" className="login-form-button" style={{ marginTop:200, backgroundColor: hashValue ? 'green' : 'red' }} size="large" onClick={hashValue ? redirectToCredentials : redirectToReUpload}>
            {hashValue ? 'Credentials' : 'No Credentials'}
        </Button>

    );
    };

export default ResultButton;
