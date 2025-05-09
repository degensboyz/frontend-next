'use client'
import { swal } from "@/utils/swal";
import { useState } from "react";
export default function About() {
    const [userData, setUserData] = useState({
        username: 'phanuwat3370',
        email: 'phanuwat3370@gmail.com',
        firstName: 'Phanuwat',
        lastName: 'Kanchin',
        phone: '081234567890',
        address: '123/456 หมู่ที่ 7 ตำบล กรุงเทพมหานคร จังหวัด กรุงเทพมหานคร 10110',
    });
    const censoredEmail = userData.email.replace(/\.(?=.*@)/, '*');
    const swalChangeEmail = () => {
        swal.fire({
            title: 'กรุณากรอกอีเมลใหม่',
            input: 'email',
            confirmButtonText: 'ส่งคำขอ',
        }).then((result) => {
            if (result.isConfirmed) {
                swal.fire({
                    title: 'ส่งคำขอสำเร็จ',
                    text: 'โปรดตรวจสอบอีเมลปัจจุบันของคุณเพื่อยืนยันการเปลี่ยนอีเมล',
                    icon: 'success',
                })
            }
        });
    }
    const swalChangePhone = () => {
        swal.fire({
            title: 'กรุณากรอกหมายเลขโทรศัพท์ใหม่',
            input: 'text',
        }).then((result) => {
            if (result.isConfirmed) {
                swal.fire({
                    title: 'ส่งคำขอสำเร็จ',
                    text: 'หมายเลขโทรศัพท์ถูกเปลี่ยนเป็น ' + result.value,
                    icon: 'success',
                })
            }
        })
    }
    return (
        <div>
            <h1 className="text-2xl font-bold text-white mb-4 text-center">ข้อมูลส่วนตัว</h1>
            <div className="border-2 border-black bg-white p-4 rounded-md">
                <h2 className="text-xl">ข้อมูลของฉัน</h2>
                <h4 className="text-sm">จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชีผู้ใช้นี้</h4>
                <hr />
                <div className="mt-4">
                    <label htmlFor="username" className="text-black">ชื่อผู้ใช้</label>
                    <input type="text" id="username" className="w-full p-2 rounded-md mt-2 border border-black" value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
                </div>
                <div className="mt-4">
                    <span>อีเมล: {censoredEmail} <a href="#" onClick={() => swalChangeEmail()} className="text-blue-500">เปลี่ยนอีเมล</a></span>
                </div>
                <div className="mt-4">
                    <label htmlFor="firstName" className="text-black">ชื่อ</label>
                    <input type="text" id="firstName" className="w-full p-2 rounded-md mt-2 border border-black" value={userData.firstName} onChange={(e) => setUserData({ ...userData, firstName: e.target.value })} />
                </div>
                <div className="mt-4">
                    <label htmlFor="lastName" className="text-black">นามสกุล</label>
                    <input type="text" id="lastName" className="w-full p-2 rounded-md mt-2 border border-black" value={userData.lastName} onChange={(e) => setUserData({ ...userData, lastName: e.target.value })} />
                </div>
                <div className="mt-4">
                    <span>หมายเลขโทรศัพท์: {userData.phone} <a href="#" onClick={() => swalChangePhone()} className="text-blue-500">เปลี่ยนหมายเลขโทรศัพท์</a></span>
                </div>
                <div className="mt-4">
                    <label htmlFor="address" className="text-black">ที่อยู่</label>
                    <textarea id="address" className="w-full p-2 rounded-md mt-2 border border-black" value={userData.address} onChange={(e) => setUserData({ ...userData, address: e.target.value })} />
                </div>
            </div>
        </div>
    );
}
