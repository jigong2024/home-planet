"use client";

type SideBarProps = {
  articles: Article[];
  setFilteredArticles: React.Dispatch<React.SetStateAction<Article[]>>;
  setIsSidePanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSidePanelOpen: boolean;
};

import { Article } from "@/app/types/mapTypes/ArticleType";
import Image from "next/image";
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
    <div className="flex flex-col gap-3 w-2/12 border">
      {/* 토글버튼 */}
      <button onClick={toggleSidePanel} className="sideManu-button">
        검색
      </button>

      <button
        className={`sideManu-button ${activeFilter === "all" ? "border-[#003365] text-[#003365]" : ""}`}
        onClick={() => filterArticles("all")}
      >
        <Image
          src="https://img.icons8.com/external-itim2101-lineal-itim2101/64/external-village-home-security-itim2101-lineal-itim2101.png"
          alt="external-village-home-security-itim2101-lineal-itim2101"
          width="35"
          height="35"
        />
        모든 후기
      </button>
      <button
        className={`sideManu-button ${activeFilter === "원/투룸" ? "border-[#003365] text-[#003365]" : ""}`}
        onClick={() => filterArticles("원/투룸")}
      >
        <Image src="https://img.icons8.com/ios/50/home--v1.png" alt="home--v1" width="35" height="35" />
        원/투룸
      </button>

      <button
        className={`sideManu-button ${activeFilter === "아파트" ? "border-[#003365] text-[#003365]" : ""}`}
        onClick={() => filterArticles("아파트")}
      >
        <Image src="https://img.icons8.com/ios/50/apartment.png" alt="apartment" width="35" height="35" />
        아파트
      </button>
      <button
        className={`sideManu-button ${activeFilter === "주택/빌라" ? "border-[#003365] text-[#003365]" : ""}`}
        onClick={() => filterArticles("주택/빌라")}
      >
        <Image src="https://img.icons8.com/wired/64/home.png" alt="home" width="35" height="35" />
        주택/빌라
      </button>
      <button
        className={`sideManu-button ${activeFilter === "오피스텔" ? "border-[#003365] text-[#003365]" : ""}`}
        onClick={() => filterArticles("오피스텔")}
      >
        <Image src="https://img.icons8.com/ios/50/building.png" alt="building" width="35" height="35" />
        오피스텔
      </button>
    </div>
  );
};

export default SideBar;
