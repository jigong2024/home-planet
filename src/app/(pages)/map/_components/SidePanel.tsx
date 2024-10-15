"use client";

import { Article } from "@/app/types/mapTypes/ArticleType";
import SearchInput from "./SearchInput";
import { useRouter } from "next/navigation";

type SidePanelProps = {
  articles: Article[];
  isOpen: boolean;
  onClose: () => void;
  onViewAllClick: () => void;
  viewMode: string;
  handleSearch: (searchTerm: string) => void;
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
  const router = useRouter();

  if (!articles || !isOpen) return null;

  // 평점 평균 점수 계산 함수
  const scoreAverage = (article: Article) => {
    const score = [article.score_outside, article.score_inside, article.score_traffic, article.score_crime];
    const sum = score.reduce((a, b) => a + b, 0);
    return (sum / score.length / 2).toFixed(1);
  };

  // 상세페이지로 이동하는 함구
  const handleArticleClick = (articleId: number) => {
    router.push(`/review/${articleId}`);
  };

  return (
    <div className="absolute left-8 top-0 h-full w-1/3 bg-white shadow-lg p-4 overflow-y-auto z-10">
      <div className="flex justify-between items-center mx-1 my-3">
        <h2 className="text-[25px] font-bold text-[#003365]">등록된 후기 리스트</h2>

        <button onClick={onClose} className=" mr-1 text-gray-400 font-bold hover:text-[#003365]">
          X
        </button>
      </div>

      {/* Divider line */}
      <div className="border-b border-2 border-[#003365] my-4 w-full"></div>

      <div className="mb-4">
        {viewMode === "selected" && (
          <button onClick={onViewAllClick} className="mb-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            모든 결과 보기
          </button>
        )}
      </div>

      <SearchInput search={search} handleSearch={handleSearch} setSearch={setSearch} />

      <div>
        <div className="flex gap-1 mb-2 p-1">
          <p className="text-gray-400 font-bold mr-1">조회된 리스트</p>
          <p className="text-[#003365] font-bold">{articles.length}</p>
          <p className="text-gray-400 font-bold">건</p>
        </div>

        {articles && articles.length > 0 ? (
          articles.map((article, index) => (
            <div
              key={index}
              onClick={() => handleArticleClick(article.article_id)}
              className="bg-white mb-4 p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 hover:cursor-pointer"
            >
              <div className="flex gap-1">
                <span className="font-bold text-md mb-2 mr-2">{article.house_name || article.address}</span>
                <span>⭐</span>
                <span>{scoreAverage(article)}</span>
              </div>

              {/* Divider line */}
              <div className="border-b border mb-3 w-full"></div>

              <div className="flex gap-5">
                <div className="w-1/2">
                  <span className="p-1 px-3 rounded-md bg-[#3fcc71] text-white text-[11px]">장점</span>
                  <p className="py-2 text-[11px] line-clamp-4 overflow-hidden">{article.good}</p>
                </div>

                <div className="border-r"></div>

                <div className="w-1/2">
                  <span className="p-1 px-3 rounded-md bg-[#f7a501] text-white text-[11px]">단점</span>
                  <p className="py-2 text-[11px] line-clamp-4 overflow-hidden">{article.bad}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>찾으시는 정보가 없습니다...</p>
        )}
      </div>
    </div>
  );
};

export default SidePanel;
