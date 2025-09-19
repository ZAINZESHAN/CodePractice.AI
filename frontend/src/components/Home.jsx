import hero_img from "../assets/system2.png";
import Image from "next/image";
import { Button, Card } from "antd";
import {
  CheckCircleOutlined,
  FileTextOutlined,
  SearchOutlined,
  SolutionOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const Home = () => {
  const steps = [
    {
      title: "For Students",
      description:
        "Create your profile, upload resume, and apply to jobs posted by top companies. Track your applications easily.",
      icon: <UserOutlined style={{ fontSize: "32px", color: "#002C55" }} />,
    },
    {
      title: "For Employee",
      description:
        "Post jobs, review student profiles, and shortlist candidates quickly with smart filtering tools.",
      icon: <TeamOutlined style={{ fontSize: "32px", color: "#002C55" }} />,
    },
    {
      title: "Interviews & Offers",
      description:
        "Get shortlisted for interviews, connect with recruiters, and receive job offers seamlessly on the platform.",
      icon: (
        <CheckCircleOutlined style={{ fontSize: "32px", color: "#002C55" }} />
      ),
    },
  ];

  const features = [
    {
      title: "Smart Resume Builder",
      description:
        "Students can build professional resumes using guided templates directly on the platform.",
      icon: <FileTextOutlined style={{ fontSize: "28px", color: "#002C55" }} />,
    },
    {
      title: "Advanced Job Search",
      description:
        "Find jobs by role, location, or skills. Get personalized recommendations instantly.",
      icon: <SearchOutlined style={{ fontSize: "28px", color: "#002C55" }} />,
    },
    {
      title: "Application Tracking",
      description:
        "Easily track your applied jobs and get updates from companies in one dashboard.",
      icon: <SolutionOutlined style={{ fontSize: "28px", color: "#002C55" }} />,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="w-full h-[50vh] relative overflow-hidden">
        <Image className="w-full h-full" src={hero_img} alt="Hero" />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute px-6 md:px-10 text-center inset-0 flex flex-col md-w-[50%] items-center justify-center">
          <h1 className="text-white text-[28px] md:text-[38px]">
            <b>Campus Recruitment System</b>
          </h1>
          <p className="text-white text-[15px] md:text-[18px] mb-6">
            A bridge between talented students and top companies sign up to
            start your journey.
          </p>
          <div className="flex gap-3 pt-3">
            <Link href={"/routes/student-signup"}>
              <Button
                type="primary"
                className="transition-all duration-300 hover:scale-105 hover:border-white"
                style={{
                  background: "linear-gradient(90deg, #002C55, #003A70 )",
                  borderColor: "#002C55",
                  height: "40px",
                  fontSize: "15px",
                }}
              >
                SignUp as Student
              </Button>
            </Link>

            <Link href={"/routes/comproot-signup"}>
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
            </Link>
          </div>
        </div>
      </div>
      {/* Card Section */}
      <div className="w-full bg-white py-12">
        <h2 className="text-3xl font-bold text-center mb-10 text-[#002C55]">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
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
      {/* Benefite Section */}
      <div className="w-full bg-[#f9f9f9] py-12">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#002C55]">
          Platform Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              style={{ borderRadius: "12px" }}
            >
              <div className="flex items-start gap-4">
                <div>{feature.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-[#002C55]">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      {/* CTA Section */}
      <div className="w-full bg-gradient-to-r from-[#E6F0FA] to-[#F9FBFD] py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#002C55] mb-2">
          Ready to get started?
        </h2>
        <p className="text-base text-gray-600 mb-6 px-4">
          Join thousands of students and companies already growing with us.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          {/* Student Button */}
          <Link href={"/routes/student-signup"}>
            <Button
              type="primary"
              className="font-bold transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(90deg, #002C55, #003A70 )",
                border: "none",
                color: "#fff",
                height: "45px",
                minWidth: "180px",
                padding: "0 20px",
                borderRadius: "10px",
                fontSize: "15px",
              }}
            >
              Sign Up as Student
            </Button>
          </Link>

          {/* Company Button */}
          <Link href={"/routes/comproot-signup"}>
            <Button
              type="default"
              className="font-bold transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: "#fff",
                color: "#003A70",
                border: "2px solid #003A70",
                height: "45px",
                minWidth: "180px",
                padding: "0 20px",
                borderRadius: "10px",
                fontSize: "15px",
              }}
            >
              Sign Up as Company
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
