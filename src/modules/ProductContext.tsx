import React, { createContext, useContext, useState, useEffect } from "react";
import { get, onValue, ref, runTransaction } from "firebase/database";
import { DB } from "myfirebase";

interface ProductContextValue {
  loading: boolean;
  products: any[];
}

const productContext = createContext<ProductContextValue>({
  loading: true,
  products: [],
});
export const useProduct = () => useContext(productContext);

interface props {
  children: React.ReactNode;
}
export const ProductProvider = ({ children }: props) => {
  const [loading, setLoading] = useState(true);
  const [products, setProduct] = useState<any[]>([]);
  const productRef = ref(DB, `product`);

  useEffect(() => {
    setLoading(true);
    const onValueChange = (snapshot: any) => {
      if (snapshot) {
        const data = snapshot.val();
        setProduct(data);
        setLoading(false);
      }
    };
    onValue(productRef, onValueChange);

    return () => {
      onValue(productRef, onValueChange);
    };
  }, []);

  const value = { loading, products };

  return (
    <productContext.Provider value={value}>
      {!loading && children}
    </productContext.Provider>
  );
};
