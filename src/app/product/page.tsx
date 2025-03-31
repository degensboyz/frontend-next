"use client"

import Image from "next/image";
import { useState } from "react";
import BoxReviews from "@/components/box/reviews";
import "./product.css";

export default function ProductPage() {
    const [selectedOption, setSelectedOption] = useState<number>(1);
    const [currentQuantity, setCurrentQuantity] = useState<number>(1);
    function updateCurrentQuantity(quantity: number) {
        if (quantity < 0) {
            setCurrentQuantity(0);
        } else {
            setCurrentQuantity(quantity);
        }
    }
    const imageSelected = ['https://placehold.co/400x400/000000/FFF?text=FFF1', 'https://placehold.co/400x400/000000/FFF?text=FFF2', 'https://placehold.co/400x400/000000/FFF?text=FFF3']
    const [selectedImage, setSelectedImage] = useState<string>(imageSelected[0])
    const options = [
        {
            id: 1,
            name: "250 g.",
            price: 100
        },
        {
            id: 2,
            name: "500 g.",
            price: 200
        },
        {
            id: 3,
            name: "1 kg.",
            price: 300
        },
        {
            id: 4,
            name: "2 kg.",
            price: 400
        }
    ]
    const subImage = [
        'https://placehold.co/400x400/000000/FFF?text=FFF1',
        'https://placehold.co/400x400/000000/FFF?text=FFF2',
        'https://placehold.co/400x400/000000/FFF?text=FFF3',
        'https://placehold.co/400x400/000000/FFF?text=FFF4',
        'https://placehold.co/400x400/000000/FFF?text=FFF5',
        'https://placehold.co/400x400/000000/FFF?text=FFF6',
        'https://placehold.co/400x400/000000/FFF?text=FFF7',
        'https://placehold.co/400x400/000000/FFF?text=FFF8',
        'https://placehold.co/400x400/000000/FFF?text=FFF9',
        'https://placehold.co/400x400/000000/FFF?text=FFF10',
    ]
    const [selectedSubMenu, setSelectedSubMenu] = useState<string>('Reviews');
    return (
        <div className="md:px-8">
            <div className="flex flex-col md:flex-row gap-4">
                <div>
                    <div>

                        <Image
                            src={selectedImage}
                            alt="Product Image"
                            width={600}
                            height={600}
                            unoptimized={true}
                            className="cursor-pointer hover:border-2 hover:border-indigo-600 rounded-md"
                        />
                    </div>
                    <div className="mt-4">
                        <div className="flex flex-row gap-2 overflow-x-auto py-2 scrollbar-pretty">
                            {subImage.map((image, index) => (
                                <Image src={image}
                                    className={`cursor-pointer hover:border-2 hover:border-indigo-600 rounded-md ${selectedImage === image ? "border-2 border-indigo-600" : ""}`}
                                    key={index.toString()}
                                    alt="Star"
                                    width={60}
                                    height={60}
                                    unoptimized={true}
                                    onClick={() => setSelectedImage(image)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    {/* <div></div> */}
                    <h1 className="text-2xl font-bold text-white">Ground Nuts Oil Pack 50kg</h1>
                    <h5 className="text-sm text-gray-500">500 Ratings</h5>
                    <p className="text-sm text-gray-500">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur earum beatae, itaque veniam similique eum doloremque repudiandae eveniet labore maxime delectus praesentium blanditiis, aperiam reprehenderit sequi id provident suscipit dicta architecto temporibus distinctio harum. Corrupti dolorum, ipsam rerum officia vero in nobis modi! Exercitationem, possimus aliquam quisquam similique eveniet neque.
                    </p>
                    <div className="flex flex-row gap-2 mt-4">
                        <h3 className="text-2xl font-bold text-white">1000 THB</h3>
                        {/* <button className="bg-indigo-600 text-white px-4 py-2 rounded-md">Add to Cart</button> */}
                    </div>
{/* 
                    <div className="flex flex-col gap-2 py-4">
                        <h1 className="text-2xl font-bold text-white">Weight</h1>
                        <div className="flex flex-row gap-4">
                            {options.map((option) => (
                                <button key={option.id} onClick={() => setSelectedOption(option.id)} className={`${selectedOption === option.id ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"} px-4 py-2 rounded-md`}>{option.name}</button>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex flex-row gap-2">
                            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md" onClick={() => updateCurrentQuantity(currentQuantity - 1)}>-</button>
                            <label htmlFor="quantity" className="text-2xl font-bold pt-2 text-white">{currentQuantity}</label>
                            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md" onClick={() => updateCurrentQuantity(currentQuantity + 1)}>+</button>
                        </div>
                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md">Add to cart</button>
                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>

                        </button>
                    </div> */}
                </div>
            </div>
            <div className="py-4">
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
            </div>
        </div>
    );
}
