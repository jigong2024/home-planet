"use client";

import Image from "next/image";

type SearchInputProps = {
  search: string;
  handleSearch: (searchTerm: string) => void;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const SearchInput: React.FC<SearchInputProps> = ({ search, setSearch, handleSearch }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch(search);
      }}
      className="flex justify-between my-5"
    >
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
  );
};

export default SearchInput;
