import ListAllCompanyJobs from "@/components/ListAllCompanyJobs";
import React from "react";

const ManageCompanyJobs = () => {
  return (
    <div className="flex flex-col items-center py-10">
      <div className="w-full lg:w-[80%] h-full">
        <h1
          className="text-[28px] font-bold text-center text-[#003A70] pb-8"
          style={{ fontWeight: "600" }}
        >
          Manage Company Jobs
        </h1>

        <ListAllCompanyJobs />
      </div>
    </div>
  );
};

export default ManageCompanyJobs;
