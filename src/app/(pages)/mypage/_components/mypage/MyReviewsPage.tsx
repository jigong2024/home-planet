"use client";

import { useEffect, useState } from "react";
import ReviewList from "./ReviewList";
import { Review } from "@/app/types/mypageTypes/Review";
import { getUserReviews } from "@/utils/supabase/review";
import browserClient from "@/utils/supabase/client";

// 마이페이지에서 내 리뷰를 보여주는 메인 컴포넌트
const MyReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string>("c1b966c4-0733-49be-9864-8092d2ab19f3");

  useEffect(() => {
    const fetchUserId = async () => {
      const {
        data: { user }
      } = await browserClient.auth.getUser(); // 현재 로그인한 사용자의 정보를 가져오기
      if (user) {
        setUserId(user.id); // userId를 state에 설정
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true); // 리뷰를 가져오기 전에 로딩 상태를 true로 설정
      const fetchedReviews = await getUserReviews(userId); // 사용자 ID로 리뷰를 가져오기
      setReviews(fetchedReviews);
      setLoading(false); // 리뷰 가져오기가 완료되면 로딩 상태를 false로 설정
    };

    fetchReviews();
  }, [userId]); // userId가 변경될 때마다 이 useEffect가 실행

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-xl font-bold mb-4">내가 작성한 후기</h1>
        <p className="text-gray-500">리뷰를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">내가 작성한 후기</h1>
      {reviews.length > 0 ? <ReviewList reviews={reviews} /> : <p className="text-gray-500">작성한 후기가 없습니다.</p>}
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default MyReviewsPage;
