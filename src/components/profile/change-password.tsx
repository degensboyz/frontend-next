'use client'
import { useState } from "react";
import { AxiosInstance } from "@/utils/axios";

const axios = AxiosInstance();
const detectLanguage = (str: string) => {
    let lang = [];
    const lastChar = str.slice(-1);
    if (/^[\u0E00-\u0E7F]+$/.test(lastChar)) {
        lang.push('ภาษาไทย');
    } else if (/^[a-zA-Z]+$/.test(lastChar)) {
        lang.push('ภาษาอังกฤษ');
    } else if(/^[0-9]+$/.test(lastChar)) {
        lang.push('ตัวเลข');
    } else {
        lang.push('ภาษาอื่นๆ');
    }
    return lang;
}
export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [lang, setLang] = useState<string[]>([]);

    const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!oldPassword || !newPassword || !confirmPassword) {
            setError("กรุณากรอกข้อมูลให้ครบ");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("รหัสผ่านไม่ตรงกัน");
            return;
        }
        setLoading(true);
        const response = await axios.post("/user/change-password", {
            oldPassword,
            newPassword,
        });
        if (response.data.success) {
            setSuccess(response.data.message);
        } else {
            setError(response.data.message);
        }
        setLoading(false);
    }
    return (
        <div>
            <h1 className="text-2xl font-bold text-white mb-4">เปลี่ยนรหัสผ่าน</h1>
            <h1 className="text-2xl font-bold text-white mb-4">ภาษาของแป้นพิมพ์: <p className="text-red-500">{lang.join(", ")}</p></h1>
            {error && <div className="bg-red-500 p-4 rounded-md">
                <p className="text-red-500 mb-4">{error}</p>
            </div>}
            {success && <div className="bg-green-500 p-4 rounded-md">
                <p className="text-green-500 mb-4">{success}</p>
            </div>}
            <form onSubmit={handleChangePassword} className="flex flex-col gap-4 text-center border-2 border-black bg-white p-4 rounded-md" >
                <div>
                    <label htmlFor="oldPassword" className="text-black">รหัสผ่านเดิม</label> <br />
                    <input type="password" value={oldPassword} onChange={(e) => {
                        setOldPassword(e.target.value);
                        setLang(detectLanguage(e.target.value));
                    }} className="w-full p-2 rounded-md mt-2 border border-black" />
                </div>
                <div>
                    <label htmlFor="newPassword" className="text-black">รหัสผ่านใหม่</label> <br />
                    <input type="password" value={newPassword} onChange={(e) => {
                        setNewPassword(e.target.value);
                        setLang(detectLanguage(e.target.value));
                    }} className="w-full p-2 rounded-md mt-2 border border-black" />
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="text-black">ยืนยันรหัสผ่าน</label> <br />
                    <input type="password" value={confirmPassword} onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setLang(detectLanguage(e.target.value));
                    }} className="w-full p-2 rounded-md mt-2 border border-black" />
                </div>
                <button type="submit" className="bg-blue-600 p-4 text-white rounded-md">เปลี่ยนรหัสผ่าน</button>
            </form>
        </div>
    )
}
