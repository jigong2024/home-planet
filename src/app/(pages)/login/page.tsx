"use client";

import browserClient from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Loginpage = () => {
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
    signInUser();
  };

  const signInUser = async () => {
    try {
      const { error } = await browserClient.auth.signInWithPassword({
        email: info.email,
        password: info.password
      });

      if (error) {
        alert("이메일/패스워드를 다시 확인해주세요!");
        throw error;
      } else {
        window.location.href = window.origin;
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <main className="flex flex-col justify-center items-center h-[calc(100%-170px)]">
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
          <button className="text-white bg-[#FFA500] w-[450px] h-[50px] mx-auto rounded-full">로그인</button>
        </form>
        <span className="flex gap-2 justify-center mt-8">
          <p>계정이 없으신가요?</p>
          <Link href={"/signup"} className="font-bold">
            회원가입
          </Link>
        </span>
      </div>
    </main>
  );
};

export default Loginpage;
