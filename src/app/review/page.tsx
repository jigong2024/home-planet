"use client";

import { useEffect, useRef, useState } from "react";
import ReviewMap from "../_components/review/ReviewMap";
import browserClient from "../utils/supabase/client";
import Dropdown from "../_components/review/Dropdown";
import { Address } from "../types/Address";

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
  const houseTypeData = {
    title: ["거주 유형을 선택해주세요."],
    data: ["매매", "전세", "월세"]
  };
  const buildingTypeData = {
    title: ["건물 유형을 선택해주세요."],
    data: ["아파트", "원룸", "투룸", "쓰리룸", "주택", "빌라", "오피스텔"]
  };

  // 거주 유형, 건물 유형 값 가져오기
  const getHouseType = (type: string) => {
    if (houseTypeData.data.includes(type)) setHouseType(type);
    if (buildingTypeData.data.includes(type)) setBuildingType(type);
  };

  // 주소 정보 가져오기
  const getAddressData = (data: Address) => {
    setAddress(data);
  };

  useEffect(() => {
    getDefaultImg();
  }, []);

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
    if (!address) return;
    await browserClient.from("articles").insert({
      writer: "c1b966c4-0733-49be-9864-8092d2ab19f3",
      house_name: address.road_address.building_name,
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
            <p className="review-label">거주 유형</p>
            <Dropdown props={houseTypeData} getHouseType={getHouseType} />
            <p className="review-label">거주 년도</p>
            <input
              className="text-input"
              type="text"
              value={houseYear}
              onChange={(e) => setHouseYear(e.target.value)}
              placeholder="거주 년도를 입력해주세요."
            />
            <p className="review-label">건물 유형</p>
            <Dropdown props={buildingTypeData} getHouseType={getHouseType} />
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
          <div>
            <p>사진 등록</p>
            <input onChange={handleImgChange} type="file" ref={fileInputRef} hidden />
            <img
              src={previewUrls}
              alt="homeImg"
              onClick={() => fileInputRef.current?.click()}
              className="w-60 h-auto"
            />
            <p>만족도를 평가해주세요 (최대 10점)</p>
            <div className="grid grid-cols-2 justify-items-center">
              <input
                className="border w-24"
                placeholder="집 외부"
                type="text"
                value={scoreOutside}
                onChange={(e) => setScoreOutside(e.target.value)}
              />
              <input
                className="border w-24"
                placeholder="집 내부"
                type="text"
                value={scoreInside}
                onChange={(e) => setScoreInside(e.target.value)}
              />
              <input
                className="border w-24"
                placeholder="교통"
                type="text"
                value={scoreTraffic}
                onChange={(e) => setScoreTraffic(e.target.value)}
              />
              <input
                className="border w-24"
                placeholder="치안"
                type="text"
                value={scoreCrime}
                onChange={(e) => setScoreCrime(e.target.value)}
              />
            </div>
            <p>장점</p>
            <input className="border" type="text" value={good} onChange={(e) => setGood(e.target.value)} />
            <p>단점</p>
            <input className="border" type="text" value={bad} onChange={(e) => setBad(e.target.value)} />
          </div>
        </div>
        <button className="border p-2 px-14 my-8 bg-[#003366] text-white rounded-full" onClick={createReview}>
          등록하기
        </button>
      </main>
    </div>
  );
};

export default ReviewPage;
