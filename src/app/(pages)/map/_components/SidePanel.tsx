import React, { useState } from "react";

const SidePanel = ({ articles, isOpen, onClose }) => {
  //   검색어를 위한 상태
  const [search, setSearch] = useState("");

  if (!articles || !isOpen) return null;

  // 평점 평균 점수 계산 함수
  const scoreAverage = (article) => {
    const score = [article.score_outside, article.score_inside, article.score_traffic, article.score_crime];
    const sum = score.reduce((a, b) => a + b, 0);
    return (sum / score.length).toFixed(1);
  };

  return (
    <div className="absolute left-8 top-0 h-full w-1/3 bg-white shadow-lg p-4 overflow-y-auto z-10">
      <div className="flex justify-end mb-4">
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          X
        </button>
      </div>

      <div className="flex justify-between items-baseline">
        <input
          className="border mb-4 rounded-md p-1 flex-grow mr-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="검색어를 입력하세요."
        />
        <button className="border p-1 text-[13px] rounded-md">검색</button>
      </div>

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
