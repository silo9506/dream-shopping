import { DB } from "myfirebase";
import { get, ref, runTransaction, set } from "firebase/database";

interface setDbProps {
  Route: string;
  data?: any;
  porduct?: boolean;
}

export const useDb = () => {
  const setDb = async ({ Route, data }: setDbProps) => {
    const userRef = ref(DB, Route);
    await runTransaction(userRef, (userData) => {
      if (userData === null) {
        return data;
      }
      if (Array.isArray(userData)) {
        const newData = [...userData, ...data];
        return newData;
      }
      return;
    }).catch((error) => {
      alert(error);
    });
  };

  const updateDb = async ({ Route, data, porduct }: setDbProps) => {
    const userRef = ref(DB, Route);

    await runTransaction(userRef, (userData) => {
      if (userData === null) {
        return data;
      }

      if (porduct) {
        const overlap = userData.find(
          (item: any) =>
            data[0].key + data[0].selectOption === item.key + item.selectOption
        );

        if (overlap) {
          return alert("장바구니에 보관중인 아이템입니다.");
        }
      }

      if (Array.isArray(userData)) {
        const newData = [...userData, ...data];
        return newData;
      }

      const newData = { ...userData, ...data };
      return newData;
    }).catch((error) => {
      alert(error);
    });
  };

  const deleteDb = async ({ Route, data }: setDbProps) => {
    const userRef = ref(DB, Route);
    const snapshot = await get(userRef);
    const userData = await snapshot.val();

    const newData = Array.isArray(userData)
      ? userData.filter((item: any) => {
          return item.key + item.selectOption !== data.key + data.selectOption;
        })
      : [];

    await set(userRef, [...newData]);
  };

  const changeDb = async ({ Route, data }: setDbProps) => {
    const userRef = ref(DB, Route);
    const snapshot = await get(userRef);
    const userData = await snapshot.val();

    const activeData = userData.find(
      (item: any) =>
        item.key + item.selectOption === data.key + data.selectOption
    );
    activeData.quantity = data.quantity;

    console.log(userData);

    await set(userRef, userData);
  };

  return { setDb, updateDb, deleteDb, changeDb };
};
