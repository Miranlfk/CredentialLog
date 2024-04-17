//Register component for the application using ant design which utilizes form to handle user registration
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/reset.css';
import axios from "../api/axios";
import {
  Form,
  Input,
  Button,
} from 'antd';


const Register = () => {

    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const REGST_URL = '/users/register'

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post(REGST_URL, formData);
            console.log('Registration successful:', response.data);
            navigate('/login'); // Redirect to login page upon successful registration
        } catch (error) {
            console.error('Registration failed:', error);
            navigate('/register'); // Redirect to registration page upon unsuccessful registration
        }
    };

    const handleInputChange = (event, fieldName) => {
        const { value } = event.target;

        setFormData(prevFormData => ({
            ...prevFormData,
            [fieldName]: value
        }));
    };

    return(
        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <div style={{width:400, marginTop:75}}>
                <h1 style={{textAlign:"center", color:'white'}}>Register</h1>
                <Form
                    name="normal_registration"
                    className="registration-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        style={{color:'white'}}
                        name="username"
                        label="Username"
                        
                        rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                        ]}
                    >
                        <Input  onChange={(event) => handleInputChange(event, 'username')} />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="E-mail"
                        style={{color:'white'}}
                        rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                        ]}
                    >
                        <Input onChange={(event) => handleInputChange(event, 'email')} />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        style={{color:'white'}}
                        rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        ]}
                        hasFeedback
                    >
                        <Input.Password onChange={(event) => handleInputChange(event, 'password')} />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        style={{color:'white'}}
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
                        ]}
                    >
                        <Input.Password onChange={(event) => handleInputChange(event, 'password')}/>
                    </Form.Item>
                        <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        Register
                        </Button >
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{marginLeft:20}}>
                            <a href="/login">Login</a>
                        </Button>
                    </Form.Item>
            </Form>
            </div>

        </div>
    );
}

export default Register;