"use client";

import React, { useState } from "react";
import { Form, Input, Button, Typography, Card, Row, Col } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const { Title, Text } = Typography;

const CompRootAuth = () => {
  const [loading, setLoading] = useState(false);
  const { login, backendUrl } = useAuth();
  const router = useRouter();
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    setLoading(true);

    // trim all values
    const trimmedValues = Object.keys(values).reduce((acc, key) => {
      acc[key] = typeof values[key] === "string" ? values[key].trim() : values[key];
      return acc;
    }, {});

    try {
      const res = await axios.post(
        `${backendUrl}/auth/register-company-root`,
        trimmedValues
      );

      if (res.data.success) {
        login(res.data.user, res.data.token);
        toast.success(res.data.message);
        form.resetFields();
        router.push("/company/dashboard");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message;

      if (Array.isArray(errorMsg)) {
        // show backend validation error under each field
        errorMsg.forEach((msg) => {
          if (msg.toLowerCase().includes("name")) {
            form.setFields([{ name: "name", errors: [msg] }]);
          }
          if (msg.toLowerCase().includes("email")) {
            form.setFields([{ name: "email", errors: [msg] }]);
          }
          if (msg.toLowerCase().includes("password")) {
            form.setFields([{ name: "password", errors: [msg] }]);
          }
          if (msg.toLowerCase().includes("company")) {
            form.setFields([{ name: "companyName", errors: [msg] }]);
          }
          if (msg.toLowerCase().includes("website")) {
            form.setFields([{ name: "website", errors: [msg] }]);
          }
          if (msg.toLowerCase().includes("location")) {
            form.setFields([{ name: "location", errors: [msg] }]);
          }
          if (msg.toLowerCase().includes("description")) {
            form.setFields([{ name: "description", errors: [msg] }]);
          }
        });
      } else if (typeof errorMsg === "string") {
        toast.error(errorMsg);
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        background: "#f5f5f5",
      }}
    >
      <Card
        style={{
          width: 650,
          maxWidth: "100%",
          borderRadius: 12,
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          border: "none",
        }}
      >
        <Title level={2} style={{ color: "#003A70", textAlign: "center" }}>
          Company SignUp
        </Title>

        <Form form={form} layout="vertical" onFinish={handleSubmit} style={{ marginTop: 20 }}>
          {/* Name & Email */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label={<Text style={{ color: "#003A70" }}>Name</Text>}
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input placeholder="Your Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label={<Text style={{ color: "#003A70" }}>Email</Text>}
                rules={[{ required: true, message: "Please enter your email" }]}
              >
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
          </Row>

          {/* Password & Company Name */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="password"
                label={<Text style={{ color: "#003A70" }}>Password</Text>}
                rules={[{ required: true, message: "Please enter a password" }]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="companyName"
                label={<Text style={{ color: "#003A70" }}>Company Name</Text>}
                rules={[{ required: true, message: "Please enter company name" }]}
              >
                <Input placeholder="Company Name" />
              </Form.Item>
            </Col>
          </Row>

          {/* Location & Website */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="location" label={<Text style={{ color: "#003A70" }}>Location</Text>}>
                <Input placeholder="Location (optional)" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="website" label={<Text style={{ color: "#003A70" }}>Website</Text>}>
                <Input placeholder="Website URL (optional)" />
              </Form.Item>
            </Col>
          </Row>

          {/* Description */}
          <Form.Item name="description" label={<Text style={{ color: "#003A70" }}>Description</Text>}>
            <Input.TextArea placeholder="Description (optional)" rows={3} />
          </Form.Item>

          {/* Submit Button */}
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            style={{
              backgroundColor: "#003A70",
              borderColor: "#003A70",
              fontWeight: 600,
              marginTop: 10,
            }}
          >
            Sign Up
          </Button>

          {/* Back to Home button */}
          <Button
            block
            style={{
              marginTop: 10,
              fontWeight: 600,
            }}
          >
            <Link href="/" style={{ color: "#003A70" }}>
              Back to Home
            </Link>
          </Button>
        </Form>

        {/* Already have account */}
        <Text style={{ display: "block", marginTop: 15, textAlign: "center" }}>
          Already have an account?{" "}
          <Link href={"/login"} style={{ color: "#003A70", fontWeight: 600, cursor: "pointer" }}>
            Login
          </Link>
        </Text>
      </Card>
    </div>
  );
};

export default CompRootAuth;
