"use client";

import browserClient from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignUppage = () => {
  const router = useRouter();
  const [info, setInfo] = useState<{ email: string; password: string }>({
    email: "",
    password: ""
  });

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>, keyName: string) => {
    const value = event.target.value;
    const newInfo = { ...info, [keyName]: value };
    setInfo(newInfo);
  };

  const handleAddInfo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signUpUser();
  };

  const signUpUser = async () => {
    try {
      const { error } = await browserClient.auth.signUp({
        email: info.email,
        password: info.password
      });

      if (error) {
        console.log("입력 정보를 다시 확인해주세요!");
        throw error;
      }

      // 회원가입 후 로그아웃 처리
      const { error: logoutError } = await browserClient.auth.signOut();

      if (logoutError) {
        console.error("Error logging out:", logoutError);
        return;
      }

      // 이동 확인
      const like = confirm("로그인 화면으로 이동하시겠습니까?");
      if (like) {
        router.push("/login"); // 로그인 페이지로 이동
      } else {
        router.push("/"); // 메인 페이지로 이동
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleAddInfo}>
        <input
          type="email"
          onChange={(event) => {
            handleChangeInput(event, "email");
          }}
          placeholder="Email"
          className="text-black"
        />
        <input
          type="password"
          onChange={(event) => {
            handleChangeInput(event, "password");
          }}
          placeholder="Password"
          className="text-black"
        />
        <button>회원가입</button>
      </form>
      <span>
        <p>이미 계정이 있으신가요?</p>
        <Link href={"/login"}>로그인</Link>
      </span>
    </>
  );
};

export default SignUppage;
