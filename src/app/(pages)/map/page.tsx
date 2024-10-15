"use client";

import { useSearchParams } from "next/navigation";
import KaKaoMap from "./_components/KakaoMap";

function MapPage() {
  //useSearchParams를 사용하여 URL의 쿼리 파라미터 가져오기
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  return (
    <div>
      <KaKaoMap initialSearch={initialSearch} />
    </div>
  );
}

export default MapPage;
