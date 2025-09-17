"use client";

import React, { useState } from "react";
import { Form, Input, Button, Typography, message, Card, Row, Col } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const { Title, Text } = Typography;
const BACKEND_URL = "http://localhost:5000";

const CompRootAuth = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const [form] = Form.useForm(); // <- Form instance

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${BACKEND_URL}/auth/register-company-root`,
        values,
      );
      if (res.data.success) {
        login(res.data.user, res.data.token);
        toast.success(res.data.message);
        form.resetFields(); // <- Reset form fields after successful signup
        router.push("/routes/comproot-dashboard");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false); // <- Stop loading in finally
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

        <Form
          form={form} // <- Attach form instance
          layout="vertical"
          onFinish={handleSubmit}
          style={{ marginTop: 20 }}
        >
          {/* Signup Fields */}

          <>
            {/* Name & Email */}
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label={<Text style={{ color: "#003A70" }}>Name</Text>}
                  rules={[
                    { required: true, message: "Please enter your name" },
                  ]}
                >
                  <Input placeholder="Your Name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label={<Text style={{ color: "#003A70" }}>Email</Text>}
                  rules={[
                    { required: true, message: "Please enter your email" },
                  ]}
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
                  rules={[
                    { required: true, message: "Please enter a password" },
                  ]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="companyName"
                  label={<Text style={{ color: "#003A70" }}>Company Name</Text>}
                  rules={[
                    { required: true, message: "Please enter company name" },
                  ]}
                >
                  <Input placeholder="Company Name" />
                </Form.Item>
              </Col>
            </Row>

            {/* Location & Website */}
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="location"
                  label={<Text style={{ color: "#003A70" }}>Location</Text>}
                >
                  <Input placeholder="Location (optional)" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="website"
                  label={<Text style={{ color: "#003A70" }}>Website</Text>}
                >
                  <Input placeholder="Website URL (optional)" />
                </Form.Item>
              </Col>
            </Row>

            {/* Description */}
            <Form.Item
              name="description"
              label={<Text style={{ color: "#003A70" }}>Description</Text>}
            >
              <Input.TextArea placeholder="Description (optional)" rows={3} />
            </Form.Item>
          </>

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
        </Form>

        <Text style={{ display: "block", marginTop: 15, textAlign: "center" }}>
          Already have an account?{" "}
          <Link
            href={"/routes/login"}
            style={{ color: "#003A70", fontWeight: 600, cursor: "pointer" }}
          >
            Login
          </Link>
        </Text>
      </Card>
    </div>
  );
};

export default CompRootAuth;
