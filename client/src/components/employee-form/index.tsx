import React from 'react';
import {Employee} from "@prisma/client";
import {Card, Form, Space} from "antd";
import CustomInput from "../input";
import ErrorMessage from "../error-message";
import CustomButton from "../button";

type Props<T> = {
    onFinish: (values: T) => void;
    btnText: string;
    title: string;
    error?: string;
    employee?: T;
}

const EmployeeForm = ({
    onFinish,
    title,
    error,
    employee,
    btnText
                      }: Props<Employee>) => {
    return (
        <Card title={title} style={{width: '30rem' }}>
            <Form name='employee-from' onFinish={onFinish} initialValues={employee}>
                <CustomInput type='text' name='firstName' placeholder='Name' />
                <CustomInput type='text' name='lastName' placeholder='Last name' />
                <CustomInput type='number' name='age' placeholder='Age' />
                <CustomInput type='text' name='address' placeholder='Address' />
                <Space>
                    <ErrorMessage message={error} />
                    <CustomButton htmlType='submit'>
                        {btnText}
                    </CustomButton>
                </Space>
            </Form>
        </Card>
    );
};

export default EmployeeForm;
