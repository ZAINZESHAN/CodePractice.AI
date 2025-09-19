"use client";

import React from "react";
import Link from "next/link";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-center text-3xl sm:text-4xl font-bold mb-6 text-[#003A70]">
        Compass App About Us
      </h1>

      <p className="text-gray-700 text-center max-w-3xl mx-auto text-sm sm:text-base mb-12">
        Compass App is your intelligent career planning assistant. Whether
        you're just starting out or looking to level up, our AI-powered tools
        are here to help you analyze your goals, build strong resumes, practice
        interviews, and match you with your ideal career path.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#003A70] mb-3">
            🚀 Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            To make career planning smarter and more accessible through
            AI-driven insights and guidance.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#003A70] mb-3">
            🌟 What We Offer
          </h2>
          <ul className="list-disc pl-5 text-gray-600 space-y-2 leading-relaxed">
            <li>
              <Link
                href="/routes/comproot-signup"
                className="text-black hover:text-[#003A70] hover:underline"
              >
                Create a Company
              </Link>
            </li>
            <li>
              <Link
                href="/routes/student-signup"
                className="text-black hover:text-[#003A70] hover:underline"
              >
                Sign in as a Student
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
