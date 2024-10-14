export interface Article {
  article_id: number;
  writer: string;
  house_name: string;
  house_type: string;
  house_year: number;
  house_price: number;
  building_type: string;
  house_floor: number;
  score_outside: number;
  score_inside: number;
  score_traffic: number;
  score_crime: number;
  good: string;
  bad: string;
  img_url: string;
  address: string;
  lat: number;
  lng: number;
}

export interface GroupedData {
  [key: string]: Article[];
}
