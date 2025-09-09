import React from "react";
import hero_img from "../assets/system2.png";
import Image from "next/image";
import { Button } from "antd";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="w-full h-[45vh] relative overflow-hidden">
        <Image
          className="w-full h-full"
          src={hero_img}
          alt="Hero"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute px-6 md:px-10 text-center inset-0 flex flex-col md-w-[50%] items-center justify-center">
          <h1 className="text-white text-[28px] md:text-[38px]"><b>Campuss Recruitment System</b></h1>
          <p className="text-white text-[15px] md:text-[18px] mb-6">
            A bridge between talented students and top companies sign up to start your journey.
          </p>
          <div className="flex gap-3 pt-3">
            <Button
              type="primary"
              className="transition-all duration-300 hover:scale-105 hover:border-white"
              style={{
                backgroundColor: "#003A70",
                borderColor: "#003A70",
                height: "40px",
                fontSize: "15px",
              }}
            >
              SignUp as Student
            </Button>

            <Button
              type="default"
              className="font-bold px-6 py-2 transition-all duration-300 hover:scale-105 hover:border-[#003A70]"
              style={{
                backgroundColor: "#fff",
                color: "#003A70",
                borderColor: "#fff",
                height: "40px",
                fontSize: "15px",
              }}
            >
              SignUp as Company
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
