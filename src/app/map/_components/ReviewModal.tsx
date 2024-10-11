"use client";

const ReviewModal = ({ articles, onClose }) => {
  if (!articles) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2>후기 목록</h2>
          <button onClick={onClose} className="hover:text-gray-600">
            닫기
          </button>
        </div>
        {articles.map((article, index) => (
          <div key={index} className="mb-4 pb-4 border-b last:border-b-0">
            <h3>{article.house_name}</h3>
            <p>거주 유형: {article.house_type}</p>
            <p>건물 유형: {article.build_type}</p>
            <p>가격: {article.house_price.toLocaleString()}원</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewModal;
