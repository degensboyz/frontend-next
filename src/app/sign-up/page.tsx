"use client"

import { useAuth } from "@/context/AuthContext"
import { AxiosInstance } from "@/utils/axios"
import { Regex } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function Login() {
    const axios = AxiosInstance();
    const { register } = useAuth() ?? {};
    const router = useRouter();

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [loading, setLoading] = useState(false)

    const validateEmail = (value: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const toastDefault = (message: string) => {
        toast.error(message, { autoClose: 2000 })
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Frontend validations
        if (!validateEmail(email)) {
            toastDefault("กรุณากรอกอีเมลให้ถูกต้อง")
            return;
        }
        if (username.length < 6) {
            toastDefault("ชื่อผู้ใช้งานต้องมีความยาวอย่างน้อย 6 ตัวอักษร")
            return;
        }
        if (password.length < 6) {
            toastDefault("รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร")
            return;
        }
        if (password !== confirmPassword) {
            toastDefault("รหัสผ่านไม่ตรงกัน")
            return;
        }
        if (phone.length < 10) {
            toastDefault("กรุณากรอกหมายเลขโทรศัพท์ให้มีความยาวอย่างน้อย 10 ตัวอักษร")
            return;
        }
        const startWith = ["06", "08", "09"]
        if (!/[0-9]/.test(phone) || !startWith.includes(phone.substring(0, 2))) {
            toastDefault("กรุณากรอกหมายเลขโทรศัพท์ให้ถูกต้อง")
            return;
        }

        setLoading(true)
        const response = await register({ username, password, email, phone });
        setLoading(false)

        if (response.success) {
            toast.success(response.data.message || "สมัครสมาชิกสำเร็จ");
            // Optionally redirect:
            // router.push('/dashboard');
        } else {
            toast.error(response.data.message || "เกิดข้อผิดพลาดในการสมัครสมาชิก");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <ToastContainer />
            <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">สมัครสมาชิก</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {email && !validateEmail(email) && (
                            <p className="text-red-500 text-sm mt-1">กรุณากรอกอีเมลให้ถูกต้อง</p>
                        )}
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {username && username.length < 6 && (
                            <p className="text-red-500 text-sm mt-1">กรุณากรอกชื่อผู้ใช้งานให้มีความยาวอย่างน้อย 6 ตัวอักษร</p>
                        )}
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {password && password.length < 6 && (
                            <p className="text-red-500 text-sm mt-1">กรุณากรอกรหัสผ่านให้มีความยาวอย่างน้อย 6 ตัวอักษร</p>
                        )}
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {confirmPassword && confirmPassword !== password && (
                            <p className="text-red-500 text-sm mt-1">กรุณากรอกรหัสผ่านให้ตรงกัน</p>
                        )}
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {phone && phone.length < 10 && (
                            <p className="text-red-500 text-sm mt-1">กรุณากรอกหมายเลขโทรศัพท์ให้มีความยาวอย่างน้อย 10 ตัวอักษร</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "กำลังสมัครสมาชิก..." : "สมัครสมาชิก"}
                    </button>
                </form>
            </div>
        </div>
    )
}
