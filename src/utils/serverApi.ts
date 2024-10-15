import { supabase } from "@/app/supabaseClient";

export const fetchUserReviews = async (uid: string) => {
  const { data, error } = await supabase
    .from("articles")
    .select("house_name, good, bad, score_outside, score_inside, score_traffic, score_crime")
    .eq("writer", uid); // 로그인한 유저의 uid로 필터링

  if (error) throw new Error("Failed to fetch reviews");
  console.log("data", data);
  return data;
};
