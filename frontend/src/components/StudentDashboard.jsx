"use client";

import { useAuth } from "@/context/AuthContext";
import {
  FileTextOutlined,
  SearchOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { Alert, Button, Card, Input } from "antd";
import Image from "next/image";
import job_img from "../assets/job-img.png";
import React, { useEffect, useState } from "react";
import ListAllJobs from "./ListAllJobs";
import InterestModel from "./InterestModel";

const StudentDashboard = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [showInterestModal, setShowInterestModal] = useState(
    !user?.interest || !user?.location
  );
  const [profileComplete, setProfileComplete] = useState(
    user?.interest && user?.location ? true : false
  );
  console.log(user.interest)
  console.log(user.location)
  const dashboardSteps = [
    {
      title: "My Profile",
      description:
        "Update your personal info, upload resume, and manage your career profile easily.",
      icon: <FileTextOutlined style={{ fontSize: "32px", color: "#002C55" }} />,
    },
    {
      title: "Browse Jobs",
      description:
        "Search and filter through job postings from top companies to find the right match.",
      icon: <SearchOutlined style={{ fontSize: "32px", color: "#002C55" }} />,
    },
    {
      title: "Track Applications",
      description:
        "Stay updated on your job applications, interview schedules, and offer status.",
      icon: <SolutionOutlined style={{ fontSize: "32px", color: "#002C55" }} />,
    },
  ];

  useEffect(() => {
    if (showInterestModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showInterestModal]);

  return (
    <div className="pt-2">
      {/* Hero Section */}

      {showInterestModal && (
        <div className="fixed inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-xl w-full h-auto pt-12 p-8 relative z-50">
            <InterestModel
              onSave={() => {
                setShowInterestModal(false);
                setProfileComplete(true);
              }}
              onSkip={() => {
                setShowInterestModal(false);
                setProfileComplete(false);
              }}
            />
          </div>
        </div>
      )}

      <div className="w-[100%] h-[100vh] md:h-[70vh] flex flex-col justify-between items-center">
        <div
          className="flex w-full h-[60%] md:h-[60%] rounded-md px-6 py-10 md:pl-6 flex-col md:flex-row justify-center"
          style={{ background: "linear-gradient(90deg, #002C55, #003A70 )" }}
        >
          <div className="md:w-[50%] flex flex-col justify-center text-center md:text-left">
            <h1
              className="text-[28px] text-white md:text-[34px]"
              style={{ fontWeight: "600" }}
            >
              Good morning,{" "}
              {user.name.charAt(0).toUpperCase() + user.name.slice(1)} 👋🏻
            </h1>
            <p className="text-gray-300">
              Welcome to Campass! Explore, Check, and Apply to your dream jobs.
            </p>
            {/* <Button
              type="primary"
              className="transition-all md:w-[150px] duration-300 hover:scale-105 hover:border-white"
              style={{
                background: "white",
                color: "#002C55",
                borderColor: "#002C55",
                height: "40px",
                fontSize: "15px",
                fontWeight: "500",
              }}
            >
              View Jobs
            </Button> */}
          </div>
          <div className="md:w-[50%] overflow-hidden flex justify-center md:justify-end items-center">
            <Image
              className="w-[300px] lg:w-[400px] lg:h-[400px]"
              src={job_img}
              alt="Job posting"
            />
          </div>
        </div>
        <div className="h-[40%] w-full lg:w-[80%] md:h-[30%] flex flex-col justify-center items-center">
          <h1 className="text-black text-[28px] md:text-[40px]">
            <b>Find great places to work</b>
          </h1>
          <p className="w-[80%] text-gray-500 text-[15px] text-center md:text-[18px]">
            Discover and manage your company profile, employees, and job
            postings.
          </p>
          <div className="flex flex-col md:flex-row gap-3 w-[100%] mt-6">
            <Input
              placeholder="Search for a job or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="custom-search-input"
              style={{ height: "50px", fontSize: "18px" }}
              suffix={
                <SearchOutlined
                  style={{ color: "#003A70", fontSize: "20px" }}
                />
              }
            />
            <Button
              type="primary"
              className="transition-all duration-300 hover:scale-105 hover:border-white"
              style={{
                background: "linear-gradient(90deg, #002C55, #003A70 )",
                borderColor: "#002C55",
                height: "50px",
                fontSize: "17px",
                fontWeight: "500",
                paddingLeft: "50px",
                paddingRight: "50px",
              }}
            >
              Find Jobs
            </Button>
          </div>
        </div>
      </div>

      {/* List all jobs for student */}
      <div className="py-20">
        <ListAllJobs searchQuery={searchQuery}/>
      </div>

      {!profileComplete && !showInterestModal && (
        <div
          style={{
            position: "fixed",
            right: "20px",
            bottom: "20px",
            height: "100vh",
            display: "flex",
            alignItems: "flex-end",
            zIndex: 9999,
            cursor: "pointer"
          }}
          onClick={() => setShowInterestModal(true)}
        >
          <Alert
            message="Complete your profile"
            description="Add your interest and location to get personalized jobs."
            type="warning"
            showIcon
            closable
            style={{
              width: "100%",
              borderRadius: "8px",
            }}
          />
        </div>
      )}

      {/* Dashboard Cards Section */}
      <div className="w-full bg-white py-12">
        <h2 className="text-3xl font-bold text-center mb-10 text-[#002C55]">
          Quick Access
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {dashboardSteps.map((step, index) => (
            <Card
              key={index}
              className="shadow-md hover:shadow-xl transition-all duration-300 text-center"
              style={{ borderRadius: "12px" }}
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-[#002C55] mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
