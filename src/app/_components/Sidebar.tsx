import React from "react";
import Button from "./Button";

interface SidebarProps {
  sortOrder: "latest" | "highest"; // 현재 정렬 상태
  setSortOrder: (order: "latest" | "highest") => void; // 정렬 상태 변경 함수
}

const Sidebar: React.FC<SidebarProps> = ({ setSortOrder }) => {
  return (
    <div className="w-1/4 p-4">
      <Button href="/review" variant="default" className="mb-5">
        리뷰 등록
      </Button>
      <Button onClick={() => setSortOrder("latest")} variant="default" className="mb-5">
        최신 리스트
      </Button>
      <Button onClick={() => setSortOrder("highest")} variant="default" className="mb-5">
        별점 높은순
      </Button>
      <Button href="/donation" variant="default" className="mb-5">
        후원하기
      </Button>
      {/* <Link
        href="/review"
        className="bg-gray-200 text-black rounded-full w-40 h-12 flex items-center justify-center mb-5 hover:bg-gray-400 hover:text-white transition-colors duration-200"
      >
        리뷰 등록
      </Link>
      <button
        className="bg-gray-200 text-black rounded-full w-40 h-12 flex items-center justify-center mb-5"
        onClick={() => setSortOrder("latest")}
      >
        최신 리스트
      </button>
      <button
        className="bg-gray-200 text-black rounded-full w-40 h-12 flex items-center justify-center mb-5"
        onClick={() => setSortOrder("highest")}
      >
        별점 높은순
      </button>
      <Link href="/donation" className="bg-gray-200 text-black rounded-full w-40 h-12 flex items-center justify-center">
        후원하기
      </Link> */}
    </div>
  );
};

export default Sidebar;
