import React from "react";
import { Review } from "@/app/types/mypageTypes/Review";

interface ReviewCardProps {
  review: Review; // 개별 리뷰 객체
}

// ReviewCard 컴포넌트: 개별 리뷰 정보를 표시
const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  // 4개의 스코어의 평균 값 계산
  const averageScore = (review.score_outside + review.score_inside + review.score_traffic + review.score_crime) / 4;

  return (
    <li key={review.article_id} className="p-4 border rounded-lg shadow">
      {review.house_name ? (
        <h2 className="text-lg font-semibold">{review.house_name}</h2>
      ) : (
        <h2 className="text-lg font-semibold">{review.address || "주소 정보 없음"}</h2>
      )}
      <p className="text-gray-600">장점: {review.good}</p>
      <p className="text-gray-600">단점: {review.bad}</p>
      <div className="flex justify-between text-sm text-gray-500">
        <span>⭐️{averageScore.toFixed(2)}</span>
      </div>
    </li>
  );
};

export default ReviewCard;
