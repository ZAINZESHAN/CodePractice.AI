"use client";

import React, { useState } from "react";
import { Card, Button, Upload, Table, List, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const StudentDashboard = () => {
  // 🔹 Dummy states (baad me API se aayenge)
  const [resume, setResume] = useState(null);
  const appliedJobs = []; // empty for now
  const recommendedJobs = [
    { id: 1, title: "Frontend Developer", company: "ABC Pvt Ltd" },
    { id: 2, title: "Backend Developer", company: "XYZ Tech" },
  ];
  const interviews = []; // empty
  const notifications = [
    "Welcome to CampusRecruit 🎉",
    "Update your profile to get better job recommendations.",
  ];

  // 🔹 Resume Upload
  const handleResumeUpload = (info) => {
    if (info.file.status === "done") {
      setResume(info.file.name);
      message.success(`${info.file.name} uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} upload failed`);
    }
  };

  // 🔹 Table columns for Applied Jobs
  const jobColumns = [
    { title: "Job Title", dataIndex: "title", key: "title" },
    { title: "Company", dataIndex: "company", key: "company" },
    { title: "Status", dataIndex: "status", key: "status" },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold text-[#003A70] mb-6">
        🎓 Student Dashboard
      </h1>

      {/* Profile + Resume */}
      <Card title="Profile & Resume" className="mb-6 shadow-md rounded-2xl">
        <p><b>Name:</b> John Doe</p>
        <p><b>Email:</b> john@example.com</p>
        <p><b>University:</b> ABC University</p>
        <p><b>CGPA:</b> 3.6</p>
        <div className="mt-4">
          <p><b>Resume:</b> {resume ? resume : "No resume uploaded"}</p>
          <Upload
            name="resume"
            action="/api/upload" // 🔹 backend API later
            onChange={handleResumeUpload}
          >
            <Button icon={<UploadOutlined />}>Upload Resume</Button>
          </Upload>
        </div>
      </Card>

      {/* Applied Jobs */}
      <Card title="Applied Jobs" className="mb-6 shadow-md rounded-2xl">
        {appliedJobs.length > 0 ? (
          <Table dataSource={appliedJobs} columns={jobColumns} rowKey="id" />
        ) : (
          <p>No jobs applied yet.</p>
        )}
      </Card>

      {/* Recommended Jobs */}
      <Card title="Recommended Jobs" className="mb-6 shadow-md rounded-2xl">
        {recommendedJobs.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {recommendedJobs.map((job) => (
              <Card key={job.id} className="shadow-sm border">
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-gray-600">{job.company}</p>
                <Button type="primary" className="mt-2">Apply</Button>
              </Card>
            ))}
          </div>
        ) : (
          <p>No job recommendations yet.</p>
        )}
      </Card>

      {/* Interviews */}
      <Card title="Upcoming Interviews" className="mb-6 shadow-md rounded-2xl">
        {interviews.length > 0 ? (
          <ul>
            {interviews.map((iv) => (
              <li key={iv.id}>
                {iv.company} - {iv.date} at {iv.time}
              </li>
            ))}
          </ul>
        ) : (
          <p>No interviews scheduled.</p>
        )}
      </Card>

      {/* Notifications */}
      <Card title="Notifications" className="mb-6 shadow-md rounded-2xl">
        <List
          dataSource={notifications}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </Card>
    </div>
  );
};

export default StudentDashboard;
