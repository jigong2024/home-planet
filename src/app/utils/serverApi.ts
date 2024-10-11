import { supabase } from "../supabaseClient";

export const fetchUserReviews = async (uid: string) => {
  const { data, error } = await supabase
    .from("articles")
    .select("house_name, good, bad, score_outside, score_inside, score_traffic, score_crime")
    .eq("writer", uid);

  if (error) throw new Error("Failed to fetch reviews");
  return data;
};
