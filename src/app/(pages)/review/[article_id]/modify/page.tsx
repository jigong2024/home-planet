"use client";

import { Address } from "@/app/types/reviewTypes/Address";
import browserClient from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Article } from "@/app/types/reviewTypes/Article";
import ModifyMap from "../../_components/ModifyMap";
import { Props } from "../page";

export type AddressInfo = {
  houseName: string;
  address: string;
  lat: number;
  lng: number;
};

const ModifyReview = ({ params }: Props) => {
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
  const [addressInfo, setAddressInfo] = useState<AddressInfo>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const houseTypeData = ["매매", "전세", "월세"];
  const buildingTypeData = ["아파트", "원룸", "투룸", "쓰리룸", "주택", "빌라", "오피스텔"];
  const router = useRouter();

  // 거주/건물 유형 선택
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    if (houseTypeData.includes(type)) setHouseType(type);
    if (buildingTypeData.includes(type)) setBuildingType(type);
  };

  // 주소 정보 가져오기
  const getAddressData = (data: Address) => {
    setAddress(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 이전 작성한 리뷰 데이터 가져온 후 저장
  const fetchData = async () => {
    const res = await browserClient.from("articles").select("*").eq("article_id", `${params.article_id}`);
    if (res.error !== null) return <div>error : {res.error.message}</div>;

    const review: Article = res.data[0];
    setHouseType(review.house_type);
    setHouseYear(review.house_year);
    setBuildingType(review.building_type);
    setHouseFloor(review.house_floor);
    setHousePrice(review.house_price);
    setPreviewUrls(review.img_url);
    setImgUrl(review.img_url);
    setScoreOutside(review.score_outside.toString());
    setScoreInside(review.score_inside.toString());
    setScoreTraffic(review.score_traffic.toString());
    setScoreCrime(review.score_crime.toString());
    setGood(review.good);
    setBad(review.bad);
    setAddressInfo({
      houseName: review.house_name,
      address: review.address,
      lat: review.lat,
      lng: review.lng
    });
  };

  // 사진 변경
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

  // 리뷰 수정
  const updateReview = async () => {
    if (!address) return;
    if (!addressInfo) return alert("주소를 입력해주세요!");
    if (!houseType) return alert("거주 유형을 선택해주세요!");
    if (!houseYear) return alert("거주 년도를 입력해주세요!");
    if (!buildingType) return alert("건물 유형을 선택해주세요!");
    if (!houseFloor) return alert("거주 층을 입력해주세요!");
    if (!housePrice) return alert("계약 금액을 입력해주세요!");
    if (!imgUrl) return alert("사진을 등록해주세요!");
    if (!scoreOutside || !scoreInside || !scoreInside || !scoreCrime) return alert("4가지 항목을 전부 평가해주세요!");
    if (!good) return alert("장점을 작성해주세요!");
    if (!bad) return alert("단점을 작성해주세요!");
    await browserClient
      .from("articles")
      .update({
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
      })
      .eq("article_id", params.article_id);
    alert("수정이 완료되었습니다!");

    // 리뷰 수정 후 상세페이지로 이동
    router.push(`/review/${params.article_id}`);
  };

  if (!houseType && !buildingType) return;

  return (
    <div className="flex flex-col items-center text-center">
      <header>
        <h1 className="font-bold text-4xl mt-8">
          {addressInfo?.houseName ? addressInfo.houseName : addressInfo?.address}
        </h1>
        <p className="text-xs my-6 text-gray-400">솔직해도 괜찮아 어차피 익명이니까</p>
      </header>
      <main>
        <ModifyMap getAddressData={getAddressData} addressInfo={addressInfo!} />
        <div className="grid grid-cols-2 gap-2 justify-items-center">
          <div>
            <div className="flex flex-col">
              <label htmlFor="house-type" className="review-label">
                거주 유형
              </label>
              <select onChange={handleSelect} id="house-type" defaultValue="" className="text-input">
                <option value="" disabled>
                  {houseType}
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
                  {buildingType}
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
        <button className="border p-2 px-14 my-8 bg-[#003366] text-white rounded-full" onClick={updateReview}>
          수정
        </button>
      </main>
    </div>
  );
};

export default ModifyReview;
