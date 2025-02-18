import Image from "next/image";
import Link from "next/link";

export default function ProductGrid({ items }: { items: { id: number, name: string, image: string }[] }) {
    return (
        <div className="p-6 sm:ml-64">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col items-center p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105"
                    >
                        <div className="w-full h-40 relative">
                            <Image
                                src="https://placehold.co/400x400/000000/FFF?text=FFF"
                                alt={item.name}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-md"
                                unoptimized={true}
                            />
                        </div>
                        <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                            {item.name}
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                            This is a description of {item.name}.
                        </p>
                        <p className="mt-2 text-lg font-bold text-indigo-600 dark:text-indigo-400">
                            $19.99
                        </p>
                        <Link
                            key={item.id.toString()}
                            href={{
                                pathname: '/product',
                                query: { id: item.id },
                            }} className="mt-3 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600">
                            View Product
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
