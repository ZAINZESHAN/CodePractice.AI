"use client";

import React, { useState } from "react";
import { Input, Button, Card, message } from "antd";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const { TextArea } = Input;

const JobPost = () => {
  const { token } = useAuth(); // auth se token nikalna
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [job, setJob] = useState({
    title: "",
    description: "",
    salary: "",
    location: "",
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!job.title || !job.description || !job.location || !job.salary) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/job/create`,
        { ...job, salary: Number(job.salary) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(res)

      if (res.data?.id) {
        toast.success("Job posted successfully!");
        setJob({ title: "", description: "", location: "", salary: "" });
        void router.push("/routes/comproot-dashboard");
      } else {
        toast.warning("Job created but no response data received!");
      }
    } catch (err) {
      console.error("Job post error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center py-10">
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
              className="h-[45px] border-gray-300"
            />
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
              className="border-gray-300"
            />
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
              className="h-[45px] border-gray-300"
            />
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
              className="h-[45px] border-gray-300"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="primary"
            loading={loading}
            onClick={handleSubmit}
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
