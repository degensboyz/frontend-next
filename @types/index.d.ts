// Generated by https://quicktype.io
declare global {
    interface ProductType {
        id: number;
        name: string;
        description: string;
        image: string;
        price: Number;
        categoryId: number;
        isDeleted: boolean;
        ProductStock: {
            id: number;
            productId: number;
            stock: number;
        }[]
    }
}

export { };