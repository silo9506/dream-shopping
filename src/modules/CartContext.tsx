import { off, onValue, ref } from "firebase/database";
import { DB } from "myfirebase";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

interface CartContextValue {
  isloding: boolean;
  userCart: any[];
}

const CartContext = createContext<CartContextValue>({
  isloding: true,
  userCart: [],
});
export const useCart = () => useContext(CartContext);

interface props {
  children: React.ReactNode;
}
export default function CartProvider({ children }: props) {
  const [userCart, setUserCart] = useState<any[]>([]);
  const [isloding, setIsloding] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      const cartRef = ref(DB, `cart/${currentUser.uid}`);
      const onValueChange = (snapshot: any) => {
        if (snapshot) {
          const data = snapshot.val();
          setUserCart(data);
          setIsloding(false);
        }
      };
      onValue(cartRef, onValueChange);

      return () => {
        off(cartRef, "value", onValueChange);
      };
    }
  }, [currentUser]);

  const value = { userCart, isloding };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
