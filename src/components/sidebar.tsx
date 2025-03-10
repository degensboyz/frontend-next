"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { HomeIcon, LogInIcon, UserPlusIcon, PackageIcon, LogOutIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
export default function Sidebar() {
    const { user, logout } = useAuth() ?? {};
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);
    enum RequiredAuth {
        PUBLIC = "PUBLIC",
        LOGIN = "LOGIN",
        GUEST = "GUEST",
    }
    const links = [
        { name: "Home", url: "/", icon: <HomeIcon />, required: RequiredAuth.PUBLIC },
        { name: "Product", url: "/product", icon: <PackageIcon />, required: RequiredAuth.PUBLIC },
        { name: "Sign In", url: "/sign-in", icon: <LogInIcon />, required: RequiredAuth.GUEST },
        { name: "Sign Up", url: "/sign-up", icon: <UserPlusIcon />, required: RequiredAuth.GUEST },
        { name: "Profile", url: "/profile", icon: <UserIcon />, required: RequiredAuth.LOGIN },
        { name: "Logout", url: "#", icon: <LogOutIcon />, action: handleLogout, required: RequiredAuth.LOGIN },
    ];
    const filteredLinks = links.filter((link) => {
        if (link.required === RequiredAuth.PUBLIC) return true;
        if (link.required === RequiredAuth.LOGIN && user) return true;
        if (link.required === RequiredAuth.GUEST && !user) return true;
        return false;
    });

    function handleLogout() {
        logout();
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Logout successful',
            confirmButtonText: 'Close',
            customClass: {
                confirmButton: 'bg-blue-500 text-white p-2 rounded-md',
            },
        }).then(() => {
            router.push("/sign-in");
        })
    }

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside ref={sidebarRef} className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`} aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        {filteredLinks.map((link) => (
                            <li key={link.name}>
                                {link.action ? (
                                    <button onClick={link.action} className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                        {link.icon}
                                        <span className="ms-3">{link.name}</span>
                                    </button>
                                ) : (
                                    <Link href={link.url} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                        {link.icon}
                                        <span className="ms-3">{link.name}</span>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        </div>
    );
}
