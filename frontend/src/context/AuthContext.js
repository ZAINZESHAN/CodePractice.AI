"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    // Load from localStorage on refresh
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const savedToken = localStorage.getItem("token");
        if (savedUser && savedToken) {
            setUser(JSON.parse(savedUser));
            setToken(savedToken);
            setIsAuthenticated(true);
        }
    }, []);

    const login = (user, token) => {
        setUser(user);
        setToken(token);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider
            value={{ user, token, isAuthenticated, login, logout, BACKEND_URL }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
