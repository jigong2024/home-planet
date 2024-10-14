// utils/supabase/reviews.ts
import { createClient } from "./client";
import { Review } from "@/app/types/mypageTypes/Review";

export const getUserReviews = async (userId: string): Promise<Review[]> => {
  const supabase = createClient();

  // articles 테이블에서 writer가 userId인 후기 데이터를 가져오기
  const { data, error } = await supabase.from("articles").select("*").eq("writer", userId); // writer 필드가 userId와 일치하는 데이터만 가져옴
    console.log("userid: ", userId);
  if (error) {
    console.error("Error fetching user reviews:", error);
    return [];
  }

  return data as Review[];
};
