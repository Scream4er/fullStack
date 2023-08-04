import React, {useState} from 'react';
import Layout from "../../components/layout";
import {Card, Form, Row, Space, Typography} from "antd";
import CustomInput from "../../components/input";
import PasswordInput from "../../components/password-input";
import CustomButton from "../../components/button";
import {Link, useNavigate} from "react-router-dom";
import {Paths} from "../../paths";
import {useLoginMutation, UserData} from "../../app/services/auth";
import {isErrorWithMessage} from "../../utils/is-error-with-message";
import ErrorMessage from "../../components/error-message";

const Login = () => {
    const navigate = useNavigate();
    const [loginUser, loginUserResult] = useLoginMutation();
    const [error, setError] = useState('');

    const login = async (data: UserData) => {
        try {
            await loginUser(data).unwrap();

            navigate("/");
        } catch (err) {
            const maybeError = isErrorWithMessage(err);

            if (maybeError) {
                setError(err.data.message);
            } else {
                setError('Unknown message');
            }
        }
    }

    return (
        <Layout>
            <Row align="middle" justify="center">
                <Card title="Log in" style={{ width: "30rem" }}>
                    <Form onFinish={login}>
                        <CustomInput
                            name="email"
                            placeholder="Email"
                            type="email"
                        />
                        <PasswordInput
                            name="password"
                            placeholder="Password"
                        />
                        <CustomButton type="primary" htmlType="submit">
                            Login
                        </CustomButton>
                    </Form>
                    <Space direction="vertical" size="large">
                        <Typography.Text>
                            Don't have account? <Link to={Paths.register}>Sign Up</Link>
                        </Typography.Text>
                        <ErrorMessage message={error} />
                    </Space>
                </Card>
            </Row>
        </Layout>
    );
};

export default Login;
