import Link from "next/link";
export default function Navbar() {
    return (
        <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <ul className="flex space-x-4">
                <li><Link href="/" className="hover:text-gray-400">Home</Link></li>
                <li><Link href="/product" className="hover:text-gray-400">Product</Link></li>
                <li><Link href="/topup" className="hover:text-gray-400">Topup</Link></li>
                <li><Link href="/contact" className="hover:text-gray-400">Contact</Link></li>
            </ul>
            <Link href="/login" className="hover:text-gray-400">Login</Link>
        </nav>
    )
}
