"use client";

import { useMemo, useState } from "react";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk";
import mockData from "./MockData";
import { Article, GroupedData } from "../../../types/mapTypes/ArticleType";
import SidePanel from "./SidePanel";

export default function KaKaoMap() {
  const apiKey: string = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;
  const [seletedArticles, setSeletedArticles] = useState([]);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);

  // SDK 로드
  useKakaoLoaderOrigin({
    appkey: apiKey,
    libraries: ["clusterer", "drawing", "services"]
  });

  // 같은 위치의 후기들을 그룹화
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

  // 지도의 중심 좌표를 계산
  const mapCenter = useMemo(() => {
    const allArticles = Object.values(groupedData).flat();
    const sum = allArticles.reduce((acc, cur) => ({ lat: acc.lat + cur.lat, lng: acc.lng + cur.lng }), {
      lat: 0,
      lng: 0
    });
    return {
      lat: sum.lat / allArticles.length,
      lng: sum.lng / allArticles.length
    };
  }, []);

  // 마커 클릭 핸들러 추가
  const handleMarkerClick = (articles) => {
    setSeletedArticles(articles);
    setIsSidePanelOpen(true);
  };

  // 사이드 패널 토글 함수 추가
  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  return (
    <div className="flex flex-row">
      {/* 왼쪽 사이드바 */}
      <div className="flex flex-col gap-3 w-1/12">
        <button className="border rounded-md p-1">원/투룸</button>
        <button className="border rounded-md p-1">아파트</button>
        <button className="border rounded-md p-1">주택/빌라</button>
        <button className="border rounded-md p-1">오피스텔</button>
        {/* 토글버튼 */}
        <button onClick={toggleSidePanel} className="border rounded-md p-1">
          검색
        </button>
      </div>

      {/* 지도영역 */}
      <div className="w-11/12 overflow-hidden relative">
        <Map center={mapCenter} className="container h-screen" level={11}>
          <MarkerClusterer averageCenter={true} minLevel={10}>
            {Object.entries(groupedData).map(([key, articles]) => {
              const [lat, lng] = key.split(",").map(Number);
              return (
                <MapMarker
                  key={key}
                  position={{ lat, lng }}
                  onClick={() => {
                    handleMarkerClick(articles);
                  }}
                ></MapMarker>
              );
            })}
          </MarkerClusterer>
        </Map>

        {/* 사이드 패널 */}
        <SidePanel articles={seletedArticles} isOpen={isSidePanelOpen} onClose={() => setIsSidePanelOpen(false)} />
      </div>
    </div>
  );
}
