"use client";

import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const StudentAuth = () => {
  const [loading, setLoading] = useState(false);
  const { login, backendUrl } = useAuth();
  const router = useRouter();
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    setLoading(true);
    const trimmedValues = {
      ...values,
      name: values.name?.trim(),
      email: values.email?.trim(),
      password: values.password?.trim(),
    };
    try {
      const res = await axios.post(`${backendUrl}/auth/register`, trimmedValues);
      console.log(res.data);
      if (res.data.success) {
        login(res.data.user, res.data.token);
        toast.success(res.data.message);
        form.resetFields();
        router.push("/student/dashboard");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message;

      if (Array.isArray(errorMsg)) {
        // email error check
        const emailError = errorMsg.find((msg) =>
          msg.toLowerCase().includes("email")
        );
        if (emailError) {
          form.setFields([
            {
              name: "email",
              errors: [emailError],
            },
          ]);
        }

        // password error check
        const passwordError = errorMsg.find((msg) =>
          msg.toLowerCase().includes("password")
        );
        if (passwordError) {
          form.setFields([
            {
              name: "password",
              errors: [passwordError],
            },
          ]);
        }

        // name error check (extra for register)
        const nameError = errorMsg.find((msg) =>
          msg.toLowerCase().includes("name")
        );
        if (nameError) {
          form.setFields([
            {
              name: "name",
              errors: [nameError],
            },
          ]);
        }
      } else if (typeof errorMsg === "string") {
        toast.error(errorMsg);
      } else {
        toast.error("Registration failed!");
      }
    }
    setLoading(false);
  };

return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    }}
  >
    {/* Back Button - Top Left */}
    <div style={{ position: "absolute", top: 20, left: 20 }}>
      <Link href="/">
        <Button
          icon={<ArrowLeftOutlined />}
          style={{
            backgroundColor: "#f5f5f5",
            borderColor: "#d9d9d9",
            color: "#003A70",
            fontWeight: 500,
          }}
        >
          Back to Home
        </Button>
      </Link>
    </div>

    <div
      style={{
        width: 400,
        padding: 30,
        borderRadius: 10,
        boxShadow: "0 4px 25px rgba(0,0,0,0.2)",
        background: "#fff",
      }}
    >
      <Title level={2} style={{ color: "#003A70", textAlign: "center" }}>
        Student Signup
      </Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ marginTop: 20 }}
      >
        <Form.Item
          name="name"
          label={<Text style={{ color: "#003A70" }}>Username</Text>}
          rules={[{ required: true, message: "Please enter username" }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>

        <Form.Item
          name="email"
          label={<Text style={{ color: "#003A70" }}>Email</Text>}
          rules={[{ required: true, message: "Please enter email" }]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          name="password"
          label={<Text style={{ color: "#003A70" }}>Password</Text>}
          rules={[{ required: true, message: "Please enter password" }]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          block
          loading={loading}
          style={{
            backgroundColor: "#003A70",
            borderColor: "#003A70",
            fontWeight: 600,
          }}
        >
          Sign Up
        </Button>
      </Form>

      <Text style={{ display: "block", marginTop: 15, textAlign: "center" }}>
        Already have an account?{" "}
        <Link
          href={"/login"}
          style={{ color: "#003A70", fontWeight: 600, cursor: "pointer" }}
        >
          Login
        </Link>
      </Text>
    </div>
  </div>
);

};

export default StudentAuth;
