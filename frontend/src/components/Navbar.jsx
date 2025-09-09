// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   MenuOutlined,
//   UserOutlined,
//   LogoutOutlined,
//   LoginOutlined,
//   ProfileOutlined,
// } from "@ant-design/icons";
// import { Drawer, Dropdown, Avatar } from "antd";
// import { useAuth } from "../../../context/AuthContext";

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const pathname = usePathname();

//   // ✅ Role-based dashboard path
//   const getDashboardPath = () => {
//     if (!user) return null;
//     switch (user.role) {
//       case "STUDENT":
//         return "/module/pages/student/dashboard";
//       case "COMPANY_ROOT":
//         return "/module/pages/company-root/dashboard";
//       case "COMPANY_USER":
//         return "/module/pages/company-user/dashboard";
//       case "ADMIN":
//         return "/module/pages/admin/dashboard";
//       default:
//         return null;
//     }
//   };

//   const dashboardPath = getDashboardPath();

//   // ✅ Navbar menu links
//   const menuItems = [
//     { key: "home", label: "Home", path: "/" },
//     { key: "about", label: "About", path: "/module/pages/about" },
//     { key: "contact", label: "Contact", path: "/module/pages/contact" },
//     ...(dashboardPath
//       ? [{ key: "dashboard", label: "Dashboard", path: dashboardPath }]
//       : []),
//   ];

//   // ✅ User dropdown (auth state ke hisaab se)
//   const dropdownItems = user
//     ? [
//       {
//         key: "profile",
//         label: <Link href="/profile">Profile</Link>,
//         icon: <ProfileOutlined />,
//       },
//       {
//         key: "logout",
//         label: <span onClick={logout}>Logout</span>,
//         icon: <LogoutOutlined />,
//       },
//     ]
//     : [
//       {
//         key: "login",
//         label: <Link href="/module/auth/login">Login</Link>,
//         icon: <LoginOutlined />,
//       },
//       {
//         key: "signup-student",
//         label: <Link href="/module/auth/signup-student">Signup as Student</Link>,
//         icon: <UserOutlined />,
//       },
//       {
//         key: "signup-company",
//         label: <Link href="/module/auth/signup-company">Signup as Company</Link>,
//         icon: <UserOutlined />,
//       },
//     ];

//   return (
//     <nav className="w-full bg-white shadow-md border-b border-gray-200 fixed top-0 left-0 z-50">
//       <div className="mx-auto flex justify-between items-center py-4 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[4vw]">
//         {/* Left: Logo */}
//         <div className="text-[#003A70] font-bold text-2xl tracking-wide">
//           <Link href="/">CampusRecruit</Link>
//         </div>

//         {/* Center Links (Desktop only) */}
//         <div className="hidden md:flex space-x-8">
//           {menuItems.map((item) => {
//             const isActive = pathname === item.path;
//             return (
//               <Link
//                 key={item.key}
//                 href={item.path}
//                 className={`relative font-medium transition-colors duration-300 ${isActive
//                   ? "text-[#003A70]"
//                   : "text-gray-600 hover:text-[#003A70]"
//                   }`}
//               >
//                 {item.label}
//                 {isActive && (
//                   <span className="absolute left-0 -bottom-1 h-[2px] bg-[#003A70] w-full" />
//                 )}
//               </Link>
//             );
//           })}
//         </div>

//         {/* Right: User Dropdown + Mobile Toggle */}
//         <div className="flex items-center space-x-3">
//           {/* User Dropdown */}
//           <Dropdown menu={{ items: dropdownItems }} placement="bottomRight" arrow>
//             <div className="flex items-center space-x-2 cursor-pointer md:bg-gray-100 md:px-3 py-1 md:rounded-full md:border border-[#003A70] md:hover:shadow-md transition">
//               <span className="hidden md:inline font-medium text-[#003A70]">
//                 {user ? user.name : "Sign In"}
//               </span>
//               <Avatar
//                 icon={<UserOutlined />}
//                 className="hover:shadow-lg transition"
//                 style={{ backgroundColor: "#003A70" }}
//               />
//             </div>
//           </Dropdown>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <MenuOutlined
//               className="text-2xl text-[#003A70] cursor-pointer"
//               onClick={() => setDrawerOpen(true)}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Mobile Drawer */}
//       <Drawer
//         title="Menu"
//         placement="right"
//         onClose={() => setDrawerOpen(false)}
//         open={drawerOpen}
//       >
//         <div className="flex flex-col space-y-5">
//           {menuItems.map((item) => {
//             const isActive = pathname === item.path;
//             return (
//               <Link
//                 key={item.key}
//                 href={item.path}
//                 className={`font-medium transition-colors duration-300 ${isActive
//                   ? "text-[#003A70]"
//                   : "text-gray-700 hover:text-[#003A70]"
//                   }`}
//                 onClick={() => setDrawerOpen(false)}
//               >
//                 {item.label}
//               </Link>
//             );
//           })}

//           <div className="mt-6 border-t pt-4 space-y-3">
//             {dropdownItems.map((item) => (
//               <div
//                 key={item.key}
//                 className="flex items-center gap-2 text-gray-700 hover:text-[#003A70] cursor-pointer"
//                 onClick={() => {
//                   if (item.key === "logout") logout();
//                   setDrawerOpen(false);
//                 }}
//               >
//                 {item.icon} {item.label}
//               </div>
//             ))}
//           </div>
//         </div>
//       </Drawer>
//     </nav>
//   );
// };

// export default Navbar;
