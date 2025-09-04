"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  UserAddOutlined,
  FileTextOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  UserOutlined,
  ApartmentOutlined,
  SafetyCertificateOutlined,
  ClockCircleOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import bgimage from "./assets/system2.avif";

const HomePage = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[60vh] flex items-center justify-center"
        style={{ backgroundImage: `url(${bgimage.src})` }}
      >
        <div className="absolute inset-0 bg-black/30" /> {/* lighter overlay */}
        <div className="relative z-10 text-center max-w-3xl px-6">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Campus Recruitment System
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-lg md:text-xl text-gray-200 mb-6"
          >
            Bridge between <span className="font-semibold">Students</span> and{" "}
            <span className="font-semibold">Companies</span>
          </motion.p>

          {/* Signup Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/auth"
                className="w-full block text-center px-6 py-3 bg-[#003A70] text-white rounded-lg shadow-md transition"
              >
                Sign Up as Student
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/auth/company"
                className="w-full block text-center px-6 py-3 bg-white border border-[#003A70] text-[#003A70] rounded-lg shadow-md hover:bg-gray-100 transition"
              >
                Sign Up as Company
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-[#003A70] mb-10"
          >
            How It Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: <UserAddOutlined className="text-4xl text-[#003A70]" />,
                title: "Sign Up",
                desc: "Students & Companies create their accounts",
              },
              {
                icon: <FileTextOutlined className="text-4xl text-[#003A70]" />,
                title: "Build / Post",
                desc: "Students upload resumes & Companies post jobs",
              },
              {
                icon: <TeamOutlined className="text-4xl text-[#003A70]" />,
                title: "Apply & Shortlist",
                desc: "Students apply, companies shortlist candidates",
              },
              {
                icon: <CheckCircleOutlined className="text-4xl text-[#003A70]" />,
                title: "Hire & Get Hired",
                desc: "Connect and start the journey!",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="p-6 border rounded-xl shadow hover:shadow-lg transition bg-white"
              >
                <div className="mb-4 flex justify-center">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-[#003A70] mb-10"
          >
            Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <UserOutlined className="text-3xl text-[#003A70]" />,
                title: "For Students",
                desc: "Build your profile, apply for jobs, and track applications.",
              },
              {
                icon: <ApartmentOutlined className="text-3xl text-[#003A70]" />,
                title: "For Companies",
                desc: "Post jobs, filter candidates, and shortlist easily.",
              },
              {
                icon: <SafetyCertificateOutlined className="text-3xl text-[#003A70]" />,
                title: "For Admins",
                desc: "Monitor platform activity and ensure smooth operations.",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white border rounded-xl shadow hover:shadow-lg transition"
              >
                <div className="mb-4 flex justify-center">{item.icon}</div>
                <h3 className="text-xl font-semibold text-[#003A70] mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-[#003A70] mb-10"
          >
            Why Choose Us?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <CheckCircleOutlined />, text: "Easy recruitment process" },
              { icon: <SafetyCertificateOutlined />, text: "Verified companies & students" },
              { icon: <ClockCircleOutlined />, text: "Saves time" },
              { icon: <DollarOutlined />, text: "Free & premium services" },
            ].map((point, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition flex flex-col items-center"
              >
                <div className="text-3xl text-[#003A70] mb-3">{point.icon}</div>
                <p className="text-gray-700 font-medium">{point.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-[#003A70] mb-10"
          >
            Success Stories
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote:
                  "CampusRecruit helped me land my first internship within a month!",
                name: "Ali Khan – Student",
              },
              {
                quote: "We found great talent for our company quickly and easily.",
                name: "ABC Tech – Recruiter",
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                className="p-6 bg-white border rounded-xl shadow hover:shadow-md transition"
              >
                <p className="italic text-gray-600 mb-4">“{t.quote}”</p>
                <h4 className="text-[#003A70] font-semibold">{t.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
