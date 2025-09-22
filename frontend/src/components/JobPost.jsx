"use client";

import React, { useState } from "react";
import { Input, Button, Card } from "antd";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const JobPost = () => {
  const { token, backendUrl } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [job, setJob] = useState({
    title: "",
    description: "",
    salary: "",
    location: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    salary: "",
    location: "",
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!job.title) newErrors.title = "Please fill the Job Title";
    if (!job.description) newErrors.description = "Please fill the Job Description";
    if (!job.salary) newErrors.salary = "Please fill the Job Salary";
    if (!job.location) newErrors.location = "Please fill the Job Location";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      const res = await axios.post(
        `${backendUrl}/job/create`,
        { ...job, salary: Number(job.salary) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data?.id) {
        setJob({ title: "", description: "", salary: "", location: "" });
        router.push("/company/dashboard");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message;

      if (Array.isArray(errorMsg)) {
        const newErrors = {};
        errorMsg.forEach((msg) => {
          if (msg.toLowerCase().includes("title")) newErrors.title = msg;
          if (msg.toLowerCase().includes("description")) newErrors.description = msg;
          if (msg.toLowerCase().includes("salary")) newErrors.salary = msg;
          if (msg.toLowerCase().includes("location")) newErrors.location = msg;
        });
        setErrors(newErrors);
      } else if (typeof errorMsg === "string") {
        // agar single string error ho
        console.error(errorMsg);
      } else {
        console.error("Job post error:", err.response?.data || err.message);
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col items-center py-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[4vw]">
      {/* Top-left arrow button */}
      <div className="w-full flex justify-start mb-6">
        <Button
          type="default"
          icon={<ArrowLeftOutlined />}
          onClick={() => router.push("/company/dashboard")}
          className="rounded bg-gray-200 hover:bg-gray-300"
          style={{ padding: "6px 10px" }}
        />
      </div>

      {/* Card */}
      <Card
        className="w-full md:w-[60%] shadow-md"
        style={{ borderRadius: "12px" }}
      >
        <h2 className="text-2xl font-bold text-[#003A70] mb-8 text-center">
          Post a Job
        </h2>

        <div className="flex flex-col gap-6">
          {/* Job Title */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Job Title
            </label>
            <Input
              name="title"
              value={job.title}
              onChange={handleChange}
              placeholder="Enter job title"
              className={`h-[45px] border-gray-300 ${errors.title && "border-red-500"}`}
            />
            {errors.title && <span className="text-red-500 text-sm mt-1">{errors.title}</span>}
          </div>

          {/* Job Description */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Job Description
            </label>
            <TextArea
              name="description"
              value={job.description}
              onChange={handleChange}
              placeholder="Enter job description"
              rows={5}
              className={`border-gray-300 ${errors.description && "border-red-500"}`}
            />
            {errors.description && <span className="text-red-500 text-sm mt-1">{errors.description}</span>}
          </div>

          {/* Job Salary */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Job Salary
            </label>
            <Input
              type="number"
              name="salary"
              value={job.salary}
              onChange={handleChange}
              placeholder="Enter job salary"
              className={`h-[45px] border-gray-300 ${errors.salary && "border-red-500"}`}
            />
            {errors.salary && <span className="text-red-500 text-sm mt-1">{errors.salary}</span>}
          </div>

          {/* Job Location */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Job Location
            </label>
            <Input
              name="location"
              value={job.location}
              onChange={handleChange}
              placeholder="Enter job location"
              className={`h-[45px] border-gray-300 ${errors.location && "border-red-500"}`}
            />
            {errors.location && <span className="text-red-500 text-sm mt-1">{errors.location}</span>}
          </div>

          {/* Submit Button */}
          <Button
            type="primary"
            loading={loading}
            onClick={handleSubmit}
            disabled={loading}
            style={{
              background: "#003A70",
              fontWeight: "500",
              height: "45px",
              borderRadius: "6px",
            }}
          >
            Post Job
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default JobPost;
