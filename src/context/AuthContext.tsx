"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosInstance } from "@/utils/axios";
import Cookies from "js-cookie";

interface RegisterProps{
    username: string;
    password: string;
    email: string;
    phone: string;
}
interface AuthContextProps {
    user: any;
    login: (username: string, password: string) => Promise<{ success: boolean, data: any }>;
    logout: () => void;
    register: (props: RegisterProps) => Promise<{ success: boolean, data: any }>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const axios = AxiosInstance();
    const router = useRouter();

    useEffect(() => {
        // Check if token exists in localStorage
        const token = localStorage.getItem("token");
        if (token) {
            
            fetchUser(token);
            return;
        }
        console.log("No token found");
    }, []);

    const fetchUser = async (token: string) => {
        try {
            const { data } = await axios.get("/user/me", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (data.success) {
                setUser(data.data.user);
            }
        } catch (error) {
            logout();
        }
    };

    const login = async (username: string, password: string) => {
        try {
            const res = await axios.post("/user/login", { username, password });
            if (res.data.success) {
                Cookies.set("accessToken", res.data.data.token);
                localStorage.setItem("token", res.data.data.token);
                console.log(res.data.data);
                setUser(res.data.data.username);
                return {
                    success: true,
                    data: res.data.user
                }
            } else {
                return {
                    success: false,
                    data: res.data.message
                }
            }
        } catch (error) {
            console.error(error);
            return {
                success: false,
                data: "Login failed"
            }
        }
    };
    const register = async (props: RegisterProps) => {
        try {
            const res = await axios.post("/user/register", props);
            if (res.data.success) {
                return {
                    success: true,
                    data: res.data.message
                }
            } else {
                return {
                    success: false,
                    data: res.data.message
                }
            }
        } catch (error) {
            console.error(error);
            return {
                success: false,
                data: "Register failed"
            }
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        router.push("/sign-in");
    };

    return <AuthContext.Provider value={{ user, login, logout, register }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
