import { DB } from "myfirebase";
import { get, ref, set, update } from "firebase/database";

interface Fnargument {
  Route: string;
  data?: any;
  newdata?: any;
}

export const useDb = () => {
  const setDb = async ({ Route, data }: Fnargument) => {
    try {
      const userRef = ref(DB, Route);
      const snapshot = await get(userRef);
      const userData = await snapshot.val();
      if (userData === null) {
        return set(userRef, data);
      }
      if (data[0].selectOption) {
        const overlap = userData.find(
          (item: any) =>
            data[0].key + data[0].selectOption === item.key + item.selectOption
        );
        if (overlap) {
          return alert("장바구니에 보관중인 아이템입니다.");
        }
      }

      if (Array.isArray(userData)) {
        return set(userRef, [...userData, ...data]);
      }
    } catch (error) {
      alert(error);
    }
  };

  const updateDb = async ({ Route, data }: Fnargument) => {
    try {
      const userRef = ref(DB, Route);
      await update(userRef, data);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const deleteDb = async ({ Route, data }: Fnargument) => {
    try {
      const userRef = ref(DB, Route);
      const snapshot = await get(userRef);
      const userData = await snapshot.val();

      const newData = Array.isArray(userData)
        ? userData.filter((item: any) => {
            return (
              item.key + item.selectOption !== data.key + data.selectOption
            );
          })
        : [];

      await set(userRef, [...newData]);
    } catch {}
  };

  const changeDb = async ({ Route, data, newdata }: Fnargument) => {
    try {
      const userRef = ref(DB, Route);
      const snapshot = await get(userRef);
      const userData = await snapshot.val();

      const activeData = userData.find(
        (item: any) =>
          item.key + item.selectOption === data.key + data.selectOption
      );

      if (activeData) {
        activeData[newdata] = data[newdata];

        await set(userRef, userData);
      }
    } catch {}
  };

  return { deleteDb, changeDb, updateDb, setDb };
};
