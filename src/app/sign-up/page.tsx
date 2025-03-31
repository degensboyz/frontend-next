"use client"
import { useAuth } from "@/context/AuthContext"
import { AxiosInstance } from "@/utils/axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Swal from "sweetalert2"
export default function Login() {
    const axios = AxiosInstance();
    const { register } = useAuth() ?? {};
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Passwords do not match",
            })
            return
        }
        const response = await register(username, password)
        if (response.success) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: response.data.message,
                confirmButtonText: "Close",
                customClass: {
                    confirmButton: "bg-blue-500 text-white p-2 rounded-md"
                }
            })
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: response.data.message,
                confirmButtonText: "Close",
                customClass: {
                    confirmButton: "bg-blue-500 text-white p-2 rounded-md"
                }
            })
        }
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold text-white">Sign Up</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" className="p-2 rounded-md" onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" className="p-2 rounded-md" onChange={(e) => setPassword(e.target.value)} />
                <input type="password" placeholder="Confirm Password" className="p-2 rounded-md" onChange={(e) => setConfirmPassword(e.target.value)} />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Sign Up</button>
            </form>
        </div>
    )
}