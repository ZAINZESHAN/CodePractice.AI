"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, role, loading } = useAuth();

  // Convert allowedRoles to array & uppercase
  const rolesArray = Array.isArray(allowedRoles)
    ? allowedRoles
    : [allowedRoles];
  const allowed = rolesArray.map((r) => r.toUpperCase());
  const normalizedRole = role?.toString().toUpperCase();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        window.location.href = "/login";
      } else if (!allowed.includes(normalizedRole)) {
        window.location.href = "/unauthorized";
      }
    }
  }, [user, normalizedRole, allowed, loading]);

  if (loading) return null; // still safe, after useEffect
  if (!user || !allowed.includes(normalizedRole)) return null;

  return children;
};

export default ProtectedRoute;
