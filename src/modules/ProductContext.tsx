import React, { createContext, useContext, useState, useEffect } from "react";
import { off, onValue, ref } from "firebase/database";
import { DB } from "myfirebase";
import Spinner from "components/atoms/Spinner";

interface ProductContextValue {
  isloding: boolean;
  products: any[];
}

const productContext = createContext<ProductContextValue>({
  isloding: true,
  products: []
});
export const useProduct = () => useContext(productContext);

interface props {
  children: React.ReactNode;
}
export const ProductProvider = ({ children }: props) => {
  const [isloding, setIsloding] = useState(true);
  const [products, setProduct] = useState<any[]>([]);
  const productRef = ref(DB, `product`);

  useEffect(() => {
    setIsloding(true);
    const onValueChange = (snapshot: any) => {
      if (snapshot) {
        const data = snapshot.val();
        setProduct(data);
        setIsloding(false);
      }
    };
    onValue(productRef, onValueChange);

    return () => {
      off(productRef, "value", onValueChange);
    };
  }, []);

  const value = { isloding, products };

  return (
    <productContext.Provider value={value}>
      {isloding && <Spinner />}
      {!isloding && children}
    </productContext.Provider>
  );
};
