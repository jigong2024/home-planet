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
}
