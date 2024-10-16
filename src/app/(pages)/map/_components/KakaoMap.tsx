"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import { Article, GroupedData } from "../../../types/mapTypes/ArticleType";
import SidePanel from "./SidePanel";
import { fetchArticles } from "./supabase";
import SideBar from "./SideBar";

type KakaoMapProps = {
  initialSearch: string;
};

export default function KaKaoMap({ initialSearch = "" }: KakaoMapProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticles, setselectedArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);

  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"all" | "selected">("all");

  const [search, setSearch] = useState(initialSearch);

  // 처음 로드 시 Supabase에서 articles 가져오기
  useEffect(() => {
    async function loadArticlesAndSearch() {
      setIsLoading(true);
      const fetchedArticles = await fetchArticles();

      setArticles(fetchedArticles);
      setselectedArticles(fetchedArticles);

      if (initialSearch) {
        // 초기 검색 수행
        const searchLower = initialSearch.toLowerCase().replace(/\s+/g, "");
        const searched = fetchedArticles.filter(
          (article) =>
            article.address.toLowerCase().replace(/\s+/g, "").includes(searchLower) ||
            article.house_name?.toLowerCase().replace(/\s+/g, "").includes(searchLower)
        );
        setFilteredArticles(searched);
      } else {
        setFilteredArticles(fetchedArticles);
      }

      setIsLoading(false);
    }

    loadArticlesAndSearch();
  }, [initialSearch]);

  // 검색 로직
  const handleSearch = useCallback(
    (searchTerm: string) => {
      const trimmedSearchTerm = searchTerm.trim();
      if (trimmedSearchTerm === "") {
        alert("검색어를 입력해주세요.");
        return;
      }

      const searchLower = trimmedSearchTerm.toLowerCase().replace(/\s+/g, "");

      const searched = articles.filter(
        (article) =>
          article.address.toLowerCase().replace(/\s+/g, "").includes(searchLower) ||
          article.house_name?.toLowerCase().replace(/\s+/g, "").includes(searchLower)
      );

      setFilteredArticles(searched);
      setViewMode("all");
    },
    [articles]
  );

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
      return { lat: 37.5665, lng: 126.978 - 2 }; // 서울 중심 좌표
    }

    const sum = filteredArticles.reduce((acc, cur) => ({ lat: acc.lat + cur.lat, lng: acc.lng + cur.lng }), {
      lat: 0,
      lng: 0
    });
    return {
      lat: sum.lat / filteredArticles.length,
      lng: sum.lng / filteredArticles.length - 2
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
      <div className="w-[calc(100%-80px)] overflow-hidden relative">
        <Map
          center={mapCenter}
          className="container min-h-[calc(100vh-170px)] maxWidthFull
        "
          level={13}
        >
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
          handleSearch={handleSearch}
          search={search}
          setSearch={setSearch}
        />
      </div>
    </div>
  );
}
