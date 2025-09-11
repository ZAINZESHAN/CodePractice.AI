"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, role, loading } = useAuth();

  // Convert allowedRoles to array & uppercase
  const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  const allowed = rolesArray.map(r => r.toUpperCase());
  const normalizedRole = role?.toString().toUpperCase();

  // ✅ Always call hooks in same order
  useEffect(() => {
    if (!loading) { // wait until context is ready
      if (!user) {
        window.location.href = "/routes/login";
      } else if (!allowed.includes(normalizedRole)) {
        window.location.href = "/routes/unauthorized";
      }
    }
  }, [user, normalizedRole, allowed, loading]);

  // ✅ conditional render
  if (loading) return null; // still safe, after useEffect
  if (!user || !allowed.includes(normalizedRole)) return null;

  return children;
};

export default ProtectedRoute;
