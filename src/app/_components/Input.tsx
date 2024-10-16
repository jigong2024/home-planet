"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Input() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedSearch = search.trim();
    if (trimmedSearch === "") {
      alert("검색어를 입력해주세요!");
      return;
    }

    const noGapSearch = trimmedSearch.toLowerCase().replace(/\s+/g, "");

    router.push(`/map?search=${encodeURIComponent(noGapSearch)}`);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="flex justify-center w-96 gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="건물 이름이나 주소로 검색"
          className="search-input"
        />
        <button type="submit" className="w-10 bg-white rounded-full pl-1 border-2 hover:border-[#003365]">
          <Image
            src="https://img.icons8.com/material-outlined/24/search--v1.png"
            alt="search--v1"
            width="26"
            height="26"
          />
        </button>
      </form>
    </div>
  );
}
