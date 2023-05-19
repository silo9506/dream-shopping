import CartItemCard from "components/atoms/CartItemCard";
import { useCart } from "modules/CartContext";
import { MdCancel } from "react-icons/md";
import useScrollStop from "util/useScrollStop";

interface prop {
  toggleCart: () => void;
  onCart: boolean;
}

export default function Cart({ toggleCart, onCart }: prop) {
  useScrollStop(onCart);
  const { userCart } = useCart();

  return (
    <div
      className={`transition-transform duration-300 z-50 sm:min-w-[400px] overflow-auto  px-2  w-full sm:w-[40vw] pt-20 bg-white min-h-[100vh] fixed top-0 bottom-0 right-0 ${
        onCart ? "translate-x-0" : "translate-x-[100%]"
      } `}
    >
      <MdCancel
        onClick={toggleCart}
        size={20}
        className="absolute cursor-pointer right-3 top-3"
      />
      {userCart && (
        <table className="w-full">
          <thead>
            <tr>
              <th className="w-[15%]"></th>
              <th className="w-[40%]">상품명</th>
              <th className="w-[20%]">판매가</th>
              <th className="w-[10%]">수량</th>
              <th className="w-[10%]">삭제</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {userCart.map((item, index: number) => (
              <CartItemCard item={item} key={item.key + index} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
