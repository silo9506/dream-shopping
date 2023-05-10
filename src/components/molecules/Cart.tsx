import React from "react";
import { MdCancel } from "react-icons/md";
import useScrollStop from "util/useScrollStop";

interface prop {
  toggleCart: () => void;
  onCart: boolean;
}

export default function Cart({ toggleCart, onCart }: prop) {
  useScrollStop(onCart);
  return (
    <div
      className={`transition-transform duration-300 z-50 w-[40vw] bg-white min-h-[100vh] fixed top-0 right-0 ${
        onCart ? "translate-x-0" : "translate-x-[100%]"
      } `}
    >
      <MdCancel
        onClick={toggleCart}
        size={20}
        className="absolute cursor-pointer right-3 top-3"
      />
    </div>
  );
}
