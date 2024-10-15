// SortButtons.tsx
import React from "react";

interface SortButtonsProps {
  onSortByLatest: () => void;
  onSortByRating: () => void;
}

const SortButtons: React.FC<SortButtonsProps> = ({ onSortByLatest, onSortByRating }) => {
  return (
    <div className="flex space-x-4">
      <button onClick={onSortByLatest} className="btn">
        최신 리뷰
      </button>
      <button onClick={onSortByRating} className="btn">
        별점 높은 순
      </button>
    </div>
  );
};

export default SortButtons;
