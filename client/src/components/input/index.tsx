import React from 'react';

import {Form, Input} from 'antd';

type Props = {
    name: string;
    placeholder: string;
    type?: string;
}

const CustomInput = ({
    name,
    placeholder,
    type = 'text'
                     }: Props) => {
    return (
        <Form.Item
            name={name}
            rules={[{required: true, message: 'Important field'}]}
            shouldUpdate={true}
        >
            <Input
                placeholder={placeholder}
                type={type}
                size="large"
            >

            </Input>
        </Form.Item>
    );
};

export default CustomInput;
