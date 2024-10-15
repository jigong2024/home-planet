<<<<<<< HEAD
"use client"
import React, { useState } from "react";
import { Review } from "@/app/types/mypageTypes/Review";

interface ReviewCardProps {
  review: Review; // 개별 리뷰 객체
  onDelete: (articleId: number) => void; // 삭제 함수
  onEdit: (articleId: number, updatedReview: Partial<Review>) => void; // 수정 함수
}

// ReviewCard 컴포넌트: 개별 리뷰 정보를 표시
const ReviewCard: React.FC<ReviewCardProps> = ({ review, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedReview, setUpdatedReview] = useState<{ good: string; bad: string }>({
    good: review.good,
    bad: review.bad
  });

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
    onEdit(review.article_id, updatedReview);
    setIsEditing(false);
  };

  return (
    <li className="p-4 border rounded-lg shadow flex flex-col">
      <div className="flex justify-between items-center">
        {review.house_name ? (
          <h2 className="text-lg font-semibold">{review.house_name}</h2>
        ) : (
          <h2 className="text-lg font-semibold">{review.address || "주소 정보 없음"}</h2>
        )}
        <div className="flex items-center">
          <span className="text-xl font-bold">⭐️{scoreAverage(review)}</span>
          <button onClick={() => setIsEditing(true)} className="ml-2 text-blue-600">
            수정
          </button>
          <button onClick={() => onDelete(review.article_id)} className="ml-2 text-red-600">
            삭제
          </button>
        </div>
      </div>
      <hr className="my-2 border-gray-300" />
      {isEditing ? (
        <div className="flex">
          <div className="w-1/2 p-2">
            <span className="good-label">장점</span>
            <input
              type="text"
              value={updatedReview.good}
              onChange={(e) => setUpdatedReview({ ...updatedReview, good: e.target.value })}
              className="border rounded p-1 w-full mt-1" // 스타일 추가
            />
          </div>
          <div className="border-l border-gray-300 mx-4"></div> {/* 장점과 단점 사이의 경계 */}
          <div className="w-1/2 p-2">
            <span className="bad-label">단점</span>
            <input
              type="text"
              value={updatedReview.bad}
              onChange={(e) => setUpdatedReview({ ...updatedReview, bad: e.target.value })}
              className="border rounded p-1 w-full mt-1" // 스타일 추가
            />
          </div>
        </div>
      ) : (
        <div className="flex">
          <div className="w-1/2 p-2">
            <span className="good-label">장점</span>
            <p className="text-gray-700 mt-2">{review.good}</p> {/* 여백 추가 */}
          </div>
          <div className="border-l border-gray-300 mx-4"></div> {/* 장점과 단점 사이의 경계 */}
          <div className="w-1/2 p-2">
            <span className="bad-label">단점</span>
            <p className="text-gray-700 mt-2">{review.bad}</p> {/* 여백 추가 */}
          </div>
        </div>
      )}
      {isEditing && (
        <div className="flex justify-end mt-2">
          <button onClick={handleEdit} className="bg-blue-500 text-white rounded px-2 py-1">
            수정 완료
          </button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-300 text-black rounded px-2 py-1 ml-2">
            취소
          </button>
        </div>
      )}
    </li>
    // <li className="p-4 border rounded-lg shadow flex flex-col">
    //   <div className="flex justify-between items-center">
    //     {review.house_name ? (
    //       <h2 className="text-lg font-semibold">{review.house_name}</h2>
    //     ) : (
    //       <h2 className="text-lg font-semibold">{review.address || "주소 정보 없음"}</h2>
    //     )}
    //     <div className="flex items-center">
    //       <span className="text-xl font-bold">⭐️{averageScore.toFixed(2)}</span>
    //       <button onClick={() => setIsEditing(true)} className="ml-2 text-blue-600">
    //         수정
    //       </button>
    //       <button onClick={() => onDelete(review.article_id)} className="ml-2 text-red-600">
    //         삭제
    //       </button>
    //     </div>
    //   </div>
    //   <hr className="my-2 border-gray-300" />
    //   <div className="flex">
    //     <div className="w-1/2 p-2">
    //       <span className="good-label">장점</span>
    //       <p className="text-gray-700 mt-2">{review.good}</p> {/* 여백 추가 */}
    //     </div>
    //     <div className="border-l border-gray-300 mx-4"></div> {/* 장점과 단점 사이의 경계 */}
    //     <div className="w-1/2 p-2">
    //       <span className="bad-label">단점</span>
    //       <p className="text-gray-700 mt-2">{review.bad}</p> {/* 여백 추가 */}
    //     </div>
    //   </div>
    // </li>
  );
=======
import React from "react";

//  개별 리뷰를 카드 형식으로 표시하는 컴포넌트
const ReviewCard = () => {
  return <div>ReviewCard</div>;
>>>>>>> dev
};

export default ReviewCard;
