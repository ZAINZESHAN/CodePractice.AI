import CompUserList from "@/components/CompUserList";
import React from "react";

const ManageCompnayUsers = () => {
  return (
    <div className="flex flex-col items-center py-15">
      <div className="w-full lg:w-[80%] h-full">
        <h1
          className="text-[28px] font-bold text-center text-[#003A70] pb-8"
          style={{ fontWeight: "600" }}
        >
          Manage Company Jobs
        </h1>
        <h1
          className="text-[28px] font-bold text-[#003A70] mb-6"
          style={{ fontWeight: "600" }}
        >
          All Compnay Jobs
        </h1>
        <CompUserList />
      </div>
    </div>
  );
};

export default ManageCompnayUsers;
