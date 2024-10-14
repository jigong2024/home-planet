"use client";

type SideBarProps = {
  articles: Article[];
  setFilteredArticles: Dispatch<SetStateAction<Article[]>>;
  setIsSidePanelOpen: Dispatch<SetStateAction<boolean>>;
  isSidePanelOpen: boolean;
};

import { Article } from "@/app/types/mapTypes/ArticleType";
import { useState } from "react";

const SideBar = ({ articles, setFilteredArticles, setIsSidePanelOpen, isSidePanelOpen }: SideBarProps) => {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // 필터링 함수
  const filterArticles = (filter: string) => {
    setActiveFilter(filter);
    if (filter === "all") {
      setFilteredArticles(articles);
    } else if (filter === "원/투룸") {
      setFilteredArticles(
        articles.filter((article) => article.building_type === "원룸" || article.building_type === "투룸")
      );
    } else if (filter === "주택/빌라") {
      setFilteredArticles(
        articles.filter((article) => article.building_type === "주택" || article.building_type === "빌라")
      );
    } else {
      setFilteredArticles(articles.filter((article) => article.building_type === filter));
    }
  };

  // 사이드 패널 토글 함수 추가
  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  return (
    <div className="flex flex-col gap-3 w-1/12">
      <button
        className={`border rounded-md p-1 ${activeFilter === "all" ? "bg-blue-500 text-white" : ""}`}
        onClick={() => filterArticles("all")}
      >
        모든 후기
      </button>
      <button
        className={`border rounded-md p-1 ${activeFilter === "원/투룸" ? "bg-blue-500 text-white" : ""}`}
        onClick={() => filterArticles("원/투룸")}
      >
        원/투룸
      </button>
      <button
        className={`border rounded-md p-1 ${activeFilter === "아파트" ? "bg-blue-500 text-white" : ""}`}
        onClick={() => filterArticles("아파트")}
      >
        아파트
      </button>
      <button
        className={`border rounded-md p-1 ${activeFilter === "주택/빌라" ? "bg-blue-500 text-white" : ""}`}
        onClick={() => filterArticles("주택/빌라")}
      >
        주택/빌라
      </button>
      <button
        className={`border rounded-md p-1 ${activeFilter === "오피스텔" ? "bg-blue-500 text-white" : ""}`}
        onClick={() => filterArticles("오피스텔")}
      >
        오피스텔
      </button>
      {/* 토글버튼 */}
      <button onClick={toggleSidePanel} className="border rounded-md p-1">
        검색
      </button>
    </div>
  );
};

export default SideBar;
