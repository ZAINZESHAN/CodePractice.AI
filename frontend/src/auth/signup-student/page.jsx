// "use client";

// import React, { useState } from "react";
// import { Form, Input, Button, Typography, message } from "antd";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { useAuth } from "../../../../context/AuthContext";
// import { toast } from "react-toastify";
// import Link from "next/link";

// const { Title, Text } = Typography;
// const BACKEND_URL = "http://localhost:5000";

// const StudentAuth = () => {
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const router = useRouter();
//   const [form] = Form.useForm();


//   const redirectUser = (role) => {
//     if (role === "STUDENT") router.push("/module/pages/student/dashboard");
//     else router.push("/");
//   };

//   const handleSubmit = async (values) => {
//     setLoading(true);
//     try {
//       const res = await axios.post(`${BACKEND_URL}/auth/register`, values);
//       if (res.data.success) {
//         login(res.data.user, res.data.token)
//         toast.success(res.data.message);
//         form.resetFields(); // <-- add this
//         redirectUser(res.data.user.role);
//       }

//     } catch (err) {
//       toast.error(err.response?.data?.message || "Something went wrong!");
//     }
//     setLoading(false);
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <div
//         style={{
//           width: 400,
//           padding: 30,
//           borderRadius: 10,
//           boxShadow: "0 4px 25px rgba(0,0,0,0.2)",
//           background: "#fff",
//         }}
//       >
//         <Title level={2} style={{ color: "#003A70", textAlign: "center" }}>
//           Student Signup
//         </Title>

//         <Form form={form} layout="vertical" onFinish={handleSubmit} style={{ marginTop: 20 }}>
//           <Form.Item
//             name="name"
//             label={<Text style={{ color: "#003A70" }}>Username</Text>}
//             rules={[{ required: true, message: "Please enter username" }]}
//           >
//             <Input placeholder="Enter your name" />
//           </Form.Item>

//           <Form.Item
//             name="email"
//             label={<Text style={{ color: "#003A70" }}>Email</Text>}
//             rules={[{ required: true, message: "Please enter email" }]}
//           >
//             <Input placeholder="Enter email" />
//           </Form.Item>
//           <Form.Item
//             name="password"
//             label={<Text style={{ color: "#003A70" }}>Password</Text>}
//             rules={[{ required: true, message: "Please enter password" }]}
//           >
//             <Input.Password placeholder="Enter password" />
//           </Form.Item>

//           <Button
//             type="primary"
//             htmlType="submit"
//             block
//             loading={loading}
//             style={{
//               backgroundColor: "#003A70",
//               borderColor: "#003A70",
//               fontWeight: 600,
//             }}
//           >
//             Sign Up
//           </Button>
//         </Form>

//         <Text style={{ display: "block", marginTop: 15, textAlign: "center" }}>
//           Already have an account?
//           <Link
//             href={'/module/auth/login'}
//             style={{ color: "#003A70", fontWeight: 600, cursor: "pointer" }}
//           >
//             Login
//           </Link>
//         </Text>
//       </div>
//     </div>
//   );
// };

// export default StudentAuth;
