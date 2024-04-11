import React from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/reset.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from "../api/axios";

export default function Login() {

    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const LOGIN_URL = '/users/login'

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post(LOGIN_URL, formData);
            console.log('Login successful:', response.data);
            navigate('/uploadfile'); // Redirect to fileupload page upon successful login
        } catch (error) {
            console.error('Login failed:', error);
            navigate('/register'); // Redirect to login page upon unsuccessful login
        }
    };

    const handleInputChange = (event, fieldName) => {
        const { value } = event.target;

        setFormData(prevFormData => ({
            ...prevFormData,
            [fieldName]: value
        }));
    };

    return (
        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <div style={{width:400, marginTop:50}}>
            <h1 style={{textAlign:"center", color: "white"}}>Sign In</h1>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="email"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Email!',
                    },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" onChange={(event) => handleInputChange(event, 'email')} />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                    ]}
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    onChange={(event) => handleInputChange(event, 'password')}
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                    </Button>
                    Or <a href="/register">register now!</a>
                </Form.Item>
            </Form>
            </div>
        </div>
    );
}

