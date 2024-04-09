import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import 'antd/dist/reset.css';
import axios from "../api/axios";
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const Register = () => {

    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post('http://localhost:8000/api/users/register', formData);
            console.log('Registration successful:', response.data);
            navigate('/login'); // Redirect to new page upon successful login
        } catch (error) {
            console.error('Registration failed:', error);
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
                <h1 style={{textAlign:"center"}}>Register</h1>
                <Form
                    name="normal_registration"
                    className="registration-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={handleSubmit}
                >
                    <Form.Item
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
                        </Button>
                        Or <a href="/login">Login</a>
                    </Form.Item>
            </Form>
            </div>

        </div>
    );
}

export default Register;