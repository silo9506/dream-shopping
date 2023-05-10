import { AUTH, DB } from "myfirebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { createContext, useContext, useState, useEffect } from "react";
import { authContextValues, userCredentials } from "types/auth";
import firebase from "firebase/compat/app";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { get, onValue, ref, runTransaction } from "firebase/database";
import { useDb } from "hooks/useDb";

const AuthContext = createContext<authContextValues | undefined>(undefined);
export const useAuth = () => useContext(AuthContext) as authContextValues;

interface props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: props) => {
  const [isloding, setIsloding] = useState(true);
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [error, setError] = useState<null | string>(null);
  const [dbUser, setDbuser] = useState<{ [key: string]: any }>([]);
  const { setDb } = useDb();

  useEffect(() => {
    // setIsloding(true);
    const unsubscribe = onAuthStateChanged(AUTH, async (user: any) => {
      console.log(user);
      if (user) {
        const uid = user.uid;
        const userRef = ref(DB, `user/${uid}`);
        const seller = false;
        const { email, displayName } = user.providerData[0];
        await setDb({
          Route: `user/${uid}`,
          data: { email, displayName, seller },
        });

        const snapshot = await get(userRef);
        // val은 변환해주는 메소드
        const userData = await snapshot.val();
        setDbuser(userData);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          setDbuser(data);
        });
      }
      setCurrentUser(user as firebase.User);
      setIsloding(false);
    });

    return unsubscribe;
  }, []);

  const signup = async ({
    email,
    password,
    displayName,
    photoURL,
  }: userCredentials) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        AUTH,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName,
        photoURL,
      });

      return userCredential;
    } catch (error: any) {
      setError(error.message);
    }
  };

  const login = async ({ email, password }: userCredentials) => {
    try {
      return await signInWithEmailAndPassword(AUTH, email, password);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const logout = async () => {
    try {
      setDbuser([]);
      return await signOut(AUTH);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      return await signInWithPopup(AUTH, provider);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const value: authContextValues = {
    signup,
    login,
    logout,
    googleLogin,
    currentUser,
    error,
    isloding,
    dbUser,
    setDbuser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isloding && children}
    </AuthContext.Provider>
  );
};
