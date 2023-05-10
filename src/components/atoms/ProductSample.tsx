import React from "react";
import { MdCancel } from "react-icons/md";
interface Props {
  url: string;
  deleteImg: (url: string) => void;
}

export default function ProductSample({ url, deleteImg }: Props) {
  return (
    <div className="w-[500px] h-[500px] relative">
      <img src={url} className="w-full h-full" />
      <MdCancel
        onClick={() => deleteImg(url)}
        size={20}
        className="absolute top-2 right-2"
      />
    </div>
  );
}
