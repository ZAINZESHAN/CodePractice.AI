"use client";

import React, { useState } from "react";
import { Form, Input, Button, Typography, message, Row, Col } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

const { Title, Text } = Typography;
const BACKEND_URL = "http://localhost:5000";

const CompanyAuth = () => {
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(true);
  const { setUser, setToken } = useAuth();
  const router = useRouter();

  const redirectUser = (role) => {
    if (role === "COMPANY_ROOT") router.push("/pages/company-dashboard");
    else if (role === "COMPANY_USER") router.push("/pages/company-user");
    else router.push("/");
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const endpoint = isSignup ? "register" : "login";
      const res = await axios.post(`${BACKEND_URL}/auth/${endpoint}`, values);
      if (res.data.success) {
        setUser(res.data.user);
        setToken(res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
        message.success(`${isSignup ? "Signup" : "Login"} successful!`);
        redirectUser(res.data.user.role);
      }
    } catch (err) {
      message.error(err.response?.data?.message || "Something went wrong!");
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
        padding: 10,
      }}
    >
      <div
        style={{
          width: 600,
          maxWidth: "100%",
          padding: 30,
          borderRadius: 10,
          boxShadow: "0 4px 25px rgba(0,0,0,0.2)",
          background: "#fff",
        }}
      >
        <Title level={2} style={{ color: "#003A70", textAlign: "center" }}>
          {isSignup ? "Company Signup" : "Company Login"}
        </Title>

        <Form layout="vertical" onFinish={handleSubmit} style={{ marginTop: 20 }}>
          {isSignup && (
            <>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label={<Text style={{ color: "#003A70" }}>Company Name</Text>}
                    rules={[{ required: true, message: "Please enter company name" }]}
                  >
                    <Input placeholder="Company Name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="email"
                    label={<Text style={{ color: "#003A70" }}>Email</Text>}
                    rules={[{ required: true, message: "Please enter email" }]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="description"
                    label={<Text style={{ color: "#003A70" }}>Description</Text>}
                  >
                    <Input placeholder="Description (optional)" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="location"
                    label={<Text style={{ color: "#003A70" }}>Location</Text>}
                  >
                    <Input placeholder="Location (optional)" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="website"
                    label={<Text style={{ color: "#003A70" }}>Website</Text>}
                    rules={[{ required: true, message: "Please enter website" }]}
                  >
                    <Input placeholder="Website URL" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="password"
                    label={<Text style={{ color: "#003A70" }}>Password</Text>}
                    rules={[{ required: true, message: "Please enter password" }]}
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}

          {!isSignup && (
            <>
              <Form.Item
                name="email"
                label={<Text style={{ color: "#003A70" }}>Email</Text>}
                rules={[{ required: true, message: "Please enter email" }]}
              >
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="password"
                label={<Text style={{ color: "#003A70" }}>Password</Text>}
                rules={[{ required: true, message: "Please enter password" }]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
            </>
          )}

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
            {isSignup ? "Sign Up" : "Login"}
          </Button>
        </Form>

        <Text style={{ display: "block", marginTop: 15, textAlign: "center" }}>
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <a
            style={{ color: "#003A70", fontWeight: 600, cursor: "pointer" }}
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Login" : "Sign Up"}
          </a>
        </Text>
      </div>
    </div>
  );
};

export default CompanyAuth;
