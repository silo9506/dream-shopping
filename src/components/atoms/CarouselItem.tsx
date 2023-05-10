import React from "react";
import { MdCancel } from "react-icons/md";

interface props {
  content: string;
  isActive: boolean;
  deleteImg?: (url: string) => void;
  url?: string;
}
export default function CarouselItem({
  content,
  isActive,
  deleteImg,
  url,
}: props) {
  return (
    <div
      className={`
    w-full h-full flex-none rounded-md relative
    ${
      isActive
        ? "opacity-100 transform-none"
        : "opacity-0 transform-translate-x-full"
    }
  `}
    >
      <MdCancel
        onClick={() => (deleteImg ? deleteImg(url as string) : null)}
        size={20}
        className="absolute top-2 right-2"
      />
      <img className="w-full h-full" src={content} />
    </div>
  );
}
