"use client";

import React, { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const CompUserAuth = () => {
  const [loading, setLoading] = useState(false);
  const { backendUrl } = useAuth();
  const router = useRouter();
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const companyId = localStorage.getItem("companyId");

      const payload = {
        ...values,
        companyId: Number(companyId),
      };

      const res = await axios.post(
        `${backendUrl}/auth/register-company-user`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Employee created successfully");
        form.resetFields();
        router.push("/employee/dashboard");
      }
    } catch (err) {
      const messages = err.response?.data?.message;

      if (Array.isArray(messages)) {
        // backend se array of validation errors aya
        const fields = messages.map((msg) => {
          if (msg.toLowerCase().includes("name")) {
            return { name: "name", errors: [msg] };
          }
          if (msg.toLowerCase().includes("email")) {
            return { name: "email", errors: [msg] };
          }
          if (msg.toLowerCase().includes("password")) {
            return { name: "password", errors: [msg] };
          }
          if (msg.toLowerCase().includes("company id")) {
            return { name: "companyId", errors: [msg] };
          }
          return { name: "_error", errors: [msg] };
        });
        form.setFields(fields);
      } else {
        toast.error(messages || "Something went wrong!");
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
          Company User Signup
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

export default CompUserAuth;
