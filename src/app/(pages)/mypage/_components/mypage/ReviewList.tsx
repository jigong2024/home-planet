import React from "react";
import { Review } from "@/app/types/mypageTypes/Review";
import ReviewCard from "./ReviewCard";

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
      {reviews.map((review) => (
        <ReviewCard key={review.article_id} review={review} />
      ))}
    </ul>
  );
};

export default ReviewList;
