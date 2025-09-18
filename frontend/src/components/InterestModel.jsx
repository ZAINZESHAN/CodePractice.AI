// "use client";

// import React, { useState } from "react";
// import { Input, Button, Card, Select, Steps } from "antd";
// import { CloseOutlined } from "@ant-design/icons";
// import axios from "axios";
// import { useAuth } from "@/context/AuthContext";
// import { toast } from "react-toastify";

// const { Option } = Select;

// const InterestModel = ({ onSkip, onSave }) => {
//   const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
//   const { token } = useAuth();
//   const [formData, setFormData] = useState({
//     interest: "",
//     location: "",
//   });

//   const [currentStep, setCurrentStep] = useState(0);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSelectChange = (value) => {
//     setFormData((prev) => ({ ...prev, interest: value }));
//   };

//   const handleSubmit = async () => {
//     try {
//       const res = await axios.patch(`${BACKEND_URL}/profile/update`, formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       toast.success(
//         "🎉 Thank you! Your profile has been updated successfully.",
//         {
//           position: "bottom-right",
//           autoClose: 3000,
//         }
//       );

//       onSave();
//     } catch (err) {
//       console.error(err);
//       toast.error("❌ Failed to update profile. Please try again.", {
//         position: "bottom-right",
//         autoClose: 3000,
//       });
//     }
//   };

//   const steps = [
//     {
//       title: "💡 Interest",
//       content: (
//         <div className="flex flex-col gap-3">
//           <Select
//             placeholder="Select your interest"
//             onChange={handleSelectChange}
//             className="w-full"
//             value={formData.interest || undefined}
//           >
//             <Option value="Web Development">Web Development</Option>
//             <Option value="Data Science">Data Science</Option>
//             <Option value="AI/ML">AI/ML</Option>
//             <Option value="Cybersecurity">Cybersecurity</Option>
//             <Option value="UI/UX Design">UI/UX Design</Option>
//           </Select>
//         </div>
//       ),
//     },
//     {
//       title: "📍 Location",
//       content: (
//         <div className="flex flex-col gap-3">
//           <Input
//             placeholder="Enter your location"
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//           />
//         </div>
//       ),
//     },
//   ];

//   const next = () => {
//     if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
//   };

//   const prev = () => {
//     if (currentStep > 0) setCurrentStep(currentStep - 1);
//   };

//   return (
//     <div className="relative max-w-xl mx-auto">
//       <div className="text-center mb-6">
//         <h2 className="text-gray-600 text-md sm:text-base">
//           Select your interest and location to personalize your profile.
//         </h2>
//       </div>

//       {/* Steps */}
//       <Steps current={currentStep} size="small" className="mb-4 custom-steps">
//         {steps.map((item) => (
//           <Steps.Step key={item.title} title={item.title} />
//         ))}
//       </Steps>

//       {/* Card */}
//       <Card
//         title={<div className="font-semibold">{steps[currentStep].title}</div>}
//         bordered={false}
//         className="shadow-lg"
//       >
//         {steps[currentStep].content}

//         <div className="flex justify-between mt-6">
//           {currentStep > 0 && (
//             <Button onClick={prev} className="w-24">
//               Previous
//             </Button>
//           )}

//           {currentStep < steps.length - 1 ? (
//             <Button
//               type="primary"
//               onClick={next}
//               className="w-24"
//               style={{
//                 backgroundColor: formData.interest ? "#003A70" : "#d9d9d9",
//                 borderColor: formData.interest ? "#003A70" : "#d9d9d9",
//                 color: formData.interest ? "#fff" : "#666",
//               }}
//               disabled={!formData.interest && currentStep === 0}
//             >
//               Next
//             </Button>
//           ) : (
//             <Button
//               type="primary"
//               onClick={handleSubmit}
//               className="w-32"
//               style={{
//                 backgroundColor: formData.location ? "#003A70" : "#d9d9d9",
//                 borderColor: formData.location ? "#003A70" : "#d9d9d9",
//                 color: formData.location ? "#fff" : "#666",
//               }}
//               disabled={!formData.location}
//             >
//               Save Profile
//             </Button>
//           )}
//         </div>
//       </Card>
//       {currentStep === 0 && (
//         <Button
//           onClick={onSkip}
//           icon={<CloseOutlined />}
//           className="bottom-0 right-0 shadow-md bg-white"
//         >
//           Skip for Now
//         </Button>
//       )}
//     </div>
//   );
// };

// export default InterestModel;

"use client";

import React, { useState } from "react";
import { Input, Button, Card, Select, Steps } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

const { Option } = Select;

const InterestModel = ({ onSkip, onSave }) => {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { token, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    interest: "",
    location: "",
  });
  const [currentStep, setCurrentStep] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, interest: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.patch(`${BACKEND_URL}/profile/update`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("🎉 Your profile has been updated successfully.", {
        position: "bottom-right",
        autoClose: 3000,
      });

      updateUser({
        interest: formData.interest,
        location: formData.location,
      });

      onSave();
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to update profile. Please try again.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  const steps = [
    {
      title: "💡 Interest",
      content: (
        <Select
          placeholder="Select your interest"
          onChange={handleSelectChange}
          className="w-full"
          value={formData.interest || undefined}
        >
          <Option value="Froontend Developer">Frontend Developer</Option>
          <Option value="Backend Developer">Backend Developer</Option>
          <Option value="AI">AI</Option>
          <Option value="Cybersecurity">Cybersecurity</Option>
          <Option value="Graphic Designing">Graphic Designing</Option>
        </Select>
      ),
    },
    {
      title: "📍 Location",
      content: (
        <Input
          placeholder="Enter your location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      ),
    },
  ];

  const next = () => currentStep < steps.length - 1 && setCurrentStep(currentStep + 1);
  const prev = () => currentStep > 0 && setCurrentStep(currentStep - 1);

  return (
    <div className="relative max-w-xl mx-auto">
      <Steps current={currentStep} size="small" className="mb-4">
        {steps.map((item) => <Steps.Step key={item.title} title={item.title} />)}
      </Steps>

      <Card title={steps[currentStep].title} bordered={false} className="shadow-lg">
        {steps[currentStep].content}

        <div className="flex justify-between mt-6">
          {currentStep > 0 && <Button onClick={prev}>Previous</Button>}

          {currentStep < steps.length - 1 ? (
            <Button
              type="primary"
              onClick={next}
              disabled={!formData.interest && currentStep === 0}
              style={{
                backgroundColor: formData.interest ? "#003A70" : "#d9d9d9",
                borderColor: formData.interest ? "#003A70" : "#d9d9d9",
                color: formData.interest ? "#fff" : "#666",
              }}
            >
              Next
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={handleSubmit}
              disabled={!formData.location}
              style={{
                backgroundColor: formData.location ? "#003A70" : "#d9d9d9",
                borderColor: formData.location ? "#003A70" : "#d9d9d9",
                color: formData.location ? "#fff" : "#666",
              }}
            >
              Save Profile
            </Button>
          )}
        </div>
      </Card>

      {currentStep === 0 && (
        <Button onClick={onSkip} icon={<CloseOutlined />} className="bottom-0 right-0 shadow-md bg-white">
          Skip for Now
        </Button>
      )}
    </div>
  );
};

export default InterestModel;

