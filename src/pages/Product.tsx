import Carousel from "components/atoms/Carousel";
import { useProduct } from "modules/ProductContext";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsFillArrowUpSquareFill, BsArrowDownSquareFill } from "react-icons/bs";
import { useDb } from "hooks/useDb";
import { useAuth } from "modules/AuthContext";

export default function Product() {
  const [selectOption, setSelectOption] = useState("");
  const { currentUser, dbUser } = useAuth();
  const { products } = useProduct();
  const param = useParams();
  const product: { [key: string]: any } = products.find(
    (product: { [key: string]: any }) => product.key === param.key
  );
  const [quantity, setQuantity] = useState<number>(1);
  const { setDb } = useDb();

  const onClikcCart = async (e: React.FormEvent) => {
    e.preventDefault();
    await setDb({
      Route: `cart/${currentUser.uid}`,
      data: [{ key: product.key, quantity, selectOption }],
    });
  };

  const onChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);

    if (Number.isNaN(value)) {
      return setQuantity(1);
    }

    if (value < 1) {
      return setQuantity(1);
    }
    if (value > 999) {
      return alert("최대수량을 초과하였습니다.");
    }
    return setQuantity(value);
  };

  return (
    <div>
      <h3 className="my-4 text-4xl">{product.name}</h3>

      <div className="flex gap-4">
        <div className="w-[50%] h-[450px]">
          <Carousel items={product.imgs} />
        </div>

        <form className="flex flex-col flex-1">
          <ul className="flex flex-col gap-4">
            <li className="flex">
              <h5 className="text-gray-500 basis-20 ">판매가</h5>
              <p className="">{product.price}원</p>
            </li>
            <li className="flex w-full">
              <h5 className="text-gray-500 basis-20 ">상품종류</h5>
              <p className="">{product.category}</p>
            </li>

            <li className="flex w-full">
              <h5 className="text-gray-500 basis-20 ">옵션</h5>
              <select
                required
                className="w-full p-1 border-black border-solid border-[1px] max-w-[35ch] text-sm"
                value={selectOption}
                onChange={(e) => setSelectOption(e.target.value)}
              >
                <option value="" disabled hidden>
                  옵션 선택
                </option>

                {product.option[0]
                  .split(",")
                  .map((data: string, index: number) => (
                    <option key={data + index} value={data}>
                      {data}
                    </option>
                  ))}
              </select>
            </li>
            <li className="flex items-center w-full">
              <h5 className="text-gray-500 basis-20 ">수량</h5>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="999"
                  className="w-[5ch] outline-none px-2 py-1 text-center border  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  value={quantity}
                  onChange={onChangeQuantity}
                />
                <div className="absolute top-0 left-[100%] flex flex-col justify-between h-full ">
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((prev) => Math.min(prev + 1, 999))
                    }
                  >
                    <BsFillArrowUpSquareFill className="transition-colors duration-200 ease-in-out rounded-md hover:text-[#7FFF00]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  >
                    <BsArrowDownSquareFill className="transition-colors duration-200 ease-in-out rounded-md hover:text-[#7FFF00]" />
                  </button>
                </div>
              </div>
              <span className="ml-[2ch]">개</span>
            </li>
          </ul>

          <div className="flex mt-auto mb-6">
            <button className="bg-red-500 text-white   p-1 rounded max-w-[40ch] w-full disabled:bg-slate-600 ">
              구매하기
            </button>
            <button
              onClick={onClikcCart}
              className="bg-blue-500 text-white  p-1 rounded max-w-[40ch] w-full disabled:bg-slate-600 "
            >
              장바구니
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
