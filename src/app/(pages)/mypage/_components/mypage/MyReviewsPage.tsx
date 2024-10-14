import ReviewList from "./ReviewList";

// 마이페이지에서 내 리뷰를 보여주는 메인 컴포넌트
const MyReviewsPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">내가 작성한 후기</h1>
      <ReviewList />
    </div>
  );
};

export default MyReviewsPage;
