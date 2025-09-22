import CompUserDashboard from "@/components/CompUserDashboard";
import ProtectedRoute from "@/components/ProtectedRoute";
import React from "react";

const CompUserDashboardPage = () => {
  return (
    <ProtectedRoute allowedRoles={["COMPANY_USER"]}>
      <CompUserDashboard />
    </ProtectedRoute>
  );
};

export default CompUserDashboardPage;
