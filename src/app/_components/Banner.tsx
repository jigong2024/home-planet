import React from "react";
import Input from "./Input";

const Banner: React.FC = () => {
  return (
    <div className="bg-gray-100 p-8 w-full  min-h-[300px] h-auto flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">
        지금껏 이런 플랫폼은 없었다.
        <br />
        솔직한 자취 후기를 경험하세요!
      </h1>
      <Input />
    </div>
  );
};

export default Banner;
