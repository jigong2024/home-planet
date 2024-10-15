"use client";

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
      className="flex justify-between items-baseline mb-4"
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="건물 이름이나 주소로 검색"
        className="search-input"
      />
      <button
        type="submit"
        className="border-2 p-2 text-[13px] rounded-md hover:text-white hover:bg-[#003365] hover:border-[#003365] hover:shadow-md"
      >
        검색
      </button>
    </form>
  );
};

export default SearchInput;
