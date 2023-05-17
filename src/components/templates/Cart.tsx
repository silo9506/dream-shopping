import CartItemCard from "components/atoms/CartItemCard";
import { useAuth } from "modules/AuthContext";
import { MdCancel } from "react-icons/md";
import useScrollStop from "util/useScrollStop";

interface prop {
  toggleCart: () => void;
  onCart: boolean;
}

export default function Cart({ toggleCart, onCart }: prop) {
  useScrollStop(onCart);
  const { userCart } = useAuth();

  console.log(userCart);
  return (
    <div
      className={`transition-transform duration-300 z-50 w-[40vw] pt-20 bg-white min-h-[100vh] fixed top-0 right-0 ${
        onCart ? "translate-x-0" : "translate-x-[100%]"
      } `}
    >
      <MdCancel
        onClick={toggleCart}
        size={20}
        className="absolute cursor-pointer right-3 top-3"
      />
      <table className="">
        <thead>
          <tr>
            <th className="w-[35%]">상품명</th>
            <th className="w-[20%]">판매가</th>
            <th className="w-[20%]">수량</th>
            <th className="w-[20%]">삭제</th>
          </tr>
        </thead>
        <tbody>
          {userCart &&
            userCart.map((item, index: number) => (
              <CartItemCard item={item} key={item.key + index} />
            ))}
        </tbody>
      </table>
    </div>
  );
}
