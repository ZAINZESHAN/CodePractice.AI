"use client";

import { useAuth } from "@/context/AuthContext";
import {
  CalendarOutlined,
  DeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Card, List, message, Popconfirm } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const CompUserList = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/users/company-users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (error) {
      message.error("Failed to load Employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/users/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user.id !== id));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  console.log(users);
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
        dataSource={users}
        renderItem={(user) => (
          <List.Item>
            <Card
              className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-[#003A70]"
              title={
                <h1 className="text-lg font-semibold text-[#003A70]">
                  {user.name?.toUpperCase() || "UNKNOWN"}
                </h1>
              }
              extra={
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <CalendarOutlined />{" "}
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              }
            >
              <p className="text-gray-700 flex items-center gap-1">
                <UserOutlined /> {user.email?.toLowerCase()}
              </p>
              <div className="flex justify-end gap-2">
                <Popconfirm
                  title="Are you sure to delete this job?"
                  onConfirm={() => handleDelete(user.id)}
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
    </div>
  );
};

export default CompUserList;
