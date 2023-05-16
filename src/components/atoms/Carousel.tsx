import CarouselItem from "components/atoms/CarouselItem";
import useThrottle from "util/useThrottle";
import React, { useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { BsDot } from "react-icons/bs";
interface props {
  items: string[];
  deleteImg?: (url: string) => void;
}
export default function Carousel({ items, deleteImg }: props) {
  const itemsList = [items.at(-1), ...items, items.at(0)] as string[];
  const [activeIndex, setActiveIndex] = useState(1);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setAnimate(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [animate]);

  useEffect(() => {
    if (activeIndex === itemsList.length - 1) {
      const timer = setTimeout(() => {
        setActiveIndex(1);
      }, 500);
      return () => clearTimeout(timer);
    }
    if (activeIndex === 0) {
      const timer = setTimeout(() => {
        setActiveIndex(itemsList.length - 2);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [activeIndex]);

  const handlePrevSlide = useThrottle({
    fn: () => {
      setAnimate(true);
      setActiveIndex((prevIndex) =>
        prevIndex === 0 ? itemsList.length - 1 : prevIndex - 1
      );
    },
    delay: 500,
  });

  const handleNextSlide = useThrottle({
    fn: () => {
      setAnimate(true);
      setActiveIndex((prevIndex) =>
        prevIndex === itemsList.length - 1 ? 1 : prevIndex + 1
      );
    },
    delay: 500,
  });

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div
        className="flex w-full h-full"
        style={{
          transform: `translateX(-${activeIndex * 100}%)`,
          transition: `transform ${animate ? 300 : 0}ms ease-in-out 0s`,
        }}
      >
        {itemsList.map((item, index) => (
          <div
            key={index}
            className={`w-full h-full flex-none rounded-md relative ${
              index === activeIndex
                ? " transform-none"
                : "transform-translate-x-full"
            }`}
          >
            {deleteImg !== undefined && (
              <MdCancel
                onClick={() => {
                  deleteImg(item);
                  setActiveIndex(1);
                }}
                size={20}
                className="absolute top-2 right-2"
              />
            )}
            <img className="w-full h-full" src={item} />
          </div>
        ))}
      </div>
      {itemsList.length > 3 && (
        <>
          <button
            type="button"
            className="absolute left-0 z-10 px-4 py-2 text-white transform -translate-y-1/2 bg-black bg-opacity-50 top-1/2 hover:bg-opacity-75 rounded-l-md focus:outline-none"
            onClick={handlePrevSlide}
          >
            이전
          </button>
          <button
            type="button"
            className="absolute right-0 z-10 px-4 py-2 text-white transform -translate-y-1/2 bg-black bg-opacity-50 top-1/2 hover:bg-opacity-75 rounded-r-md focus:outline-none"
            onClick={handleNextSlide}
          >
            다음
          </button>

          <div className="absolute bottom-[0px] right-[50%] flex translate-x-[50%] translate-y-[-50%] gap-3 ">
            {items.map((item, index: number) => (
              <div
                key={item}
                onClick={() => {
                  setActiveIndex(index + 1);
                  setAnimate(true);
                }}
                className={`w-[15px] h-[15px] border  border-solid  cursor-pointer  rounded-full border-white  ${
                  animate
                    ? "duration-200 transition-colors delay-300"
                    : "duration-0 delay-0"
                }   ${index === activeIndex - 1 ? "bg-black " : "bg-white "}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
