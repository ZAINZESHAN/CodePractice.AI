"use client";

import React, { useState } from "react";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Drawer, Dropdown, Avatar } from "antd";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  // ✅ Role-based dashboard path
  const getDashboardPath = () => {
    if (!user) return null;
    switch (user.role) {
      case "STUDENT":
        return "/pages/student-dashboard";
      case "ADMIN":
        return "/admin/dashboard";
      case "COMPANY_ROOT":
        return "/company/dashboard";
      default:
        return null;
    }
  };

  const dashboardPath = getDashboardPath();

  // ✅ Menu links
  const menuItems = [
    { key: "home", label: "Home", path: "/" },
    { key: "about", label: "About", path: "/pages/about" },
    { key: "contact", label: "Contact", path: "/pages/contact" },
    ...(dashboardPath
      ? [{ key: "dashboard", label: "Dashboard", path: dashboardPath }]
      : []),
  ];

  // ✅ User dropdown (auth ke hisaab se)
  const userMenu = {
    items: user
      ? [
          { key: "profile", label: <Link href="/pages/profile">Profile</Link> },
          { key: "logout", label: <span onClick={logout}>Logout</span> },
        ]
      : [
          // { key: "login", label: <Link href="/auth">Login</Link> },
          { key: "signup", label: <Link href="/auth">Sign Up</Link> },
        ],
  };

  return (
    <nav className="w-full bg-white shadow-md border-b px-4 sm:px-[5vw] md:px-[7vw] lg:px-[4vw] border-gray-200 fixed top-0 left-0 z-50">
      <div className="mx-auto flex justify-between items-center py-4 max-w-8xl">
        {/* Left: Logo */}
        <div className="text-[#003A70] font-bold text-2xl tracking-wide">
          <Link href="/">CampusRecruit</Link>
        </div>

        {/* Center Links (Desktop) */}
        <div className="hidden md:flex space-x-8">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.key}
                href={item.path}
                className={`relative font-medium transition-colors duration-300 ${
                  isActive ? "text-[#003A70]" : "text-gray-600 hover:text-[#003A70]"
                }`}
              >
                {item.label}
                {/* Active underline */}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-[#003A70] transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* Right: User Menu + Mobile Menu */}
        <div className="flex items-center space-x-3">
          {/* User Dropdown */}
          <Dropdown menu={userMenu} placement="bottomRight" arrow>
            <div className="flex items-center space-x-2 cursor-pointer md:bg-gray-100 md:px-3 py-1 md:rounded-full md:border border-[#003A70] md:hover:shadow-md transition">
              <span className="hidden md:inline font-medium text-[#003A70]">
                {user ? user.name : "Sign In"}
              </span>
              <Avatar
                icon={<UserOutlined />}
                className="hover:shadow-lg transition"
                style={{ backgroundColor: "#003A70" }}
              />
            </div>
          </Dropdown>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <MenuOutlined
              className="text-2xl text-[#003A70] cursor-pointer"
              onClick={() => setDrawerOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
      >
        <div className="flex flex-col space-y-5">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.key}
                href={item.path}
                className={`font-medium transition-colors duration-300 ${
                  isActive ? "text-[#003A70]" : "text-gray-700 hover:text-[#003A70]"
                }`}
                onClick={() => setDrawerOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </Drawer>
    </nav>
  );
};

export default Navbar;
