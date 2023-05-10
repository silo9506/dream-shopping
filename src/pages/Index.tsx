import React, { useState } from "react";
import Header from "components/molecules/Header";
import { Outlet } from "react-router-dom";
import Modal from "components/templates/Modal";
import Cart from "components/molecules/Cart";
import Backdrop from "components/atoms/Backdrop";

export default function Index() {
  const [onModal, setOnModal] = useState(false);
  const [onCart, setOnCart] = useState(false);
  const [modal, setModal] = useState<null | string>(null);

  const toggleModal = (value: string | null) => {
    setOnModal((prev) => !prev);
    setModal(value);
  };
  const toggleCart = () => {
    setOnCart((prev) => !prev);
  };

  return (
    <div className="bg-[#f5f5f5]">
      <Backdrop
        toggleCart={toggleCart}
        onCart={onCart}
        toggleModal={toggleModal}
        onModal={onModal}
      />
      <Header toggleModal={toggleModal} toggleCart={toggleCart} />
      <div className="max-w-5xl mx-auto">
        <Modal onModal={onModal} modal={modal} toggleModal={toggleModal} />
        <Cart onCart={onCart} toggleCart={toggleCart} />
        <Outlet />
      </div>
    </div>
  );
}
