import React from "react";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-red-600">Access Denied</h1>
      <p className="mt-2 text-lg">
        You do not have permission to view this page.
      </p>
    </div>
  );
};

export default Unauthorized;
