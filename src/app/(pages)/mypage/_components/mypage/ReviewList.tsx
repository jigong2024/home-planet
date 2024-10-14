import React from "react";
import { Review } from "@/app/types/mypageTypes/Review";

interface ReviewListProps {
  reviews: Review[]; // 리뷰 배열
}
// ReviewList 컴포넌트: 리뷰 목록을 표시
const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <p>리뷰가 없습니다.</p>;
  }

  return (
    <ul className="space-y-4">
      {reviews.map((review) => {
        // 4개의 스코어의 평균 값 계산
        const averageScore =
          (review.score_outside + review.score_inside + review.score_traffic + review.score_crime) / 4;

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
      })}
    </ul>
  );
};

export default ReviewList;
