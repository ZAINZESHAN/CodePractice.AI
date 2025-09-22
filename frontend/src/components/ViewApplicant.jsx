"use client";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, List, Button, Select } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";

const { Option } = Select;

const ViewApplicant = () => {
  const { token, backendUrl } = useAuth();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const router = useRouter(); // router for navigation

  const fetchApplicants = async (id) => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await axios.get(`${backendUrl}/applications/job/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplicants(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load applicants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants(jobId);
  }, [token, jobId]);

  const handleStatusChange = async (appId, newStatus) => {
    try {
      await axios.patch(
        `${backendUrl}/applications/${appId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setApplicants((prev) =>
        prev.map((app) =>
          app.id === appId ? { ...app, status: newStatus } : app
        )
      );
      toast.success("Status updated successfully!");
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="p-4">
      <div className="my-8">
        <div className="flex items-center justify-between mb-6">
          {/* Left-aligned button */}
          <Button
            type="default"
            icon={<ArrowLeftOutlined />}
            onClick={() => router.push("/company/dashboard")}
            className="rounded bg-gray-200 hover:bg-gray-300"
            style={{ padding: "6px 10px" }}
          />
          {/* Centered heading */}
          <h2
            className="text-[28px] font-bold text-[#003A70] absolute left-1/2 transform -translate-x-1/2"
            style={{ fontWeight: "600" }}
          >
            View Applicants
          </h2>
        </div>
      </div>

      <List
        loading={loading}
        grid={{ gutter: 20, xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 3 }}
        dataSource={applicants}
        renderItem={(app) => (
          <List.Item>
            <Card
              className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-[#003A70]"
              title={
                <h1 className="text-lg text-[#003A70]">
                  {app.student.name
                    ? app.student.name.charAt(0).toUpperCase() +
                    app.student.name.slice(1).toLowerCase()
                    : "N/A"}
                </h1>
              }
              extra={
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <UserOutlined /> {app.student.email}
                </span>
              }
            >
              <p className="text-gray-700 mb-2">
                <b>Phone: </b>
                {app.phoneNumber}
              </p>

              <p className="text-gray-700 mb-2 flex items-center gap-1">
                <FileTextOutlined />{" "}
                <a
                  href={app.student.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Resume
                </a>
              </p>

              <div className="mt-2">
                <span className="mr-2 font-semibold">Status:</span>
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
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ViewApplicant;
