import React, { useState } from "react";
import { Review } from "@/app/types/mypageTypes/Review";
import ReviewCard from "./ReviewCard";

interface ReviewListProps {
  reviews: Review[]; // 리뷰 배열
  onDelete: (articleId: number) => void; // 삭제 함수
  onEdit: (articleId: number, updatedReview: Partial<Review>) => void; // 수정 함수
}
// ReviewList 컴포넌트: 리뷰 목록을 표시
const ReviewList: React.FC<ReviewListProps> = ({ reviews: initialReviews }) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews); // 리뷰 목록 상태 관리

  // 삭제 함수: 특정 리뷰 삭제 후, 상태 업데이트
  const handleDelete = (articleId: number) => {
    // 삭제된 리뷰를 제외한 새로운 리스트로 상태 업데이트
    const updatedReviews = reviews.filter((review) => review.article_id !== articleId);
    setReviews(updatedReviews); // 삭제된 후의 리뷰 목록을 반영
  };

  if (!reviews || reviews.length === 0) {
    return <p>리뷰가 없습니다.</p>;
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {reviews.map((review) => (
        <ReviewCard key={review.article_id} review={review} showActions={true} onDelete={handleDelete} />
      ))}
    </ul>
  );
};

export default ReviewList;
