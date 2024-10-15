"use client";

import { Article } from "@/app/types/mapTypes/ArticleType";
import SearchInput from "./SearchInput";

type SidePanelProps = {
  articles: Article[];
  isOpen: boolean;
  onClose: () => void;
  onViewAllClick: () => void;
  viewMode: string;
  handleSearch: () => void;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const SidePanel = ({
  articles,
  isOpen,
  onClose,
  onViewAllClick,
  viewMode,
  handleSearch,
  search,
  setSearch
}: SidePanelProps) => {
  if (!articles || !isOpen) return null;

  // 평점 평균 점수 계산 함수
  const scoreAverage = (article: Article) => {
    const score = [article.score_outside, article.score_inside, article.score_traffic, article.score_crime];
    const sum = score.reduce((a, b) => a + b, 0);
    return (sum / score.length / 2).toFixed(1);
  };

  return (
    <div className="absolute left-8 top-0 h-full w-1/3 bg-white shadow-lg p-4 overflow-y-auto z-10">
      <div className="flex justify-between mb-4">
        {viewMode === "selected" && (
          <button onClick={onViewAllClick} className="mb-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            모든 결과 보기
          </button>
        )}
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          X
        </button>
      </div>

      <SearchInput search={search} handleSearch={handleSearch} setSearch={setSearch} />

      <div className="mb-4">
        <h2 className="text-xl font-bold">후기 목록</h2>
      </div>
      <div>
        {articles && articles.length > 0 ? (
          articles.map((article, index) => (
            <div
              key={index}
              className="mb-4 p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex gap-2">
                <h3 className="font-semibold text-lg mb-2">{article.house_name || article.address}</h3>
                <h3>{scoreAverage(article)}</h3>
              </div>
              <div className="flex gap-5">
                <div>
                  <p>장점</p>
                  <p>{article.good}</p>
                </div>
                <div>
                  <p>단점</p>
                  <p>{article.bad}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>원하는 정보를 검색해 주세요...</p>
        )}
      </div>
    </div>
  );
};

export default SidePanel;
