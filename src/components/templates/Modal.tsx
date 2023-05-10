import AuthForm from "components/molecules/AuthForm";
import SellerForm from "components/molecules/SellerForm";
import React, { useEffect, useState } from "react";

import useScrollStop from "util/useScrollStop";

interface props {
  toggleModal: (value: string | null) => void;
  modal: string | null;
  onModal: boolean;
}

export default function Modal({ toggleModal, modal, onModal }: props) {
  useScrollStop(onModal);

  if (modal === "Auth") return <AuthForm toggleModal={toggleModal} />;

  if (modal === "Seller") return <SellerForm toggleModal={toggleModal} />;

  return null;
}
