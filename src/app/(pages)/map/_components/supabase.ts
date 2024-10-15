import { Article } from "@/app/types/mapTypes/ArticleType";
import browserClient from "@/utils/supabase/client";

export async function fetchArticles(): Promise<Article[]> {
  const { data, error } = await browserClient.from("articles").select("*");

  if (error) {
    console.error("Supabase에서 Articles 가져오기 오류:", error.message);
    return [];
  }

  return data || [];
}
