import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCTRnWxdPOQI0D3lko57d4EuBfR8w1TTSc",
  authDomain: "dream-shopping-548c4.firebaseapp.com",
  projectId: "dream-shopping-548c4",
  storageBucket: "dream-shopping-548c4.appspot.com",
  messagingSenderId: "687315412012",
  appId: "1:687315412012:web:0819afcd8adbf1d1741d89",
  databaseURL:
    "https://dream-shopping-548c4-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
export const AUTH = getAuth(app);
export const DB = getDatabase(app);

setPersistence(AUTH, browserSessionPersistence)
  .then(() => {})
  .catch((error) => {
    console.log("세션 지속성 설정 중 오류가 발생했습니다.", error);
  });
