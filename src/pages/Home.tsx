import React from "react";
import banner01 from "assets/img/banner01.png";
import banner02 from "assets/img/banner02.png";
import banner03 from "assets/img/banner03.png";
import Carousel from "components/atoms/Carousel";
import { useProduct } from "modules/ProductContext";
import ProductCard from "components/atoms/ProductCard";
export default function Home() {
  const items = [banner01, banner02, banner03];
  const { products } = useProduct();
  return (
    <div>
      <div className="h-60">
        <Carousel items={items} />
      </div>
      <div className="grid w-full grid-cols-3 gap-4 py-4 sm:grid-cols-4">
        {products && (
          <>
            {products.map((product) => (
              <ProductCard items={product} key={product.key} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
