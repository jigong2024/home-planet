// utils/supabase/reviews.ts
import { createClient } from "./client";
import { Review } from "@/app/types/mypageTypes/Review";

const supabase = createClient();

export const getAllReviews = async (): Promise<Review[]> => {
  // 모든 리뷰 데이터를 가져오기
  const { data, error } = await supabase.from("articles").select("*"); // reviews 테이블에서 모든 데이터 가져오기

  if (error) {
    console.error("Error fetching all reviews:", error);
    return [];
  }

  return data as Review[];
};

export const getUserReviews = async (userId: string): Promise<Review[]> => {
  // articles 테이블에서 writer가 userId인 후기 데이터를 가져오기
  const { data, error } = await supabase.from("articles").select("*").eq("writer", userId); // writer 필드가 userId와 일치하는 데이터만 가져옴
  console.log("userid: ", userId);
  if (error) {
    console.error("Error fetching user reviews:", error);
    return [];
  }

  return data as Review[];
};

// 리뷰 삭제 함수
export const deleteUserReview = async (articleId: number) => {
  const { error } = await supabase
    .from("reviews") // "reviews"는 Supabase에서 리뷰를 저장하는 테이블의 이름입니다.
    .delete()
    .eq("article_id", articleId); // article_id가 일치하는 리뷰를 삭제

  if (error) {
    console.error("리뷰 삭제 실패:", error);
    throw error; // 오류 발생 시 예외를 던집니다.
  }
};

// 리뷰 수정 함수
export const updateUserReview = async (article_id: number, updatedReview: Partial<Review>) => {
  console.log("업데이트 요청:", article_id, updatedReview);

  const { error } = await supabase
    .from("reviews") // "reviews"는 Supabase에서 리뷰를 저장하는 테이블의 이름입니다.
    .update(updatedReview) // 업데이트할 내용을 전달
    .eq("article_id", article_id); // article_id가 일치하는 리뷰를 업데이트

  if (error) {
    console.error("리뷰 수정 실패:", error);
    throw error; // 오류 발생 시 예외를 던집니다.
  }
};
