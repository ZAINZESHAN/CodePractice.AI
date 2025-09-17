"use client";

import {
  CalendarOutlined,
  EnvironmentOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Card, List, Modal, Form, Input, Upload } from "antd";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import arrow_icon from "../assets/right-arrow.png";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const ListAllJobs = ({ searchQuery = "" }) => {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { token, user, updateUser } = useAuth();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [form] = Form.useForm();

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/job/all`);
      setJobs(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // ✅ Search filter (title + company name)
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company?.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleApply = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
    form.setFieldsValue({
      name: user?.name || "",
      email: user?.email || "",
    });
  };

  const uploadResumeToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
      { method: "POST", body: data },
    );
    const json = await res.json();
    if (!res.ok)
      throw new Error(json.error?.message || "Cloudinary upload failed");
    return json.secure_url;
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const file = values.resume?.[0]?.originFileObj;
      if (!file) throw new Error("Please attach your resume file");

      const resumeUrl = await uploadResumeToCloudinary(file);

      await axios.post(
        `${BACKEND_URL}/applications/apply`,
        {
          jobId: selectedJob.id,
          phoneNumber: values.number.toString(),
          resumeUrl,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      updateUser({ resumeUrl });
      toast.success("Job applied successfully 🎉");
      setIsModalOpen(false);
      form.resetFields();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-3xl text-[#002C55]" style={{ fontWeight: "600" }}>
          Available Job Opportunities
        </h1>
        <p className="text-gray-600 mt-2">
          Browse and apply to the latest openings from top companies tailored
          for students.
        </p>
      </div>

      <List
        loading={loading}
        grid={{ gutter: 20, xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 3 }}
        dataSource={filteredJobs}
        renderItem={(job) => (
          <List.Item>
            <Card
              className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-[#003A70]"
              title={<h1 className="text-lg text-[#003A70]">{job.title}</h1>}
              extra={
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <CalendarOutlined />{" "}
                  {new Date(job.createdAt).toLocaleDateString()}
                </span>
              }
            >
              <p className="text-gray-700 mb-2">
                <b>Desc: </b>
                {job.description.length > 40
                  ? job.description.slice(0, 40) + "..."
                  : job.description}
              </p>
              <p className="text-gray-700 mb-2">
                <b>Salary: </b>
                {job.salary}
              </p>
              <p className="text-gray-500 flex items-center gap-1 text-sm mb-4">
                <EnvironmentOutlined style={{ color: "black" }} />{" "}
                {job.location || "Not specified"}
              </p>

              <div className="flex justify-end gap-2">
                <Button
                  type="primary"
                  onClick={() => handleApply(job)}
                  className="text-[#003A70] transition-all duration-300 hover:scale-105 hover:border-white flex items-center gap-1"
                  style={{
                    border: "none",
                    background: "#f5f5f5",
                    color: "#003A70",
                  }}
                >
                  <Image className="w-[20px]" src={arrow_icon} alt="arrow" />
                  Easy to Apply
                </Button>
              </div>
            </Card>
          </List.Item>
        )}
      />

      {/* ✅ Modal for Apply */}
      <Modal
        title={
          <h2 className="text-[#003A70] text-lg font-semibold">
            Apply for {selectedJob?.title}
          </h2>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit Application"
        cancelText="Cancel"
        okButtonProps={{
          style: { background: "#003A70", borderColor: "#003A70" },
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Full Name" name="name">
            <Input disabled />
          </Form.Item>

          <Form.Item label="Email Address" name="email">
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="number"
            rules={[
              { required: true, message: "Please enter your phone number" },
            ]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>

          <Form.Item
            label="Upload Resume"
            name="resume"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            rules={[{ required: true, message: "Please upload your resume" }]}
          >
            <Upload
              beforeUpload={() => false}
              maxCount={1}
              accept=".pdf,.doc,.docx"
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ListAllJobs;
