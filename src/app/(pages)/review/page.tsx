"use client";

import { useEffect, useRef, useState } from "react";
import ReviewMap from "./_components/ReviewMap";
import { Address } from "../../types/reviewTypes/Address";
import browserClient from "@/utils/supabase/client";
import { Article } from "@/app/types/reviewTypes/Article";
import { useRouter } from "next/navigation";
import { useCounterStore } from "@/providers/storeProvider";

const ReviewPage = () => {
  const [houseType, setHouseType] = useState("");
  const [houseYear, setHouseYear] = useState("");
  const [buildingType, setBuildingType] = useState("");
  const [houseFloor, setHouseFloor] = useState("");
  const [housePrice, setHousePrice] = useState("");
  const [scoreOutside, setScoreOutside] = useState("");
  const [scoreInside, setScoreInside] = useState("");
  const [scoreTraffic, setScoreTraffic] = useState("");
  const [scoreCrime, setScoreCrime] = useState("");
  const [good, setGood] = useState("");
  const [bad, setBad] = useState("");
  const [address, setAddress] = useState<Address>();
  const [imgUrl, setImgUrl] = useState("");
  const [previewUrls, setPreviewUrls] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const houseTypeData = ["매매", "전세", "월세"];
  const buildingTypeData = ["아파트", "원룸", "투룸", "쓰리룸", "주택", "빌라", "오피스텔"];

  const router = useRouter();
  const uid = useCounterStore((state) => state.uid);

  // 주소 정보 가져오기
  const getAddressData = (data: Address) => {
    setAddress(data);
  };

  useEffect(() => {
    getDefaultImg();
  }, []);

  // 거주/건물 유형 선택
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    if (houseTypeData.includes(type)) setHouseType(type);
    if (buildingTypeData.includes(type)) setBuildingType(type);
  };

  // 사진등록 기본이미지 가져오기
  const getDefaultImg = () => {
    const { data } = browserClient.storage.from("home").getPublicUrl("default-img.png");
    setPreviewUrls(data.publicUrl);
  };

  const handleImgChange = (e: React.ChangeEvent) => {
    const target = (e.target as HTMLInputElement).files as FileList;
    handleFilePreviewChange(target);
  };

  // 이미지 프리뷰
  const handleFilePreviewChange = async (files: FileList) => {
    const [file] = files;
    if (!file) return;
    // 이미지 미리보기 URL
    const previewUrl = URL.createObjectURL(file);
    setPreviewUrls(previewUrl);
    // 스토리지 업로드
    const fileName = `${new Date().getTime()}`;
    const { data, error } = await browserClient.storage.from("home").upload(fileName, file);
    if (error) return;
    setImgUrl(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/home/${data.path}`);
  };

  // 리뷰 생성
  const createReview = async () => {
    if (!address) return alert("주소를 입력해주세요!");
    if (!houseType) return alert("거주 유형을 선택해주세요!");
    if (!houseYear) return alert("거주 년도를 입력해주세요!");
    if (!buildingType) return alert("건물 유형을 선택해주세요!");
    if (!houseFloor) return alert("거주 층을 입력해주세요!");
    if (!housePrice) return alert("계약 금액을 입력해주세요!");
    if (!imgUrl) return alert("사진을 등록해주세요!");
    if (!scoreOutside || !scoreInside || !scoreInside || !scoreCrime) return alert("4가지 항목을 전부 평가해주세요!");
    if (!good) return alert("장점을 작성해주세요!");
    if (!bad) return alert("단점을 작성해주세요!");
    await browserClient.from("articles").insert({
      writer: uid,
      house_name: address.road_address ? address.road_address.building_name : address.address_name,
      house_type: houseType,
      house_year: houseYear,
      house_price: housePrice,
      building_type: buildingType,
      house_floor: houseFloor,
      score_outside: scoreOutside,
      score_inside: scoreInside,
      score_traffic: scoreTraffic,
      score_crime: scoreCrime,
      good,
      bad,
      img_url: imgUrl,
      address: address.address_name,
      lat: address.y,
      lng: address.x
    });
    alert("리뷰가 등록되었습니다!");

    // 리뷰 등록 후 상세페이지로 이동
    const res = await browserClient.from("articles").select("*").eq("writer", uid);
    if (res.error !== null) {
      return <div>error : {res.error.message}</div>;
    }
    const findReview: Article = res.data[res.data.length - 1];
    router.replace(`/review/${findReview.article_id}`);
  };

  return (
    <div className="flex flex-col items-center text-center">
      <header>
        <h1 className="font-bold text-4xl mt-8">리뷰 등록하기</h1>
        <p className="text-xs my-6 text-gray-400">솔직해도 괜찮아 어차피 익명이니까</p>
      </header>
      <main>
        <ReviewMap getAddressData={getAddressData} />
        <div className="grid grid-cols-2 gap-2 justify-items-center">
          <div>
            <div className="flex flex-col">
              <label htmlFor="house-type" className="review-label">
                거주 유형
              </label>
              <select onChange={handleSelect} id="house-type" defaultValue="" className="text-input">
                <option value="" disabled>
                  거주 유형을 선택해주세요.
                </option>
                {houseTypeData.map((type, idx) => {
                  return (
                    <option key={idx} value={type}>
                      {type}
                    </option>
                  );
                })}
              </select>
            </div>
            <p className="review-label">거주 년도</p>
            <input
              className="text-input"
              type="text"
              value={houseYear}
              onChange={(e) => setHouseYear(e.target.value)}
              placeholder="거주 년도를 입력해주세요."
            />
            <div className="flex flex-col">
              <label htmlFor="house-type" className="review-label">
                건물 유형
              </label>
              <select onChange={handleSelect} id="house-type" defaultValue="" className="text-input">
                <option value="" disabled>
                  건물 유형을 선택해주세요.
                </option>
                {buildingTypeData.map((type, idx) => {
                  return (
                    <option key={idx} value={type}>
                      {type}
                    </option>
                  );
                })}
              </select>
            </div>
            <p className="review-label">거주 층</p>
            <input
              className="text-input"
              type="text"
              value={houseFloor}
              onChange={(e) => setHouseFloor(e.target.value)}
              placeholder="거주 층을 입력해주세요."
            />
            <p className="review-label">계약 금액</p>
            <input
              className="text-input"
              type="text"
              value={housePrice}
              onChange={(e) => setHousePrice(e.target.value)}
              placeholder="계약 금액을 입력해주세요."
            />
          </div>
          <div className="flex flex-col items-center">
            <p className="review-label text-center">사진 등록</p>
            <input onChange={handleImgChange} type="file" ref={fileInputRef} hidden />
            <img
              src={previewUrls}
              alt="homeImg"
              onClick={() => fileInputRef.current?.click()}
              className="w-[370px] h-auto"
            />
            <p className="review-label text-center">
              만족도를 평가해주세요 <span className="text-[#666666]">(최대 10점)</span>
            </p>
            <div className="grid grid-cols-2 gap-y-3.5">
              <div className="score-input bg-[#F1F1F1]">
                <p className="score-label">집 외부</p>
                <input
                  className="score-number bg-[#F1F1F1]"
                  type="text"
                  value={scoreOutside}
                  onChange={(e) => setScoreOutside(e.target.value)}
                />
              </div>
              <div className="score-input bg-[#E2E1E1]">
                <p className="score-label">집 내부</p>
                <input
                  className="score-number bg-[#E2E1E1]"
                  type="text"
                  value={scoreInside}
                  onChange={(e) => setScoreInside(e.target.value)}
                />
              </div>
              <div className="score-input bg-[#F4F4F4]">
                <p className="score-label">교통</p>
                <input
                  className="score-number bg-[#F4F4F4]"
                  type="text"
                  value={scoreTraffic}
                  onChange={(e) => setScoreTraffic(e.target.value)}
                />
              </div>
              <div className="score-input bg-[#F9F9F9]">
                <p className="score-label">치안</p>
                <input
                  className="score-number bg-[#F9F9F9]"
                  type="text"
                  value={scoreCrime}
                  onChange={(e) => setScoreCrime(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="flex flex-col items-center">
            <p className="good-label w-[100px] mt-7 mb-3">장점</p>
            <textarea className="comment-input py-4" value={good} onChange={(e) => setGood(e.target.value)} />
          </div>
          <div className="flex flex-col items-center">
            <p className="bad-label w-[100px] mt-7 mb-3">단점</p>
            <textarea className="comment-input py-4" value={bad} onChange={(e) => setBad(e.target.value)} />
          </div>
        </div>
        <button className="review-confirm-btn" onClick={createReview}>
          등록하기
        </button>
      </main>
    </div>
  );
};

export default ReviewPage;
