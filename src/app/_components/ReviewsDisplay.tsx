"use client";

import { useEffect, useState } from "react";
import ReviewCard from "../(pages)/mypage/_components/mypage/ReviewCard";
import { Review } from "@/app/types/mypageTypes/Review";
import { getUserReviews } from "@/utils/supabase/review";
import browserClient from "@/utils/supabase/client";

const ReviewsDisplay = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"latest" | "highest">("latest");

  useEffect(() => {
    const fetchUserId = async () => {
      const {
        data: { user }
      } = await browserClient.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      if (userId) {
        setLoading(true);
        const fetchedReviews = await getUserReviews(userId);
        setReviews(fetchedReviews);
        setLoading(false);
      }
    };
    fetchReviews();
  }, [userId]);

  // 리뷰 정렬 함수
  const sortedReviews = () => {
    return [...reviews].sort((a, b) => {
      if (sortOrder === "latest") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime(); // 최신순
      } else {
        return b.rating - a.rating; // 별점 높은순
      }
    });
  };

  const displayedReviews = sortedReviews(); // 정렬된 리뷰를 변수에 저장

//   if (loading) {
//     return <p>리뷰를 불러오는 중...</p>;
//   }

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
      <div className="flex mb-4">
        <button
          className={`mr-2 p-2 ${sortOrder === "latest" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          onClick={() => setSortOrder("latest")}
        >
          최신순
        </button>
        <button
          className={`p-2 ${sortOrder === "highest" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          onClick={() => setSortOrder("highest")}
        >
          별점 높은순
        </button>
      </div>
      {displayedReviews.length > 0 ? (
        displayedReviews.map((review) => (
          <ReviewCard key={review.article_id} review={review} onDelete={handleDelete} onEdit={handleEdit} />
        ))
      ) : (
        <p>작성한 후기가 없습니다.</p>
      )}
    </div>
  );
};

export default ReviewsDisplay;
