import React, {useState} from 'react';
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUser} from "../../features/auth/authSlice";
import {useGetEmployeeQuery, useRemoveEmployeeMutation} from "../../app/services/employees";
import Layout from "../../components/layout";
import {Descriptions, Divider, Modal, Space} from "antd";
import CustomButton from "../../components/button";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import ErrorMessage from "../../components/error-message";
import {Paths} from "../../paths";
import {isErrorWithMessage} from "../../utils/is-error-with-message";


const Employee = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const params = useParams<{id: string}>();
    const user = useSelector(selectUser);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {data, isLoading} = useGetEmployeeQuery(params.id || "");
    const [removeEmployee] = useRemoveEmployeeMutation();

    const showModal = () => {
        setIsModalOpen(true)
    }

    const hideModal = () => {
        setIsModalOpen(false)
    }

    const handleDeleteUser = async () => {
        hideModal()
        try {
            if (data) {
                await removeEmployee(data.id).unwrap();
                navigate(`${Paths.status}/deleted`)
            }
        } catch (error) {
            const maybeError = isErrorWithMessage(error);

            if (maybeError) {
                setError(error.data.message);
            } else {
                setError("Unknown error")
            }
        }
    }

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (!data) {
        return <Navigate to="/" />
    }

    return (
        <Layout>
            <Descriptions title="Information about employee" bordered size="middle">
                <Descriptions.Item label="name" span={3}>
                    {
                        `${data.firstName} ${data.lastName}`
                    }
                </Descriptions.Item>
                <Descriptions.Item label="age" span={3}>
                    {data.age}
                </Descriptions.Item>
                <Descriptions.Item label="address" span={3}>
                    {data.address}
                </Descriptions.Item>
            </Descriptions>
            {
                user?.id === data.userId && (
                    <>
                        <Divider orientation="left">Description</Divider>
                        <Space>
                            <Link to={`/employee/edit/${data.id}`}>
                                <CustomButton
                                    shape="round"
                                    type="default"
                                    icon={<EditOutlined/>}
                                >
                                    Edit
                                </CustomButton>
                            </Link>
                            <CustomButton
                                shape="round"
                                type="default"
                                danger
                                onClick= {showModal}
                                icon={<DeleteOutlined/>}

                            >
                                Delete employee
                            </CustomButton>
                        </Space>
                    </>
                )
            }
            <ErrorMessage message={error}/>
            <Modal
                title="confirm delete"
                open={isModalOpen}
                onOk={handleDeleteUser}
                onCancel={hideModal}
                okText="Confirm"
                cancelText="Decline"
            >
                Do you really want delete employee from table?
            </Modal>
        </Layout>
    );
};

export default Employee;
