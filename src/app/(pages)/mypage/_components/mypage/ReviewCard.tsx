"use client";
import React from "react";
import { Review } from "@/app/types/mypageTypes/Review";
import { useRouter } from "next/navigation";
import { deleteUserReview } from "@/utils/supabase/review";

interface ReviewCardProps {
  review: Review; // 개별 리뷰 객체
  onDelete: (articleId: number) => void; // 삭제 함수
  showActions?: boolean; // 수정/삭제 버튼 표시 여부
}

// ReviewCard 컴포넌트: 개별 리뷰 정보를 표시
const ReviewCard: React.FC<ReviewCardProps> = ({ review, onDelete, showActions }) => {
  const router = useRouter();

  // 평점 평균 점수 계산 함수
  const scoreAverage = (review: Review) => {
    // 각각의 점수를 배열에 넣고 합산
    const scores = [review.score_outside, review.score_inside, review.score_traffic, review.score_crime];
    const totalScore = scores.reduce((sum, score) => sum + score, 0);

    // 평균을 계산하고 5점 만점으로 변환 (10점 만점 기준이므로 2로 나누기)
    const averageScore = totalScore / scores.length / 2;

    // 소수점 1자리까지 반올림
    return averageScore.toFixed(1);
  };

  // 리뷰 수정 기능
  const handleEdit = () => {
    router.push(`/review/${review.article_id}/modify`); // 수정 페이지로 이동
  };

  // 리뷰 삭제 기능
  const handleDelete = async (article_id: number) => {
    const confirm = window.confirm("리뷰를 삭제하시겠습니까?");
    if (confirm) {
      await deleteUserReview(article_id);
      onDelete(article_id);
    }
  };

  // 리뷰 상세 페이지로 이동 기능
  const handleCardClick = () => {
    router.push(`/review/${review.article_id}`); // 상세 페이지로 이동
  };

  return (
    <div onClick={handleCardClick} className="cursor-pointer">
      <li className="p-4 border rounded-lg shadow flex flex-col hover:shadow-lg transition-shadow duration-200">
        <div className="flex items-center">
          {review.house_name ? (
            <h2 className="text-lg font-semibold mr-2">{review.house_name}</h2>
          ) : (
            <h2 className="text-lg font-semibold mr-2">{review.address || "주소 정보 없음"}</h2>
          )}
          <span className="text-lg mr-2">⭐️{scoreAverage(review)}</span>

          {/* showActions가 true일 때만 수정/삭제 버튼 렌더링 */}
          {showActions && (
            <div className="flex items-center ml-auto">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit();
                }}
                className="ml-2 text-blue-600"
              >
                수정
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(review.article_id);
                }}
                className="ml-2 text-red-600"
              >
                삭제
              </button>
            </div>
          )}
        </div>

        <hr className="my-2 border-gray-300" />
        <div className="flex">
          <div className="w-1/2 p-1">
            <span className="good-label">장점</span>
            <p className="text-gray-700 mt-2 text-[11px] line-clamp-2">{review.good}</p>
          </div>
          <div className="border-l border-gray-300 mx-2"></div>
          <div className="w-1/2 p-1">
            <span className="bad-label">단점</span>
            <p className="text-gray-700 mt-2 text-[11px] line-clamp-2">{review.bad}</p>
          </div>
        </div>
      </li>
    </div>
  );
};

export default ReviewCard;
