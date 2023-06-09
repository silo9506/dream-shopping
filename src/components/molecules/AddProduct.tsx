import React, { useEffect, useRef, useState } from "react";
import imgicon from "assets/img/imgicon.png";
import useCloudinary from "hooks/useCloudinary";
import { useAuth } from "modules/AuthContext";
import { useDb } from "hooks/useDb";
import { useNavigate, useParams } from "react-router-dom";
import Carousel from "../atoms/Carousel";

export default function AddProduct() {
  const fileRef = useRef<HTMLInputElement>(null);
  const { currentUser } = useAuth();

  const [imgList, setImgList] = useState<string[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [description, setDescription] = useState("");
  const [option, setOption] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const { number } = useParams();
  const { uploaded, uploadImage, loading } = useCloudinary({
    uid: currentUser.uid,
  });
  const { setDb } = useDb();

  useEffect(() => {
    const dbUpdate = async () => {
      await setDb({
        Route: `product`,
        data: [
          {
            key: currentUser?.uid + number,
            imgs: imgList,
            name: productName,
            price,
            description,
            option,
            category,
          },
        ],
      });
      navigate("/");
    };
    if (uploaded) {
      dbUpdate();
    }
  }, [uploaded]);

  const fileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = Array.from(e.target.files || []);

    if (imgList.length + fileList.length > 5) {
      return alert("5개 이상 업로드는 불가능합니다.");
    }

    const newImgList: string[] = [];
    const fileExtension = ["png", "jpg", "jpeg"];

    for (const file of fileList) {
      const reader = new FileReader();

      const extension = file.name.split(".").pop()?.toLowerCase();

      if (extension && fileExtension.includes(extension)) {
        reader.onload = (event) => {
          if (typeof event.target?.result === "string") {
            newImgList.push(event.target?.result);

            if (newImgList.length === fileList.length) {
              setImgList((prevImgList) => [...prevImgList, ...newImgList]);
            }
          }
        };

        reader.readAsDataURL(file);
      } else {
        alert("이미지 파일만 업로드가 가능합니다.");
      }
    }
    e.target.value = "";
  };

  const deleteImg = (url: string) => {
    setImgList((prev) => prev.filter((item) => item !== url));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (imgList.length < 1) {
      return alert("최소 1장의 사진을 등록해주세요");
    }
    await uploadImage(imgList);
  };

  return (
    <div>
      <h1 className="text-xl text-center ">새로운 상품 등록</h1>
      <form className="flex flex-col gap-2 px-4 mt-4" onSubmit={onSubmit}>
        <div className="flex flex-col items-center justify-center w-full max-w-[400px]  h-[400px]  gap-2 mx-auto">
          {imgList.length < 1 ? (
            <img src={imgicon} alt="product" className="h-[300px] " />
          ) : (
            <Carousel items={imgList} deleteImg={deleteImg} />
          )}
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <h5>최소 1장 최대5장의 상품사진을 등록할 수 있습니다.</h5>
          <input
            multiple
            ref={fileRef}
            type="file"
            className="hidden"
            onChange={fileChange}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="bg-[#00ff7f] p-1 rounded max-w-[40ch] w-full disabled:bg-slate-600 "
            disabled={imgList.length >= 5}
          >
            사진 등록
          </button>
        </div>
        <input
          required
          className="w-full p-1 border-black border-solid border-[1px]"
          placeholder="제품명"
          onChange={(e) => setProductName(e.target.value.trimStart())}
          value={productName}
        ></input>
        <input
          required
          className="w-full p-1 border-black border-solid border-[1px]"
          placeholder="가격"
          value={price?.toString() || ""}
          type="number"
          min={1}
          onChange={(e) => {
            const parsedValue = parseInt(e.target.value);
            if (!isNaN(parsedValue)) {
              setPrice(parsedValue);
            } else {
              setPrice(undefined);
            }
          }}
        ></input>
        <select
          required
          className="w-full p-1 border-black border-solid border-[1px]"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled hidden>
            카테고리 선택
          </option>
          <option value={"의류"}>의류</option>
          <option value={"전자기기"}>전자기기</option>
          <option value={"식품"}>식품</option>
          <option value={"생필품"}>생필품</option>
          <option value={"기타"}>기타</option>
        </select>
        <textarea
          required
          placeholder="상품설명"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-1 resize-none min-h-[300px] border-black border-solid border-[1px]"
        ></textarea>
        <input
          required
          value={option}
          onChange={(e) => {
            const inputValue = e.target.value;
            const options = inputValue.split(",").map(
              (option) => option.trimStart()
              // option.trimEnd();
            );
            console.log(options);
            setOption(options);
            // setOption([inputValue]);
          }}
          className="w-full p-1 border-black border-solid border-[1px]"
          placeholder="옵션들(콤마(,)로구분)"
        ></input>

        <button
          type="submit"
          className="mx-auto mb-1 duration-300 relative w-full  border bg-white border-white border-solid uppercase py-2 overflow-hidden
        after:absolute after:top-0 after:right-full after:bg-[#00ff7f] after:z-10 after:w-full after:h-full after:duration-300
        hover:after:translate-x-full hover:text-slate-900 "
        >
          <h2 className="relative z-20">상품 등록</h2>
        </button>
      </form>
    </div>
  );
}
