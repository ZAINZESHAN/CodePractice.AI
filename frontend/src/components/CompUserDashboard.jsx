"use client";

import "../app/globals.css";
import React from "react";
import job_img from "../assets/job-img.png";
import Image from "next/image";
import ListAllCompanyJobs from "./ListAllCompanyJobs";
import { useRouter } from "next/navigation";

const CompUserDashboard = () => {
const router = useRouter()  
  return (
    <div className="flex flex-col items-center pb-20">
      {/* Hero Section */}
      <div className="w-[100%] lg:w-[80%] h-[80vh] md:h-[60vh] flex flex-col md:flex-row">
        <div className="md:w-[50%] pt-10 px-10 md:px-0 md:pt-0 md:h-full flex flex-col justify-center text-black text-center md:text-left">
          <h1 className="text-[40px] md:text-[50px] font-bold leading-snug">
            Let's make your next <br /> great hire. Fast.
          </h1>
          <button
            onClick={() => {
              router.push("/employee/posting");
            }}
            className={`mt-6 bg-[#003A70] md:w-[180px] h-[50px] rounded-md font-bold text-white transition-all duration-300 hover:scale-105`}
          >
            <span className="text-white">Post a job</span>
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

      {/* Company Job Posts */}
      <div className="w-full lg:w-[80%] mt-16 px-6 lg:px-0">
        <h2 className="text-[28px] font-bold text-[#003A70] mb-6" style={{fontWeight: '600'}}>Your Jobs</h2>
        <ListAllCompanyJobs showActions={false} />{" "}
        {/* Only show jobs, no edit/delete */}
      </div>
    </div>
  );
};

export default CompUserDashboard;
