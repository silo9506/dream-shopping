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
    <tr>
      <td className="flex">
        <img src={product.imgs[0]} className="w-[50px]" />
        <h1>{product.name}</h1>
      </td>
      <td>
        <h5>{item.price}원</h5>
      </td>
      <td>
        <input type="number" value={quantity} onChange={onChange}></input>
      </td>
      <td onClick={delItem}>
        <MdOutlineDeleteOutline />
      </td>
    </tr>
  );
}
