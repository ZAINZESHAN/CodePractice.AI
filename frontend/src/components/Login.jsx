"use client";

import { useState } from "react";
import { Card, Form, Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const { Text } = Typography;
const BACKEND_URL = "http://localhost:5000";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const [form] = Form.useForm();

    const redirectUser = (role) => {
        switch (role) {
            case "STUDENT":
                router.push("/routes/student-dashboard");
                break;
            case "COMPANY_ROOT":
                router.push("/routes/comproot-dashboard");
                break;
            case "COMPANY_USER":
                router.push("/module/pages/company-user/dashboard");
                break;
            case "ADMIN":
                router.push("/module/pages/admin/dashboard");
                break;
            default:
                router.push("/");
        }
    };

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const res = await axios.post(`${BACKEND_URL}/auth/login`, values);
            if (res.data.success) {
                login(res.data.user, res.data.token)
                toast.success("Login successful!");
                form.resetFields();
                redirectUser(res.data.user.role);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed!");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br p-4">
            <Card
                className="w-full max-w-md shadow-2xl rounded-2xl p-6"
                style={{ background: "#fff" }}
            >
                <h2 className="text-3xl font-bold text-center mb-6" style={{ color: "#003A70" }}>
                    Login
                </h2>

                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        name="email"
                        label={<Text style={{ color: "#003A70" }}>Email</Text>}
                        rules={[{ required: true, message: "Please enter your email" }]}
                    >
                        <Input prefix={<UserOutlined style={{ color: "#003A70" }} />} placeholder="Enter your email" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label={<Text style={{ color: "#003A70" }}>Password</Text>}
                        rules={[{ required: true, message: "Please enter your password" }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined style={{ color: "#003A70" }} />}
                            placeholder="Enter your password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            block
                            style={{
                                backgroundColor: "#003A70",
                                borderColor: "#003A70",
                                fontWeight: 600,
                            }}
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>

                <p className="text-center text-gray-600 mt-3">
                    Don’t have an account?{" "}
                    <a href="/routes/student-signup" style={{ color: "#003A70", fontWeight: 600 }}>
                        Sign Up
                    </a>
                </p>
            </Card>
        </div>
    );
}

export default Login
