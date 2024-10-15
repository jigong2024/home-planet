"use client";

import browserClient from "@/utils/supabase/client";
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
    <main className="mt-20 mb-20">
      <form onSubmit={handleAddInfo}
      className="flex flex-col gap-4">
        <input
          type="email"
          onChange={(event) => {
            handleChangeInput(event, "email");
          }}
          placeholder="Email"
          className="text-black w-[450px] h-[30px] mx-auto"
        />
        <input
          type="password"
          onChange={(event) => {
            handleChangeInput(event, "password");
          }}
          placeholder="Password"
          className="text-black w-[450px] h-[30px] mx-auto"
        />
        <button className="text-black w-[450px] h-[30px] mx-auto">로그인</button>
      </form>
      <span className="flex gap-2 justify-center">
        <p>계정이 없으신가요?</p>
        <Link href={"/signup"} className="font-bold">회원가입</Link>
      </span>
    </main>
  );
};

export default Loginpage;
