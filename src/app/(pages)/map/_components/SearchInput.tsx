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
        className="flex-grow mr-2 p-2 border rounded-md"
      />
      <button type="submit" className="border p-1 text-[13px] rounded-md">
        검색
      </button>
    </form>
  );
};

export default SearchInput;
