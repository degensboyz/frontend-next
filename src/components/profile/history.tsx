'use client'
import { useState, useEffect } from "react";
import { AxiosInstance } from "@/utils/axios";

const axios = AxiosInstance();

export default function ProfileHistory() {
    const [history, setHistory] = useState<any[]>([]);

    useEffect(() => {
        const fetchHistory = async () => {
            const { data } = await axios.get('/transactions/buy');
            setHistory(data.data);
        }
        fetchHistory();
    }, []);

    return (
        <div className="overflow-x-auto w-full">
            <h1 className="text-2xl font-bold mb-4 text-white">ประวัติการซื้อสินค้า</h1>
            <h1 className="text-2xl font-bold mb-4 text-white">ทั้งหมด {history.length} รายการ</h1>
            <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-3 font-medium text-gray-700">สินค้า</th>
                        <th className="px-4 py-3 font-medium text-gray-700">ราคา</th>
                        <th className="px-4 py-3 font-medium text-gray-700">วันที่</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">

                    {history.map((item, index) => (
                        <tr key={item.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-200'} hover:bg-gray-300`}>
                            <td className="px-4 py-2">{item.product.name}</td>
                            <td className="px-4 py-2">{item.product.price}</td>
                            <td className="px-4 py-2">{new Date(item.createdAt).toLocaleString('th-TH', {
                                year: 'numeric',
                                month: 'short',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                            })}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
}
