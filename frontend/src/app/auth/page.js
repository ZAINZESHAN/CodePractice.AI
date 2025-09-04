"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import "./auth.css";
import { useAuth } from "@/app/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

const BACKEND_URL = "http://localhost:5000";

const Auth = () => {
    const [isActive, setIsActive] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser, setToken } = useAuth();
    const router = useRouter();

    useEffect(() => {
        setIsActive(false);
    }, []);

    // role-based redirect handler
    const redirectUser = (role) => {
        switch (role) {
            case "STUDENT":
                router.push("/pages/student");
                break;
            case "COMPANY_ROOT":
                router.push("/pages/company-root");
                break;
            case "COMPANY_USER":
                router.push("/pages/company-user");
                break;
            case "ADMIN":
                router.push("/pages/admin");
                break;
            default:
                router.push("/");
        }
    };

    const handleError = (error, defaultMsg) => {
        if (error.response && error.response.data) {
            const errorMessage = Array.isArray(error.response.data.message)
                ? error.response.data.message.join(", ")
                : error.response.data.message;
            toast.error(errorMessage || defaultMsg);
        } else {
            toast.error(defaultMsg);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BACKEND_URL}/auth/login`, {
                email,
                password,
            });
            if (res.data.success) {
                setUser(res.data.user);
                setToken(res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                localStorage.setItem("token", res.data.token);
                toast.success("Login successful!");
                redirectUser(res.data.user.role);
            }
        } catch (error) {
            handleError(error, "Login failed!");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BACKEND_URL}/auth/register`, {
                name,
                email,
                password,
            });
            if (res.data.success) {
                setUser(res.data.user);
                setToken(res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                localStorage.setItem("token", res.data.token);
                toast.success("Signup successful!");
                redirectUser(res.data.user.role);
            }
        } catch (error) {
            handleError(error, "Signup failed!");
        }
    };

    return (
        <div className="w-full h-[100vh] flex justify-center items-center ">
            <div className={`wrapper ${isActive ? "active" : ""}`}>
                <span className="bg-animate"></span>
                <span className="bg-animate2"></span>


                {/* Register Box */}
                <div className="form-box register">
                    <h2 className="animation" style={{ "--i": 17, "--j": 0 }}>
                        <b>Sign Up</b>
                    </h2>
                    <form onSubmit={handleRegister}>
                        <div
                            className="input-box animation"
                            style={{ "--i": 18, "--j": 1 }}
                        >
                            <input
                                type="text"
                                value={name}
                                minLength={3}
                                maxLength={25}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <label>
                                <b>Username</b>
                            </label>
                            <FontAwesomeIcon className="icon" icon={faUser} />
                        </div>
                        <div
                            className="input-box animation"
                            style={{ "--i": 19, "--j": 2 }}
                        >
                            <input
                                type="text"
                                value={email}
                                maxLength={30}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label>
                                <b>Email</b>
                            </label>
                            <FontAwesomeIcon className="icon" icon={faEnvelope} />
                        </div>
                        <div
                            className="input-box animation"
                            style={{ "--i": 20, "--j": 3 }}
                        >
                            <input
                                type="password"
                                value={password}
                                minLength={6}
                                maxLength={20}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label>
                                <b>Password</b>
                            </label>
                            <FontAwesomeIcon className="icon" icon={faLock} />
                        </div>
                        <button
                            type="submit"
                            className="btn animation"
                            style={{ "--i": 21, "--j": 4 }}
                        >
                            Sign Up
                        </button>
                        <div
                            className="logreg-link animation"
                            style={{ "--i": 22, "--j": 5 }}
                        >
                            <p>
                                Already have an account?
                                <Link
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsActive(false);
                                    }}
                                    className="login-link"
                                >
                                    Login
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

                <div className="info-text register">
                    <h2 className="animation" style={{ "--i": 17, "--j": 0 }}>
                        <b>Join Us Today!</b>
                    </h2>
                    <p className="animation" style={{ "--i": 18, "--j": 0 }}>
                        Create your account.
                    </p>
                </div>

                {/* Login Box */}
                <div className="form-box login">
                    <h2 className="animation" style={{ "--i": 0, "--j": 20 }}>
                        <b>Login</b>
                    </h2>

                    <form onSubmit={handleLogin}>
                        <div
                            className="input-box animation"
                            style={{ "--i": 1, "--j": 21 }}
                        >
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                maxLength={30}
                                required
                            />
                            <label>
                                <b>Email</b>
                            </label>
                            <FontAwesomeIcon className="icon" icon={faEnvelope} />
                        </div>

                        <div
                            className="input-box animation "
                            style={{ "--i": 2, "--j": 22 }}
                        >
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                minLength={6}
                                maxLength={20}
                                required
                            />
                            <label>
                                <b>Password</b>
                            </label>
                            <FontAwesomeIcon className="icon" icon={faLock} />
                        </div>

                        <button
                            type="submit"
                            className="btn animation"
                            style={{ "--i": 3, "--j": 23 }}
                        >
                            Login
                        </button>

                        <div
                            className="logreg-link animation"
                            style={{ "--i": 4, "--j": 24 }}
                        >
                            <p>
                                Don&apos;t have an account?
                                <Link
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsActive(true);
                                    }}
                                    className="register-link"
                                >
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

                <div className="info-text login">
                    <h2 className="animation" style={{ "--i": 0, "--j": 20 }}>
                        <b>Welcome Back!</b>
                    </h2>
                    <p className="animation" style={{ "--i": 0, "--j": 21 }}>
                        Sign in to your account.
                    </p>
                </div>
                
            </div>
        </div>
    );
};

export default Auth;
