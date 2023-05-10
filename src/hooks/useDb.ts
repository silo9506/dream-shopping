import { DB } from "myfirebase";
import { ref, runTransaction } from "firebase/database";
import { useAuth } from "modules/AuthContext";
import { useState } from "react";

interface setDbProps {
  Route: string;
  data?: any;
}

export const useDb = () => {
  const setDb = async ({ Route, data }: setDbProps) => {
    const userRef = ref(DB, Route);
    await runTransaction(userRef, (userData) => {
      if (Array.isArray(userData)) {
        return [...userData, ...data];
      }

      if (userData === null) {
        return data;
      }
      return;
    }).catch((error) => {
      alert(error);
    });
  };

  const updateDb = async ({ Route, data }: setDbProps) => {
    const userRef = ref(DB, Route);
    await runTransaction(userRef, (userData) => {
      if (userData === null) {
        return userData;
      }

      const newData = { ...userData, ...data };

      return newData;
    }).catch((error) => {
      alert(error);
    });
  };

  return { setDb, updateDb };
};
