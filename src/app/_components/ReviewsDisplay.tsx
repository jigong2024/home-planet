"use client";

import { useEffect, useState } from "react";
import ReviewCard from "../(pages)/mypage/_components/mypage/ReviewCard";
import { Review } from "@/app/types/mypageTypes/Review";
import { getAllReviews } from "@/utils/supabase/review";

interface ReviewsDisplayProps {
  sortOrder: "latest" | "highest"; // 정렬 상태를 prop으로 받음
}

const ReviewsDisplay: React.FC<ReviewsDisplayProps> = ({ sortOrder }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      const fetchedReviews = await getAllReviews(); // 모든 리뷰 가져오기
      setReviews(fetchedReviews);
      setLoading(false);
    };
    fetchReviews();
  }, []);

  // 평점 평균 점수 계산 함수
  const scoreAverage = (review: Review) => {
    const scores = [review.score_outside, review.score_inside, review.score_traffic, review.score_crime];
    const totalScore = scores.reduce((sum, score) => sum + score, 0);
    const averageScore = totalScore / scores.length / 2; // 5점 만점으로 변환
    return averageScore;
  };

  // 리뷰 정렬 함수
  const sortedReviews = () => {
    return [...reviews].sort((a, b) => {
      if (sortOrder === "latest") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime(); // 최신순
      } else {
        return scoreAverage(b) - scoreAverage(a); // 별점 높은순
      }
    });
  };

  const displayedReviews = sortedReviews(); // 정렬된 리뷰를 변수에 저장

  if (loading) {
    return <p>리뷰를 불러오는 중...</p>;
  }

  const handleDelete = (articleId: number) => {
    // 리뷰 삭제 로직 구현
    console.log(`Delete review with id: ${articleId}`);
    // 삭제 후 리뷰 목록을 다시 불러오도록 할 수 있습니다.
  };

  const handleEdit = (articleId: number, updatedReview: Partial<Review>) => {
    // 리뷰 수정 로직 구현
    console.log(`Edit review with id: ${articleId}`, updatedReview);
    // 여기서 실제 업데이트 로직을 구현할 수 있습니다.
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">리뷰 목록</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {displayedReviews.length > 0 ? (
          displayedReviews.map((review) => (
            <ReviewCard key={review.article_id} review={review} onDelete={handleDelete} onEdit={handleEdit} />
          ))
        ) : (
          <p>작성한 후기가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewsDisplay;
