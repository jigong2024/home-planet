"use client";

import { useMemo, useRef, useState } from "react";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk";
import mockData from "./MockData";
import { Article, GroupedData } from "../_types/ArticleType";
import ReviewModal from "./ReviewModal";

export default function KaKaoMap() {
  const apiKey: string = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;
  const [seletedArticles, setSeletedArticles] = useState([]);
  // const mapRef = useRef(null);

  // SDK 로드
  useKakaoLoaderOrigin({
    appkey: apiKey,
    libraries: ["clusterer", "drawing", "services"]
  });

  // 현 위치로 이동하는 함수
  // const moveToCurrentLocation = () => {
  //   if (navigator.geolocation && mapRef.current) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       const { latitude, longitude } = position.coords;
  //       const map = mapRef.current;
  //       if (map) {
  //         map.setCenter(new kakao.maps.LatLng(latitude, longitude));
  //       }
  //     });
  //   }
  // };

  // 같은 위치의 리뷰들을 그룹화합니다.
  const groupedData: GroupedData = useMemo(() => {
    const grouped = {};
    mockData.forEach((article: Article) => {
      // 각 후기의 위도와 경도를 결합한 고유 키 생성
      const key = `${article.lat},${article.lng}`;

      // 장소에 대한 첫번째 후기 작성 시 빈 배열 생성
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(article);
    });
    return grouped;
  }, []);

  // 지도의 중심 좌표를 계산합니다.
  const mapCenter = useMemo(() => {
    const sum = mockData.reduce((acc, cur) => ({ lat: acc.lat + cur.lat, lng: acc.lng + cur.lng }), { lat: 0, lng: 0 });
    return {
      lat: sum.lat / mockData.length,
      lng: sum.lng / mockData.length
    };
  }, []);

  return (
    <div className="flex flex-row">
      <div className="flex flex-col gap-3 w-1/5">
        <button className="border rounded-md p-1">원룸/투룸</button>
        <button className="border rounded-md p-1">아파트</button>
        <button className="border rounded-md p-1">주택/빌라</button>
        <button className="border rounded-md p-1">오피스텔</button>
      </div>
      <div className="w-4/5 overflow-hidden">
        <Map center={mapCenter} className="container h-screen" level={11}>
          <MarkerClusterer averageCenter={true} minLevel={10}>
            {Object.entries(groupedData).map(([key, articles]) => {
              const [lat, lng] = key.split(",").map(Number);
              return (
                <MapMarker
                  key={key}
                  position={{ lat, lng }}
                  onClick={() => {
                    setSeletedArticles(articles);
                  }}
                ></MapMarker>
              );
            })}
          </MarkerClusterer>
        </Map>

        <ReviewModal articles={seletedArticles} onClose={() => setSeletedArticles(null)} />
        {/* <button
          onClick={moveToCurrentLocation}
          className="absolute bottom-4 right-4 bg-white border border-gray-300 rounded-md p-2 shadow-md z-10 hover:bg-gray-100"
        >
          현재 위치
        </button> */}
      </div>

      {/* {seletedArticles && (
        <div>
          <h2>후기 목록</h2>
          {seletedArticles?.map((article, index) => (
            <div key={index}>
              <h3>{article.house_name}</h3>
              <p>거주 유형: {article.house_type}</p>
              <p>건물 유형: {article.build_type}</p>
              <p>가격: {article.house_price.toLocaleString()}원</p>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
}
