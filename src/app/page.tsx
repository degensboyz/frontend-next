import ProductGrid from "@/components/productGrid";
import { AxiosInstance } from "@/utils/axios";
export default async function Home() {
  console.log("Home import")
  try {

    const axiosInstance = AxiosInstance();
    const product = await axiosInstance.get("/product/product");
    const items = product.data.data;
    
    return (
      <ProductGrid items={items} />
    );
  } catch (error) {
    console.log(error);
    return (
      <div>
        <h1>Error</h1>
      </div>
    );
  }
}

