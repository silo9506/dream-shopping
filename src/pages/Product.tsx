import Carousel from "components/atoms/Carousel";
import { useProduct } from "modules/ProductContext";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Product() {
  const { products } = useProduct();
  const param = useParams();
  const product = products.find(
    (product: { [key: string]: any }) => product.key === param.key
  );

  return (
    <div className="flex">
      <div className="w-[50%] h-[500px]">
        <Carousel items={product.imgs} />
      </div>
      <div>
        <h3>{product.name}</h3>
        <h3>{product.price}원</h3>
      </div>
    </div>
  );
}
