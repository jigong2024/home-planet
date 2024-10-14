import { Article } from "@/app/types/Article";
import { createClient } from "@/app/utils/supabase/server";
import React from "react";

export type Props = {
  params: {
    article_id: string;
  };
};

const DetailPage = async ({ params }: Props) => {
  const serverClient = createClient();
  const { data }: Article = await serverClient.from("articles").select("*").eq("article_id", `${params.article_id}`);
  const findData = data[0];
  const calculateScore =
    (findData.score_outside + findData.score_inside + findData.score_traffic + findData.score_crime) / 8;

  return (
    <div className="flex flex-col items-center text-center">
      <header>
        <h1 className="font-bold text-4xl mt-8">{findData.house_name ? findData.house_name : findData.address}</h1>
        <p className="text-s my-6 text-gray-400">총 평점 ★ {calculateScore.toFixed(1)}</p>
        <p className="font-bold my-6">{`거주 유형: ${findData.house_type} / 거주 년도: ${findData.house_year} / 건물 유형: ${findData.building_type} / 거주 층: ${findData.house_floor}`}</p>
      </header>
      <main className="grid grid-cols-2 justify-items-center">
        <div>
          <label className="good-label">장점</label>
          <p>{findData.good}</p>
          <label className="bad-label">단점</label>
          <p>{findData.bad}</p>
        </div>
        <section>
          <p>만족도를 평가해주세요. (최대 10점)</p>
          <div className="grid grid-cols-2">
            <div>
              <label>집 외부</label>
              {findData.score_outside}
            </div>
            <div>
              <label>교통</label>
              {findData.score_traffic}
            </div>
            <div>
              <label>집 내부</label>
              {findData.score_inside}
            </div>
            <div>
              <label>치안</label>
              {findData.score_crime}
            </div>
          </div>
        </section>
      </main>
      <button className="border p-2 px-14 my-8 bg-[#003366] text-white rounded-full">돌아가기</button>
    </div>
  );
};

export default DetailPage;
