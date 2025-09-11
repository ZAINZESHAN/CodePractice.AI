import "../app/globals.css"
import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, Input } from "antd";
import Link from "next/link";
import React from "react";
import job_img from "../assets/job-img.png"
import Image from "next/image";

const CompRootDashboard = () => {

  const steps = [
    {
      title: "Create your free account",
      description:
        "All you need is your email address to create an account and start building your job post.",
      icon: (
        <div className="text-[#003A70] text-xl font-bold mb-7">
          1
        </div>
      ),
    },
    {
      title: "Build your job post",
      description:
        "Then just add a title, description, and location to your job post, and you're ready to go.",
      icon: (
        <div className="text-[#003A70] text-xl font-bold mb-7">
          2
        </div>
      ),
    },
    {
      title: "Post Your Job",
      description:
        "After you post your job use our state of the art tools to help you find dream talent.",
      icon: (
        <div className="text-[#003A70] text-xl font-bold mb-7">
          3
        </div>
      ),
    },
  ];


  return (
    <div className="flex flex-col items-center">
      {/* <div className="w-[100%] lg:w-[80%] h-[50vh] md:h-[40vh] flex flex-col justify-center">
        <div className="flex flex-row justify-between">
          <h1 className="w-[60%] text-black text-[28px] md:text-[40px]">
            <b>Find great places to work</b>
          </h1>
          <Link href={'/routes/compuser-signup'}>
            <Button
              type="primary"
              className="transition-all duration-300 hover:scale-105 hover:border-white"
              style={{
                background: "linear-gradient(90deg, #002C55, #003A70 )",
                borderColor: "#002C55",
                height: "45px",
                fontSize: "14px",
                fontWeight: "500",
                paddingLeft: "15px", // 👈 sirf left padding
                paddingRight: "15px", // agar right bhi control karna ho
              }}
            >Create Employee</Button>
          </Link>
        </div>
        <p className="w-[80%] text-gray-500 text-[15px] md:text-[18px]">
          Discover and manage your company profile, employees, and job postings.
        </p>
        <div className="flex flex-col md:flex-row gap-3 w-[100%] mt-6">
          <Input
            placeholder="Search for a company..."
            className="custom-search-input"
            style={{ height: "50px", fontSize: "18px" }}
            suffix={<SearchOutlined style={{ color: "#003A70", fontSize: "20px" }} />}
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
              paddingLeft: "50px", // 👈 sirf left padding
              paddingRight: "50px", // agar right bhi control karna ho
            }}
          >
            Find Jobs
          </Button>
        </div>
      </div> */}
      <div className="w-[100%] lg:w-[80%] h-[100vh] md:h-[60vh] flex flex-col md:flex-row">
        <div className="md:w-[50%] pt-10 px-10 md:px-0 md:pt-0 md:h-full flex flex-col justify-center text-white text-center md:text-left">
          <h1 className="text-[40px] md:text-[50px] text-black font-bold">Let's make your next <br /> great hire. Fast.</h1>
          <Link href={'/routes/job-posting'}>
            <button className="bg-[#003A70] cursor-pointer md:w-[180px] h-[50px] rounded-md font-bold transition-all duration-300 hover:scale-105 ">
              Post a job
            </button>
          </Link>
        </div>
        <div className="md:w-[50%] overflow-hidden flex justify-center items-center">
          <Image className="lg:w-[500px] lg:h-[500px]" src={job_img} alt="" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-20">
        {steps.map((step, index) => (
          <Card
            key={index}
            className="shadow-md hover:shadow-xl transition-all duration-300 mb-8"
            style={{ borderRadius: "12px" }}
          >
            <div>{step.icon}</div>
            <h3 className="text-[30px] font-semibold text-black mb-6">
              {step.title}
            </h3>
            <p className="text-gray-600">{step.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CompRootDashboard;
