import React from "react";

interface Props {
  toggleCart: () => void;
  toggleModal: (value: string | null) => void;
  onCart: boolean;
  onModal: boolean;
}
export default function Backdrop({
  toggleCart,
  onCart,
  toggleModal,
  onModal,
}: Props) {
  const onClick = () => {
    if (onModal) {
      return toggleModal(null);
    }
    if (onCart) {
      return toggleCart();
    }
  };

  return (
    <div
      onClick={onClick}
      className={`transition-opacity duration-300 fixed top-0 left-0 w-screen h-screen bg-black  cursor-pointer ${
        onCart || onModal ? "opacity-50 z-20" : "opacity-0 z-[-1]"
      }`}
    ></div>
  );
}
