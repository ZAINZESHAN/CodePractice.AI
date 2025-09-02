"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import "./auth.css";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

const Auth = () => {
    const [isActive, setIsActive] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { BACKEND_URL, token } = useAuth();

    useEffect(() => {
        setIsActive(false);
    }, []);

    const handleLogin = async () => {
        setLoading(true);
        try {
            console.log(BACKEND_URL)
            const response = await axios.post(`${BACKEND_URL}/auth/login`, {
                email,
                password,
            });
            console.log(response)

            if (response.data.success) {
                // token(response.data.token);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                toast.success("Login Successful!");
                setEmail("");
                setPassword("");
                console.log(response.data)
            } else {
                toast.error(response.data.message);
                setEmail("");
                setPassword("");
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
            setLoading(false);
        }
    };

    return (
        <div className={`wrapper ${isActive ? "active" : ""}`}>
            <span className="bg-animate"></span>
            <span className="bg-animate2"></span>

            <div className="form-box login">
                <h2 className="animation" style={{ "--i": 0, "--j": 20 }}>
                    <b>Login</b>
                </h2>

                <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                    <div className="input-box animation" style={{ "--i": 1, "--j": 21 }}>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label>
                            <b>Email</b>
                        </label>
                        <i className="fa-solid fa-user"></i>
                    </div>

                    <div className="input-box animation " style={{ "--i": 2, "--j": 22 }}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label>
                            <b>Password</b>
                        </label>
                        <i className="fa-solid fa-lock"></i>
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

            <div className="form-box register">
                <h2 className="animation" style={{ "--i": 17, "--j": 0 }}>
                    <b>Sign Up</b>
                </h2>
                <form>
                    <div className="input-box animation" style={{ "--i": 18, "--j": 1 }}>
                        <input type="text" required />
                        <label>
                            <b>Username</b>
                        </label>
                        <i className="fa-solid fa-user"></i>
                    </div>
                    <div className="input-box animation" style={{ "--i": 19, "--j": 2 }}>
                        <input type="text" required />
                        <label>
                            <b>Email</b>
                        </label>
                        <i className="fa-solid fa-envelope"></i>
                    </div>
                    <div className="input-box animation" style={{ "--i": 20, "--j": 3 }}>
                        <input type="password" required />
                        <label>
                            <b>Password</b>
                        </label>
                        <i className="fa-solid fa-lock"></i>
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
        </div>
    );
};

export default Auth;
