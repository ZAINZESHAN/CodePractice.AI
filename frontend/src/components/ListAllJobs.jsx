import {
  ArrowRightOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Button, Card, List } from "antd";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import arrow_icon from "../assets/right-arrow.png";

const ListAllJobs = () => {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [jobs, setJobs] = useState();
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/job/all`);
      setJobs(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleApply = () => {
    console.log('hello zain you click to aply')
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
                  onClick={handleApply}
                  className="text-[#003A70] transition-all duration-300 hover:scale-105 hover:border-white   flex items-center gap-1"
                  style={{
                    border: "none",
                    background: "#f5f5f5",
                    color: "#003A70",
                    hover: "scale",
                  }}
                >
                  <Image className="w-[20px]" src={arrow_icon} />
                  Easy to Apply
                </Button>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ListAllJobs;
