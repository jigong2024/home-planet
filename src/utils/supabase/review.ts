// utils/supabase/reviews.ts
import browserClient, { createClient } from "./client";
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
export const deleteUserReview = async (article_id: number) => {
  const confirm = window.confirm("리뷰를 삭제하시겠습니까?");
  if (confirm) {
    try {
      await browserClient.from("articles").delete().eq("article_id", article_id);
      alert("삭제되었습니다!");
    } catch (error) {
      console.log("delete error", error);
    }
  }
};

// 리뷰 수정 함수
export const updateUserReview = async (article_id: number, updatedReview: Partial<Review>) => {
  console.log("업데이트 요청:", article_id, updatedReview);

  const { error } = await supabase
    .from("articles")
    .update(updatedReview) // 업데이트할 내용을 전달
    .eq("article_id", article_id); // article_id가 일치하는 리뷰를 업데이트

  if (error) {
    console.error("리뷰 수정 실패:", error);
    throw error; // 오류 발생 시 예외를 던집니다.
  }
};
