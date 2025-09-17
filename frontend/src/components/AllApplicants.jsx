"use client";

import { useAuth } from "@/context/AuthContext";
import { Card, List, Select, Button } from "antd";
import {
  CalendarOutlined,
  MailOutlined,
  UserOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const { Option } = Select;
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const AllApplicant = () => {
  const { token } = useAuth();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all applicants
  const fetchApplicants = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/applications/company/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplicants(res.data);
    } catch (err) {
      toast.error("Failed to load applicants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchApplicants();
  }, [token]);

  // Handle Status Update
  const handleStatusChange = async (appId, newStatus) => {
    try {
      await axios.patch(
        `${BACKEND_URL}/applications/${appId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      toast.success("Status updated successfully!");
      setApplicants((prev) =>
        prev.map((app) =>
          app.id === appId ? { ...app, status: newStatus } : app,
        ),
      );
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div>
      <List
        loading={loading}
        grid={{
          gutter: 20,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 2,
          xxl: 3,
        }}
        dataSource={applicants}
        renderItem={(app) => (
          <List.Item>
            <Card
              className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-[#003A70]"
              title={
                <div className="flex items-center gap-2">
                  <UserOutlined className="text-[#003A70]" />
                  <span className="text-lg text-[#003A70]">
                    {app.student?.name || "N/A"}
                  </span>
                </div>
              }
              extra={
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <CalendarOutlined />{" "}
                  {new Date(app.createdAt).toLocaleDateString()}
                </span>
              }
            >
              <p className="text-gray-700 mb-1 flex items-center gap-2">
                <MailOutlined className="text-[#003A70]" /> {app.student?.email}
              </p>

              <p className="text-gray-700 mb-1">
                <b>Job:</b> {app.job?.title || "N/A"}
              </p>

              <div className="flex items-center gap-2 mt-2 mb-3">
                <span>
                  <b>Status:</b>
                </span>
                <Select
                  value={app.status}
                  style={{ width: 150 }}
                  onChange={(value) => handleStatusChange(app.id, value)}
                >
                  <Option value="PENDING">Pending</Option>
                  <Option value="ACCEPTED">Accepted</Option>
                  <Option value="REJECTED">Rejected</Option>
                </Select>
              </div>

              {/* Resume Button */}
              {app.resumeUrl ? (
                <Button
                  type="primary"
                  icon={<FileTextOutlined />}
                  href={app.resumeUrl}
                  target="_blank"
                  style={{ background: "#003A70" }}
                >
                  View Resume
                </Button>
              ) : (
                <p className="text-gray-500 italic">No resume uploaded</p>
              )}
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default AllApplicant;
