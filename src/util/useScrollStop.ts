import React, { useEffect } from "react";

export default function useScrollStop(dependence: boolean = true) {
  useEffect(() => {
    if (dependence) {
      document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      width: 100%;`;
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = "";
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      };
    }
  }, [dependence]);
}
