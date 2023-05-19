import { useDb } from "hooks/useDb";
import { useAuth } from "modules/AuthContext";
import { useProduct } from "modules/ProductContext";
import { useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
interface Props {
  item: { [key: string]: any };
}
export default function CartItemCard({ item }: Props) {
  const [quantity, setQuantity] = useState(item.quantity);

  const { products } = useProduct();
  const { currentUser } = useAuth();
  const { deleteDb, changeDb } = useDb();

  const product = products.find((product) => item.key === product.key);

  const onChange = (e: any) => {
    if (e.target.value <= 0) {
      return alert("최소 구매수량은 1개입니다.");
    }
    setQuantity(e.target.value);
    changeDb({
      Route: `cart/${currentUser.uid}`,
      data: {
        key: item.key,
        quantity: e.target.value,
        selectOption: item.selectOption,
      },
      newdata: "quantity",
    });
  };

  const delItem = () => {
    deleteDb({
      Route: `cart/${currentUser.uid}`,
      data: {
        key: item.key,
        quantity: item.quantity,
        selectOption: item.selectOption,
      },
    });
  };

  return (
    <tr className="">
      <td className="w-[15%]">
        <img src={product.imgs[0]} className="w-[full]" />
      </td>
      <td className="w-[40%]">
        <h1 className="text-center line-clamp-1">{product.name}</h1>
        <h1 className="text-sm text-center">{item.selectOption}</h1>
      </td>
      <td className="w-[20%] ">
        <h5 className="text-center">{product.price}원</h5>
      </td>
      <td className="w-[10%]">
        <input
          className="w-full text-center"
          type="number"
          value={quantity}
          onChange={onChange}
        />
      </td>
      <td className="w-[10%]">
        <MdOutlineDeleteOutline
          onClick={delItem}
          className="mx-auto cursor-pointer"
        />
      </td>
    </tr>
  );
}
