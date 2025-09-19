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
      <Input
        placeholder="Enter your interest"
        name="interest"
        value={formData.interest}
        onChange={handleChange}
      />
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

