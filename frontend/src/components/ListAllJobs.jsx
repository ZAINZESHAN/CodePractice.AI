"use client";

import { useAuth } from "@/context/AuthContext";
import {
  Card,
  List,
  Button,
  Popconfirm,
  message,
  Modal,
  Form,
  Input,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const ListAllJobs = () => {
  const { token } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [form] = Form.useForm();

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/job`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data);
      console.log("Jobs",setJobs)
    } catch (err) {
      message.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchJobs();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/job/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(jobs.filter((job) => job.id !== id));
      toast.success("Job deleted successfully");
    } catch (err) {
      toast.error("Failed to delete job");
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    form.setFieldsValue({
      title: job.title,
      description: job.description,
      location: job.location,
    });
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      await axios.patch(`${BACKEND_URL}/job/update/${editingJob.id}`, values, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Job updated successfully!");
      setIsModalOpen(false);
      fetchJobs();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update job");
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
        dataSource={jobs}
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
                {job.description.length > 40
                  ? job.description.slice(0, 40) + "..."
                  : job.description}
              </p>

              <p className="text-gray-500 flex items-center gap-1 text-sm mb-4">
                <EnvironmentOutlined /> {job.location || "Not specified"}
              </p>

              <div className="flex justify-end gap-2">
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => handleEdit(job)}
                  style={{ background: "#003A70" }}
                >
                  Edit
                </Button>

                <Popconfirm
                  title="Are you sure to delete this job?"
                  onConfirm={() => handleDelete(job.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger icon={<DeleteOutlined />}>
                    Delete
                  </Button>
                </Popconfirm>
              </div>
            </Card>
          </List.Item>
        )}
      />

      {/* Edit Modal */}
      <Modal
        title="Edit Job"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleUpdate}
        okText="Update"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter job title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please enter job description" },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Location" name="location">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ListAllJobs;
