import { useAuth } from "modules/AuthContext";
import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdCancel } from "react-icons/md";

interface props {
  toggleModal: (value: string | null) => void;
}

export default function AuthForm({ toggleModal }: props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [signupPassword, setSignupPassword] = useState("");
  const [iserror, setIserror] = useState<null | string>(null);
  const [displayName, setdisplayName] = useState("");

  const { signup, login, googleLogin, currentUser, error } = useAuth();

  useEffect(() => {
    if (currentUser) {
      return toggleModal(null);
    }
  }, [currentUser]);
  const onsubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIserror(error);
    if (isSignup) {
      if (password === signupPassword) {
        return signup({ email, password, displayName });
      } else {
        return alert("패스워드가 다릅니다.");
      }
    }
    login({ email, password });
  };

  const toggleSignup = () => {
    setIsSignup((prev) => !prev);
    setIserror(null);
  };
  return (
    <div className="flex flex-col z-20 justify-center fixed w-[50%] min-w-[250px] max-w-[450px] max-h-[450px] h-[50%] bg-[#f5f5f5] top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
      <MdCancel
        onClick={() => toggleModal(null)}
        className="fixed cursor-pointer sm:text-2xl top-1 right-1 "
      />
      <form
        onSubmit={onsubmit}
        className="flex flex-col items-center justify-center max-w-[40ch] w-full px-4 pb-4 mx-auto text-xs sm:text-sm"
      >
        <h1 className="mb-3 text-2xl font-extrabold uppercase select-none sm:text-4xl ">
          {isSignup ? "회원가입" : "로그인"}
        </h1>
        {typeof iserror === "string" && (
          <h1 className="mb-3 text-xs text-red-600">{iserror}</h1>
        )}

        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일을 입력해주세요"
          type="email"
          className="mb-2 outline-none duration-300 border-b-2 border-solid border-transparent focus:border-[#00ff7f] text-slate-900 p-2 w-full max-w-[40ch]"
        />
        <input
          required
          value={password}
          minLength={6}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해주세요"
          type="password"
          className="mb-2 outline-none duration-300 border-b-2 border-solid border-transparent focus:border-[#00ff7f] text-slate-900 p-2 w-full max-w-[40ch]"
        />

        {isSignup && (
          <>
            <input
              required
              value={signupPassword}
              minLength={6}
              onChange={(e) => setSignupPassword(e.target.value)}
              placeholder="비밀번호를 확인해주세요"
              type="password"
              className="mb-2 outline-none duration-300 border-b-2 border-solid border-transparent focus:border-[#00ff7f] text-slate-900 p-2 w-full max-w-[40ch]"
            />

            <input
              required
              value={displayName}
              onChange={(e) => setdisplayName(e.target.value)}
              placeholder="사용하실 이름을 입력해주세요"
              type="name"
              className="mb-2 outline-none duration-300 border-b-2 border-solid border-transparent focus:border-[#00ff7f] text-slate-900 p-2 w-full max-w-[40ch]"
            />
          </>
        )}

        <button
          type="submit"
          className="mb-1 duration-300 relative w-full max-w-[40ch] border bg-white border-white border-solid uppercase py-2 overflow-hidden
        after:absolute after:top-0 after:right-full after:bg-[#00ff7f] after:z-10 after:w-full after:h-full after:duration-300
        hover:after:translate-x-full hover:text-slate-900 "
        >
          <h2 className="relative z-20">{isSignup ? "회원가입" : "로그인"}</h2>
        </button>
        <span
          onClick={toggleSignup}
          className="mb-2 ml-auto text-xs underline duration-300 cursor-pointer hover:scale-105 text-[#333333]"
        >
          {isSignup ? "로그인" : "회원가입"}
        </span>
        <button
          onClick={googleLogin}
          type="button"
          className="w-full max-w-[40ch] border-solid border border-transparent flex items-center justify-center py-2 gap-1 text-white bg-[#0033A0]"
        >
          <FcGoogle size={20} />
          Sign in with Google
        </button>
      </form>
    </div>
  );
}
