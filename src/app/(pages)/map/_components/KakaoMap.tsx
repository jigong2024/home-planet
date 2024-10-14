"use client";

import { useEffect, useMemo, useState } from "react";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import { Article, GroupedData } from "../../../types/mapTypes/ArticleType";
import SidePanel from "./SidePanel";
import { fetchArticles } from "./supabase";
import SideBar from "./SideBar";

export default function KaKaoMap() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticles, setselectedArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"all" | "selected">("all");

  // 처음 로드 시 Supabase에서 articles 가져오기
  useEffect(() => {
    async function loadArticles() {
      setIsLoading(true);
      const fetchedArticles = await fetchArticles();

      setArticles(fetchedArticles);
      setselectedArticles(fetchedArticles);
      setFilteredArticles(fetchedArticles);

      setIsLoading(false);
    }

    loadArticles();
  }, []);

  // 같은 위치의 후기들을 그룹화
  const groupedData: GroupedData = useMemo(() => {
    const grouped: GroupedData = {};
    filteredArticles.forEach((article: Article) => {
      // 각 후기의 위도와 경도를 결합한 고유 키 생성
      const key = `${article.lat},${article.lng}`;

      // 장소에 대한 첫번째 후기 작성 시 빈 배열 생성
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(article);
    });
    return grouped;
  }, [filteredArticles]);

  // 지도의 중심 좌표를 계산
  const mapCenter = useMemo(() => {
    if (filteredArticles.length === 0) {
      return { lat: 37.5665, lng: 126.978 }; // 서울 중심 좌표
    }

    const sum = filteredArticles.reduce((acc, cur) => ({ lat: acc.lat + cur.lat, lng: acc.lng + cur.lng }), {
      lat: 0,
      lng: 0
    });
    return {
      lat: sum.lat / filteredArticles.length,
      lng: sum.lng / filteredArticles.length
    };
  }, [filteredArticles]);

  // 마커 클릭 핸들러 추가
  const handleMarkerClick = (articles: Article[]) => {
    setselectedArticles(articles);
    setViewMode("selected");
    setIsSidePanelOpen(true);
  };

  if (isLoading) return <div>지도 로딩 중...</div>;

  return (
    <div className="flex flex-row">
      {/* 사이드 바 */}
      <SideBar
        articles={articles}
        setFilteredArticles={setFilteredArticles}
        setIsSidePanelOpen={setIsSidePanelOpen}
        isSidePanelOpen={isSidePanelOpen}
      />

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
        <SidePanel
          articles={viewMode === "all" ? filteredArticles : selectedArticles}
          isOpen={isSidePanelOpen}
          onClose={() => setIsSidePanelOpen(false)}
          onViewAllClick={() => setViewMode("all")}
          viewMode={viewMode}
        />
      </div>
    </div>
  );
}
