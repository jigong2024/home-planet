<<<<<<< HEAD
"use client";
import ReviewList from "./ReviewList";
import useUserId from "@/app/hooks/useUserId";
import useReviews from "@/app/hooks/useReviews";

// 마이페이지에서 내 리뷰를 보여주는 메인 컴포넌트
const MyReviewsPage = () => {
  const userId = useUserId();
  const { reviews, loading, handleDelete, handleEdit } = useReviews(userId);

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
      {reviews.length > 0 ? (
        <ReviewList reviews={reviews} onDelete={handleDelete} onEdit={handleEdit} />
      ) : (
        <p className="text-gray-500">작성한 후기가 없습니다.</p>
      )}
=======
import ReviewList from "./ReviewList";

// 마이페이지에서 내 리뷰를 보여주는 메인 컴포넌트
const MyReviewsPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">내가 작성한 후기</h1>
      <ReviewList />
>>>>>>> dev
    </div>
  );
};

export default MyReviewsPage;
