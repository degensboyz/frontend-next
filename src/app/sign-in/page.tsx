"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Swal from "sweetalert2";

export default function Login() {
    const { login } = useAuth() ?? {};
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const loginResponse = await login?.(username, password);
        console.log(loginResponse);
        if (loginResponse?.success) {
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Login successful!",
                confirmButtonText: "Close",
                customClass: {
                    confirmButton: "bg-blue-500 text-white p-2 rounded-md",
                },
            }).then(r => {
                window.location.href = '/';
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: loginResponse?.data.message,
            });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold text-white">Sign In</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" className="p-2 rounded-md" onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" className="p-2 rounded-md" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Sign In</button>
            </form>
        </div>
    );
}
