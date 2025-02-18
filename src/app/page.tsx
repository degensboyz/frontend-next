import ProductGrid from "@/components/productGrid";
import Image from "next/image";

export default function Home() {
  const items = [
    {
      id: 1,
      name: "Item 1",
      image: "/item1.png"
    },
    {
      id: 2,
      name: "Item 2",
      image: "/item2.png"
    }, {
      id: 3,
      name: "Item 3",
      image: "/item3.png"
    }, {
      id: 4,
      name: "Item 4",
      image: "/item4.png"
    }, {
      id: 5,
      name: "Item 5",
      image: "/item5.png"
    }, {
      id: 6,
      name: "Item 6",
      image: "/item6.png"
    }, {
      id: 7,
      name: "Item 7",
      image: "/item7.png"
    }

  ]
  return (
    <ProductGrid items={items} />
  );
}
