"use client"

import browserClient from "@/utils/supabase/client";
import Link from "next/link";
import React from "react";

const Loginpage = () => {
  const check = async() => {
    const data = await browserClient.auth.getSession();
    return data.data;
  }

  console.log(check());

  return (
    <>
      <form action="">
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>로그인</button>
      </form>
      <span>
        <p>계정이 없으신가요?</p>
        <Link href={"/signup"}>회원가입</Link>
      </span>
    </>
  )
};

export default Loginpage;
