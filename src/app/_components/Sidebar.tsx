import React from "react";

interface SidebarProps {
  sortOrder: "latest" | "highest"; // 현재 정렬 상태
  setSortOrder: (order: "latest" | "highest") => void; // 정렬 상태 변경 함수
}
const Sidebar: React.FC<SidebarProps> = ({ setSortOrder }) => {
  return (
    <div className="w-1/4 bg-gray-200 p-4">
      <button className="block w-full text-left py-2 px-4 mb-2 rounded">후기 등록</button>
      <button className="block w-full text-left py-2 px-4 mb-2 rounded" onClick={() => setSortOrder("latest")}>
        최신 리스트
      </button>
      <button className="block w-full text-left py-2 px-4 mb-2 rounded" onClick={() => setSortOrder("highest")}>
        별점 높은순
      </button>
      <button className="block w-full text-left py-2 px-4 mb-2 rounded">후원하기</button>
    </div>
  );
};

export default Sidebar;
