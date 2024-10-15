"use client";

import browserClient from "@/utils/supabase/client";
import Image from "next/image";
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
    <main className="mt-20 mb-20 flex flex-col justify-center items-center h-[75vh]">
      <div>
        <Image
          src="/images/house-planet-logo.png"
          alt="집플래닛 로고"
          width={70}
          height={70}
          className="mx-auto mb-5"
        />
        <form onSubmit={handleAddInfo} className="flex flex-col gap-8">
          <input
            type="email"
            onChange={(event) => {
              handleChangeInput(event, "email");
            }}
            placeholder="Email"
            className="text-black w-[450px] h-[50px] mx-auto border border-[#A1A1AA] rounded-full pl-5"
          />
          <input
            type="password"
            onChange={(event) => {
              handleChangeInput(event, "password");
            }}
            placeholder="Password"
            className="text-black w-[450px] h-[50px] mx-auto border border-[#A1A1AA] rounded-full pl-5"
          />
          <button className="text-white bg-[#FFA500] w-[450px] h-[50px] mx-auto rounded-full">회원가입</button>
        </form>
        <span className="flex gap-2 justify-center mt-8">
          <p>이미 계정이 있으신가요?</p>
          <Link href={"/login"} className="font-bold">
            로그인
          </Link>
        </span>
      </div>
    </main>
  );
};

export default SignUppage;
