"use client";
import "../app/globals.css";
import {
  PlusOutlined,
  UnorderedListOutlined,
  TeamOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import { Button, Card } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import job_img from "../assets/job-img.png";
import Image from "next/image";
import CompUserList from "./CompUserList";
import ListAllCompanyJobs from "./ListAllCompanyJobs";
import AllApplicants from "./AllApplicants";
import { useRouter } from "next/navigation";

const CompRootDashboard = () => {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);

  // const steps = [
  //   {
  //     title: "Create your free account",
  //     description:
  //       "All you need is your email address to create an account and start building your job post.",
  //     icon: <div className="text-[#003A70] text-xl font-bold mb-7">1</div>,
  //   },
  //   {
  //     title: "Build your job post",
  //     description:
  //       "Then just add a title, description, and location to your job post, and you're ready to go.",
  //     icon: <div className="text-[#003A70] text-xl font-bold mb-7">2</div>,
  //   },
  //   {
  //     title: "Post Your Job",
  //     description:
  //       "After you post your job use our state of the art tools to help you find dream talent.",
  //     icon: <div className="text-[#003A70] text-xl font-bold mb-7">3</div>,
  //   },
  // ];

  const quickActions = [
    {
      title: "Post a Job",
      path: "/routes/job-posting",
      icon: <PlusOutlined className="text-2xl text-[#003A70]" />,
    },
    {
      title: "Manage Jobs",
      path: "/routes/managecompany-jobs",
      icon: <UnorderedListOutlined className="text-2xl text-[#003A70]" />,
    },
    {
      title: "View Applications",
      path: "/routes/all-applicants",
      icon: <FileSearchOutlined className="text-2xl text-[#003A70]" />,
    },
    {
      title: "Manage Users",
      path: "/routes/managecompany-users",
      icon: <TeamOutlined className="text-2xl text-[#003A70]" />,
    },
  ];

  return (
    <div className="flex flex-col items-center pb-20">
      {/* Hero Section */}
      <div className="w-[100%] lg:w-[80%] h-[100vh] md:h-[60vh] flex flex-col md:flex-row">
        <div className="md:w-[50%] pt-10 px-10 md:px-0 md:pt-0 md:h-full flex flex-col justify-center text-white   text-center md:text-left">
          <h1 className="text-[40px] md:text-[50px] text-black font-bold leading-snug">
            Let's make your next <br /> great hire. Fast.
          </h1>
          <button
            onClick={() => {
              setDisabled(true);
              router.push("/routes/job-posting");
            }}
            disabled={disabled}
            className={`mt-6 bg-[#003A70] md:w-[180px] h-[50px] rounded-md font-bold text-white transition-all duration-300 hover:scale-105 ${
              disabled
                ? "opacity-50 cursor-not-allowed hover:scale-100"
                : "cursor-pointer"
            }`}
          >
            Post a job
          </button>
        </div>
        <div className="md:w-[50%] overflow-hidden flex justify-center items-center">
          <Image
            className="lg:w-[500px] lg:h-[500px]"
            src={job_img}
            alt="Job posting"
          />
        </div>
      </div>

      {/* Steps Section */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-20 px-6 lg:px-0 w-full lg:w-[80%]">
        {steps.map((step, index) => (
          <Card
            key={index}
            className="shadow-md hover:shadow-xl transition-all duration-300 mb-8"
            style={{ borderRadius: "12px" }}
          >
            <div>{step.icon}</div>
            <h3 className="text-[24px] font-semibold text-black mb-4">
              {step.title}
            </h3>
            <p className="text-gray-600">{step.description}</p>
          </Card>
        ))}
      </div> */}

      {/* Quick Actions */}
      <div className="w-full lg:w-[80%] mt-12 px-6 lg:px-0">
        <h2
          className="text-[28px] font-bold text-[#003A70] mb-6"
          style={{ fontWeight: "600" }}
        >
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.path}>
              <Card
                hoverable
                className="flex flex-col items-center text-center gap-2 justify-center shadow-md hover:shadow-xl transition-all duration-300"
                style={{ borderRadius: "12px", height: "160px" }}
              >
                {action.icon}
                <p className="mt-4 font-medium text-[#003A70] text-lg">
                  {action.title}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Add User Section */}
      <div className="w-full lg:w-[80%] mt-16 px-6 lg:px-0 text-center md:text-left">
        <Card
          className="shadow-md hover:shadow-xl transition-all duration-300 p-8"
          style={{ borderRadius: "12px" }}
        >
          <h2 className="text-[28px] font-bold text-[#003A70] mb-4">
            Add Employees
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl">
            Create additional users for your company. These users will be able
            to manage job postings, review applications, and collaborate with
            the hiring team.
          </p>
          
          <button
            onClick={() => {
              setDisabled(true);
              router.push("/routes/job-posting");
            }}
            disabled={disabled}
            className={`bg-[#003A70] px-6 py-2 rounded-md font-bold hover:scale-105 transition-all duration-300 ${
              disabled
                ? "opacity-50 cursor-not-allowed hover:scale-100"
                : "cursor-pointer"
            }`}
          >
            <span className="text-white">Add User</span>
          </button>
        </Card>
      </div>

      {/* Recent Jobs */}
      <div className="w-full lg:w-[80%] mt-16 px-6 lg:px-0">
        <h2
          className="text-[28px] font-bold text-[#003A70] mb-6"
          style={{ fontWeight: "600" }}
        >
          Recent Jobs
        </h2>
        <ListAllCompanyJobs />
      </div>

      <div className="w-full lg:w-[80%] mt-16 px-6 lg:px-0">
        <h2
          className="text-[28px] font-bold text-[#003A70] mb-6"
          style={{ fontWeight: "600" }}
        >
          Company Employee
        </h2>
        <CompUserList />
      </div>

      {/* All Applicants */}
    </div>
  );
};

export default CompRootDashboard;
