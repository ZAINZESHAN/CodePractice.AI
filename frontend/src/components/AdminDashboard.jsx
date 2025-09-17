"use client";

import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Table,
  Spin,
  Popconfirm,
  Button,
  message,
  Drawer,
} from "antd";
import {
  ApartmentOutlined,
  FileTextOutlined,
  UserOutlined,
  TeamOutlined,
  DeleteOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

const { Sider, Content, Header } = Layout;

const AdminDashboard = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [students, setStudents] = useState([]);
  const [companyUsers, setCompanyUsers] = useState([]);
  const [selectedKey, setSelectedKey] = useState("companies");
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Fetch functions
  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/companies`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setCompanies(res.data);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch companies");
    } finally {
      setLoading(false);
    }
  };
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/job/all`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setJobs(res.data);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/students`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };
  const fetchCompanyUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/company-users`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setCompanyUsers(res.data);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch company users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      if (selectedKey === "companies") fetchCompanies();
      else if (selectedKey === "jobs") fetchJobs();
      else if (selectedKey === "students") fetchStudents();
      else if (selectedKey === "company-users") fetchCompanyUsers();
    }
  }, [token, selectedKey]);

  // Delete handlers
  const handleDeleteCompany = async (id) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/companies/${id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success("Company deleted successfully!");
      fetchCompanies();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete company");
    }
  };
  const handleDeleteJob = async (id) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/job/delete/${id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success("Job deleted successfully!");
      fetchJobs();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete job");
    }
  };

  // Table columns
  const companyColumns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Company Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Location", dataIndex: "location", key: "location" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this company?"
          onConfirm={() => handleDeleteCompany(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];
  const jobColumns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Salary", dataIndex: "salary", key: "salary" },
    { title: "Company", dataIndex: ["company", "name"], key: "company" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this job?"
          onConfirm={() => handleDeleteJob(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];
  const studentColumns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
  ];
  const companyUserColumns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
  ];

  const menuItems = [
    { key: "companies", icon: <ApartmentOutlined />, label: "All Companies" },
    { key: "jobs", icon: <FileTextOutlined />, label: "All Jobs" },
    { key: "students", icon: <UserOutlined />, label: "All Students" },
    { key: "company-users", icon: <TeamOutlined />, label: "Company Users" },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Top Header */}
      <Header
        className="bg-white shadow-md flex items-center px-6 justify-between"
        style={{ background: "white" }}
      >
        <h1 className="text-3xl font-bold text-[#003A70]">Admin Panel</h1>

        {/* Show menu button only on screens smaller than md */}
        <div className="md:hidden">
          <Button
            icon={<MenuOutlined />}
            onClick={() => setDrawerVisible(true)}
          />
        </div>
      </Header>

      <Layout>
        {/* Sidebar */}
        <Sider
          breakpoint="md"
          collapsedWidth="0"
          className="hidden md:block" // Hide on small screens
          width={250}
          style={{ backgroundColor: "#f5f5f5", paddingTop: 24 }}
        >
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={(e) => setSelectedKey(e.key)}
            style={{ backgroundColor: "#f5f5f5" }}
            items={menuItems}
          />
        </Sider>

        {/* Drawer for mobile */}
        <Drawer
          title="Menu"
          placement="left"
          onClose={() => setDrawerVisible(false)}
          visible={drawerVisible}
          bodyStyle={{ padding: 0 }}
        >
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={(e) => {
              setSelectedKey(e.key);
              setDrawerVisible(false);
            }}
            items={menuItems}
            style={{ height: "100%", borderRight: 0 }}
          />
        </Drawer>

        {/* Main Content */}
        <Content
          style={{ margin: "24px", padding: 24, backgroundColor: "#ffffff" }}
        >
          {loading ? (
            <Spin size="large" />
          ) : selectedKey === "companies" ? (
            <Table
              dataSource={companies}
              columns={companyColumns}
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
          ) : selectedKey === "jobs" ? (
            <Table
              dataSource={jobs}
              columns={jobColumns}
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
          ) : selectedKey === "students" ? (
            <Table
              dataSource={students}
              columns={studentColumns}
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
          ) : (
            <Table
              dataSource={companyUsers}
              columns={companyUserColumns}
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
