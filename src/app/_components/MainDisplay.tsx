"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ReviewsDisplay from "./ReviewsDisplay";

const MainDisplay = () => {
  const [sortOrder, setSortOrder] = useState<"latest" | "highest">("latest"); // 정렬 상태 관리

  return (
    <div className="flex">
      {/* 사이드바 */}
      <Sidebar sortOrder={sortOrder} setSortOrder={setSortOrder} />

      {/* 컨텐츠 */}
      <div className="flex-1 p-4">
        <ReviewsDisplay sortOrder={sortOrder} />
      </div>
    </div>
  );
};

export default MainDisplay;
