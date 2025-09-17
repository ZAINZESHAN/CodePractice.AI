"use client";

import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";

const { Sider, Content, Header } = Layout;

const AdminDashboard = () => {
  const [selectedKey, setSelectedKey] = useState("students");

  const renderContent = () => {
    switch (selectedKey) {
      case "students":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">All Students</h2>
            <ul className="list-disc pl-6">
              <li>Student 1</li>
              <li>Student 2</li>
              <li>Student 3</li>
            </ul>
          </div>
        );
      case "companyRoot":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">All Company Roots</h2>
            <ul className="list-disc pl-6">
              <li>Company Root 1</li>
              <li>Company Root 2</li>
              <li>Company Root 3</li>
            </ul>
          </div>
        );
      case "companyUser":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">All Company Users</h2>
            <ul className="list-disc pl-6">
              <li>Company User 1</li>
              <li>Company User 2</li>
              <li>Company User 3</li>
            </ul>
          </div>
        );
      default:
        return <h2>Welcome to Admin Dashboard</h2>;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="text-white text-xl font-bold text-center py-4">
          Admin Panel
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={(e) => setSelectedKey(e.key)}
          items={[
            {
              key: "students",
              icon: <UserOutlined />,
              label: "All Students",
            },
            {
              key: "companyRoot",
              icon: <ApartmentOutlined />,
              label: "All Company Roots",
            },
            {
              key: "companyUser",
              icon: <TeamOutlined />,
              label: "All Company Users",
            },
          ]}
        />
      </Sider>

      {/* Right Content */}
      <Layout>
        <Header className="bg-white shadow-md px-6">
          <h1 className="text-xl font-semibold text-[#002C55]">
            Admin Dashboard
          </h1>
        </Header>
        <Content style={{ margin: "24px 16px", padding: 24 }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
