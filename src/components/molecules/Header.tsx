import React from "react";
import { FaKiwiBird } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { SlLogin } from "react-icons/sl";
import { ImUserPlus } from "react-icons/im";
import { MdSell } from "react-icons/md";
import { useAuth } from "modules/AuthContext";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useyyyyMMddhhmmss } from "util/useyyyyMMddhhmmss";
interface props {
  toggleModal: (value: string | null) => void;
  toggleCart: () => void;
}

export default function Header({ toggleModal, toggleCart }: props) {
  const { currentUser, logout, dbUser } = useAuth();
  const navigate = useNavigate();
  const key = useyyyyMMddhhmmss();

  const onClikcCart = () => {
    if (!currentUser) {
      alert("로그인 후 이용 가능합니다.");
      toggleModal("Auth");
    }
    if (currentUser) {
      toggleCart();
    }
  };

  const onClickSeller = () => {
    if (!currentUser) {
      alert("로그인 후 이용 가능합니다.");
      toggleModal("Auth");
    }
    if (currentUser) {
      if (dbUser.seller) {
        return navigate(`/seller/${key}`);
      }
      toggleModal("Seller");
    }
  };

  const onClickLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="border border-b-2 border-solid ">
      <div className="flex items-center max-w-5xl pb-2 mx-auto">
        <div
          onClick={() => navigate("/")}
          className="flex items-center cursor-pointer"
        >
          <FaKiwiBird size={50} className="mr-2 text-[#7FFF00]" />
          <h1>KIWIKI</h1>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={onClickSeller}
            className="flex flex-col items-center justify-center px-1 h-[35px] "
          >
            <MdSell size={20} />
            <span className="text-[10px]">판매</span>
          </button>
          {currentUser && <button>{currentUser.displayName}</button>}

          <button
            onClick={onClikcCart}
            className=" p-[2px]  w-[35px] h-[35px]  "
          >
            <GiShoppingCart className="w-full h-full fill-black " />
          </button>
          {currentUser ? (
            <button onClick={onClickLogout} className="w-[35px] h-[35px]   ">
              <BiLogOut className="w-full h-full " />
            </button>
          ) : (
            <button
              onClick={() => toggleModal("Auth")}
              className="flex text-[20px] h-[35px] items-center "
            >
              <SlLogin className="mx-1" />
              /<ImUserPlus className="mx-1" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
