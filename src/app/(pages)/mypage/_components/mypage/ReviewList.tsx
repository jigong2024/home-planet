"use client";

// import { useUserReviews } from "@/hooks/useUserReviews";
import { useUserStore } from "../../../../../store/userStore";

const MyReviewsPage = () => {
  const { uid } = useUserStore(); // Zustand로부터 uid 가져오기
  // uid가 존재하는 경우에만 쿼리 실행
  // const { data: reviews, isLoading, error } = useUserReviews(uid || "");

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Failed to load reviews</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">내가 작성한 후기</h1>
      {/* {reviews && reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.house_name} className="mb-4 p-4 border rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">{review.house_name}</h2>
            <p>
              <strong>장점:</strong> {review.good}
            </p>
            <p>
              <strong>단점:</strong> {review.bad}
            </p>
            <div className="flex space-x-4 mt-2">
              <p>
                <strong>외부 점수:</strong> {review.score_outside}
              </p>
              <p>
                <strong>내부 점수:</strong> {review.score_inside}
              </p>
              <p>
                <strong>교통 점수:</strong> {review.score_traffic}
              </p>
              <p>
                <strong>치안 점수:</strong> {review.score_crime}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>작성한 후기가 없습니다.</p>
      )} */}
    </div>
  );
};

export default MyReviewsPage;
