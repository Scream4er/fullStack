import React, {useState} from 'react';
import Layout from "../../components/layout";
import {Card, Form, Row, Space, Typography} from "antd";
import CustomInput from "../../components/input";
import PasswordInput from "../../components/password-input";
import CustomButton from "../../components/button";
import {Link, useNavigate} from "react-router-dom";
import {Paths} from "../../paths";
import {useSelector} from "react-redux";
import {selectUser} from "../../features/auth/authSlice";
import {useRegisterMutation} from "../../app/services/auth";
import {User} from "@prisma/client";
import {isErrorWithMessage} from "../../utils/is-error-with-message";
import ErrorMessage from "../../components/error-message";

const Register = () => {
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const [error, setError] = useState("");
    const [registerUser] = useRegisterMutation();

    type RegisterData = Omit<User, "id"> & {confirmPassword: string};

    const register = async (data: RegisterData) => {

        try {
            await registerUser(data).unwrap();

            navigate('/');
        } catch (error) {
            const maybeError = isErrorWithMessage(error);

            if (maybeError) {
                setError(error.data.message);
            } else {
                setError("Unknown error")
            }
        }
    }

    return (
        <Layout>
            <Row align="middle" justify="center">
                <Card title="Sign Up" style={{ width: "30rem" }}>
                    <Form onFinish={register}>
                        <CustomInput
                            name="name"
                            placeholder="Name"
                        />
                        <CustomInput
                            name="email"
                            placeholder="Email"
                            type="email"
                        />
                        <PasswordInput
                            name="password"
                            placeholder="Password"
                        />
                        <PasswordInput
                            name="confirmPassword"
                            placeholder="Confirm password"
                        />
                        <CustomButton type="primary" htmlType="submit">
                            Sign Up
                        </CustomButton>
                    </Form>
                    <Space direction="vertical" size="large">
                        <Typography.Text>
                            Have an account? <Link to={Paths.login}>Sign in</Link>
                        </Typography.Text>
                        <ErrorMessage message={error}/>
                    </Space>
                </Card>
            </Row>
        </Layout>
    );
};

export default Register;
