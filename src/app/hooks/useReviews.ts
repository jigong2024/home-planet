import { useEffect, useState } from "react";
import { Review } from "../types/mypageTypes/Review";
import { deleteUserReview, getUserReviews, updateUserReview } from "@/utils/supabase/review";

const useReviews = (userId: string | null) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReviews = async () => {
      if (userId) {
        // userId가 null이 아닐 때만 실행
        setLoading(true); // 리뷰를 가져오기 전에 로딩 상태를 true로 설정
        const fetchedReviews = await getUserReviews(userId); // 사용자 ID로 리뷰를 가져오기
        setReviews(fetchedReviews);
        setLoading(false); // 리뷰 가져오기가 완료되면 로딩 상태를 false로 설정
      }
    };

    fetchReviews();
  }, [userId]); // userId가 변경될 때마다 이 useEffect가 실행

  // 삭제 함수
  const handleDelete = async (articleId: number) => {
    await deleteUserReview(articleId); // 리뷰 삭제
    setReviews(reviews.filter((review) => review.article_id !== articleId)); // 상태 업데이트
  };
  
  // 수정 함수
  const handleEdit = async (articleId: number, updatedReview: Partial<Review>) => {
    // Partial<Review>로 변경
    const newReview: Review = {
      ...reviews.find((review) => review.article_id === articleId), // 기존 리뷰 가져오기
      ...updatedReview // 업데이트된 리뷰로 덮어쓰기
    } as Review;

    await updateUserReview(articleId, newReview); // 리뷰 수정
    setReviews(reviews.map((review) => (review.article_id === articleId ? newReview : review))); // 상태 업데이트
  };
  return { reviews, loading, handleDelete, handleEdit };
};

export default useReviews;
