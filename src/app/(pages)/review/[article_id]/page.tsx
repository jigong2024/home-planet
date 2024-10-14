"use client";
import { Article } from "@/app/types/reviewTypes/Article";
import { useCounterStore } from "@/providers/storeProvider";
import browserClient from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export type Props = {
  params: {
    article_id: string;
  };
};

const DetailPage = ({ params }: Props) => {
  const [review, setReview] = useState<Article>();
  const uid = useCounterStore((state) => state.uid);
  const router = useRouter();

  useEffect(() => {
    getReview();
  }, []);

  const getReview = async () => {
    const res = await browserClient.from("articles").select("*").eq("article_id", `${params.article_id}`);
    if (res.error !== null) {
      return <div>error : {res.error.message}</div>;
    }
    const findData: Article = res.data[0];
    setReview(findData);
  };

  const deleteReview = async () => {
    const confirm = window.confirm("리뷰를 삭제하시겠습니까?");
    if (confirm) {
      try {
        await browserClient.from("articles").delete().eq("article_id", `${params.article_id}`);
        alert("삭제되었습니다!");
        router.push("/");
      } catch (error) {
        console.log("delete error", error);
      }
    }
  };

  if (!review) return;

  const calculateScore = (review.score_outside + review.score_inside + review.score_traffic + review.score_crime) / 8;

  return (
    <div className="flex flex-col items-center text-center">
      <header>
        <h1 className="font-bold text-4xl mt-8">{review.house_name ? review.house_name : review.address}</h1>
        <p className="text-s my-6 text-gray-400">총 평점 ★ {calculateScore.toFixed(1)}</p>
        <p className="font-bold my-6">{`거주 유형: ${review.house_type} / 거주 년도: ${review.house_year} / 건물 유형: ${review.building_type} / 거주 층: ${review.house_floor}`}</p>
      </header>
      <Image src={review.img_url} alt="img_url" width={300} height={100} className="mb-10" />
      <main className="grid grid-cols-2 justify-items-center">
        <div>
          <label className="good-label">장점</label>
          <p>{review.good}</p>
          <label className="bad-label">단점</label>
          <p>{review.bad}</p>
        </div>
        <section>
          <p>만족도를 평가해주세요. (최대 10점)</p>
          <div className="grid grid-cols-2">
            <div>
              <label>집 외부</label>
              {review.score_outside}
            </div>
            <div>
              <label>교통</label>
              {review.score_traffic}
            </div>
            <div>
              <label>집 내부</label>
              {review.score_inside}
            </div>
            <div>
              <label>치안</label>
              {review.score_crime}
            </div>
          </div>
        </section>
      </main>
      {uid && uid === review.writer ? (
        <div>
          <Link href={`/review/${params.article_id}/modify`}>
            <button className="border p-2 px-8 mt-8 bg-[#aeaeae] text-white rounded-full">수정</button>
          </Link>
          <button className="border p-2 px-8 mt-8 bg-[#ff8f8f] text-white rounded-full" onClick={deleteReview}>
            삭제
          </button>
        </div>
      ) : null}
      <button className="border p-2 px-14 my-8 bg-[#003366] text-white rounded-full">홈으로</button>
    </div>
  );
};

export default DetailPage;
