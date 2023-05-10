import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  items: { [key: string]: any };
}

export default function ProductCard({ items }: Props) {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/product/${items.key}`);
  };

  return (
    <div
      onClick={onClick}
      className="rounded shadow-lg max-h-[350px] cursor-pointer"
    >
      <img className="w-full h-[70%]" src={items.imgs[0]} />
      <h1 className="text-lg font-bold">{items.name}</h1>
      <h3 className="text-base font-medium">{items.price}원</h3>
    </div>
  );
}
