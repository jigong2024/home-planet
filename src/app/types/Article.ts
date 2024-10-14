export type Article = {
  data: [
    {
      article_id: number;
      writer: string;
      house_name: string;
      house_type: string;
      house_year: string;
      house_price: string;
      building_type: string;
      house_floor: string;
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
      created_at: string;
    }
  ];
};
