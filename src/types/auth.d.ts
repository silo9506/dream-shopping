export interface userCredentials {
  email: string;
  password: string;
  displayName?: string;
  photoURL?: string;
}

export interface authContextValues {
  //   currentUser: firebase.User | null;
  userCart: any[];
  login: ({
    email,
    password,
  }: userCredentials) => Promise<UserCredential | undefined>;
  signup: ({
    email,
    password,
  }: userCredentials) => Promise<UserCredential | undefined>;
  logout: () => Promise<void>;
  googleLogin: () => Promise<UserCredential | undefined>;
  currentUser: any;
  error: string | null;
  isloding: boolean;
  dbUser: { [key: string]: any };
  setDbuser: React.Dispatch<
    React.SetStateAction<{
      [key: string]: any;
    }>
  >;
}
