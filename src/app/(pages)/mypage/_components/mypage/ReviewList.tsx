import React from "react";
import { Review } from "@/app/types/mypageTypes/Review";
import ReviewCard from "./ReviewCard";

interface ReviewListProps {
  reviews: Review[]; // 리뷰 배열
  onDelete: (articleId: number) => void; // 삭제 함수
  onEdit: (articleId: number, updatedReview: Partial<Review>) => void; // 수정 함수
}
// ReviewList 컴포넌트: 리뷰 목록을 표시
const ReviewList: React.FC<ReviewListProps> = ({ reviews, onDelete, onEdit }) => {
  if (!reviews || reviews.length === 0) {
    return <p>리뷰가 없습니다.</p>;
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {reviews.map((review) => (
        <ReviewCard key={review.article_id} review={review} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </ul>
  );
};

export default ReviewList;
