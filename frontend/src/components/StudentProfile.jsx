"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  Avatar,
  Row,
  Col,
  Typography,
  Divider,
  Button,
  Spin,
  List,
  Tag,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const { Title, Text, Paragraph } = Typography;

const StudentProfile = () => {
  const { user, token } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/applications/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplications(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchApplications();
  }, [token]);

  console.log(user)

  return (
    <div className="min-h-[70vh] bg-[#f5f9ff]">
      <Card className="w-full shadow-lg rounded-2xl border border-gray-200">
        <Row gutter={[24, 24]}>
          {/* Left Side: Avatar + Info */}
          <Col
            xs={24}
            md={8}
            className="flex bg-gray-200 pt-20 flex-col text-center"
          >
            <Avatar
              size={120}
              src={user?.avatar || null}
              icon={!user?.avatar && <UserOutlined />}
              className="mb-4"
            />
            <Title level={3}>{user?.name || "Student Name"}</Title>
            <Text type="secondary">{user?.role || "Student"}</Text>
            <Divider />
            <div className="space-y-2 text-left w-full">
              <p>
                <MailOutlined className="mr-2 text-blue-600" />
                {user?.email || "student@email.com"}
              </p>
              <p>
                <PhoneOutlined className="mr-2 text-blue-600" />
                {user?.phoneNumber || "+92-300-0000000"}
              </p>
            </div>
          </Col>

          {/* Right Side: About + Resume + Applications */}
          <Col xs={24} md={16} className=" pt-4">
            <Divider />

            <Title level={4}>Resume</Title>
            {user?.resumeUrl ? (
              <Button
                type="primary"
                icon={<FileTextOutlined />}
                href={user.resumeUrl}
                target="_blank"
                style={{ background: "#003A70" }}
              >
                View Resume
              </Button>
            ) : (
              <Text type="secondary">No resume uploaded yet.</Text>
            )}

            <Divider />

            <h2 className="text-xl font-semibold text-[#003A70] mb-4">
              My Job Applications
            </h2>

            {loading ? (
              <Spin />
            ) : applications.length === 0 ? (
              <p className="text-gray-600">
                You have not applied for any jobs yet.
              </p>
            ) : (
              <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={applications}
                renderItem={(app) => (
                  <List.Item>
                    <Card className="shadow-md">
                      <h3 className="text-lg font-medium text-[#003A70]">
                        {app.job.title}
                      </h3>
                      <p className="text-gray-600">
                        Company: {app.job.company?.name || "N/A"}
                      </p>
                      <p className="text-gray-600">
                        Location: {app.job.location || "N/A"}
                      </p>
                      <Tag
                        color={
                          app.status === "PENDING"
                            ? "orange"
                            : app.status === "ACCEPTED"
                              ? "green"
                              : "red"
                        }
                      >
                        {app.status}
                      </Tag>
                    </Card>
                  </List.Item>
                )}
              />
            )}
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default StudentProfile;
