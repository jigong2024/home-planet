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
        <button>로그인</button>
      </form>
      <span>
        <p>계정이 없으신가요?</p>
        <Link href={"/signup"}>회원가입</Link>
      </span>
    </>
  );
};

export default Loginpage;
