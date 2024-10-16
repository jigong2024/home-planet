export interface Review {
  article_id: number;
  house_name: string;
  good: string;
  bad: string;
  score_outside: number;
  score_inside: number;
  score_traffic: number;
  score_crime: number;
  address: string;
  created_at: string; // 리뷰 작성 날짜
  rating: number; // 리뷰 별점
}
