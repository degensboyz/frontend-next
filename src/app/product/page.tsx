"use client"

import Image from "next/image";
import { useState, useEffect } from "react";
import BoxReviews from "@/components/box/reviews";
import "./product.css";
import { useSearchParams } from "next/navigation";
import { AxiosInstance } from "@/utils/axios";
import { swal, toast } from "@/utils/swal";

const axios = AxiosInstance();

export default function ProductPage() {
    const [product, setProduct] = useState<ProductType | null>(null);
    const [stock, setStock] = useState<number>(0);
    const queryString = useSearchParams();
    const id = queryString.get('id');
    const refreshStock = async () => {
        const { data } = await axios.get(`/product/product/${id}`);
        setStock(data.data.ProductStock[0].stock || 0);
    };

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/product/product/${id}`);
            setProduct(data.data);
            setStock(data.data.ProductStock[0].stock || 0);
        }
        fetchProduct();
    }, []);

    // const [selectedSubMenu, setSelectedSubMenu] = useState<string>('Reviews');
    const onSubmitCheckout = () => {
        swal.fire({
            title: 'Checkout',
            text: 'Are you sure you want to checkout?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            preConfirm: async () => {

                const { data } = await axios.post(`/product/checkout`, {
                    productId: id,
                }).catch(e => e.response);
                return data;
            }
        }).then(r => {
            if (r.isConfirmed) {
                if (r.value.success) {
                    toast.fire({
                        title: 'Success',
                        text: 'Checkout successfully',
                        icon: 'success',
                    });
                    refreshStock();

                } else {
                    toast.fire({
                        title: 'Error',
                        text: r.value.message,
                        icon: 'error',
                    });
                }
            }

        })
    }
    return (
        <div className="md:px-8 px-4">
            <div className="flex flex-col md:flex-row gap-4">
                <div>
                    <div>

                        <Image
                            src={product?.image || 'https://placehold.co/400x400/000000/FFF?text=FFF1'}
                            alt="Product Image"
                            width={600}
                            height={600}
                            unoptimized={true}
                            className="cursor-pointer hover:border-2 hover:border-indigo-600 rounded-md"
                        />
                    </div>
                </div>
                <div>
                    {/* <div></div> */}
                    <h1 className="text-2xl font-bold text-indigo-600">{product?.name}</h1>
                    {/* <h5 className="text-sm text-gray-500">500 Ratings</h5> */}
                    <p className="text-sm text-gray-500">
                        {product?.description}
                    </p>
                    <div className="flex flex-row gap-2 mt-4">
                        <h3 className="text-2xl font-bold text-green-500">{Number(product?.price || '0.00').toFixed(2)} THB</h3>
                    </div>
                    <h1 className="text-l font-bold text-white">สินค้าคงเหลือ {stock} ชิ้น</h1>
                    <div className="flex flex-row gap-2 mt-4">
                        {stock > 0 && (
                            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md w-full"
                                onClick={onSubmitCheckout}
                            >Checkout</button>
                        )}
                        {stock <= 0 && (
                            <button className="bg-red-600 text-white px-4 py-2 rounded-md w-full disabled" disabled
                            >Out of Stock</button>
                        )}
                    </div>
                </div>
            </div>
            {/* <div className="py-4">
                <div className="flex flex-row gap-2">
                    <button onClick={() => setSelectedSubMenu('Reviews')} className={`${selectedSubMenu === 'Reviews' ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"} px-4 py-2 rounded-md`}>Reviews</button>
                    <h1>/</h1>
                    <button onClick={() => setSelectedSubMenu('Information')} className={`${selectedSubMenu === 'Information' ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"} px-4 py-2 rounded-md`}>Information</button>
                    <h1>/</h1>
                    <button onClick={() => setSelectedSubMenu('Shipping')} className={`${selectedSubMenu === 'Shipping' ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"} px-4 py-2 rounded-md`}>Shipping</button>
                </div>
                <div className="bg-gray-800 rounded-md p-4 mt-8 text-white">
                    {selectedSubMenu === 'Reviews' && <BoxReviews />}

                </div>
            </div> */}
        </div>
    );
}
