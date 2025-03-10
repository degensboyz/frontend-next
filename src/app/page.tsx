import ProductGrid from "@/components/productGrid";
import { AxiosInstance } from "@/utils/axios";
export default async function Home() {
  const axiosInstance = AxiosInstance();
  const product = await axiosInstance.get("/product/product");
  const items = product.data.data;
  return (
    <ProductGrid items={items} />
  );
}
