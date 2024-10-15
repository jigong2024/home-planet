"use client";

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
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="건물 이름이나 주소로 검색"
          className="p-2 border rounded-md"
        />
        <button type="submit">검색</button>
      </form>
    </div>
  );
}
