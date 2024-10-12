"use client";
import { useState } from "react";
import ReviewMap from "../_components/review/ReviewMap";

const ReviewPage = () => {
  const [contractType, setContractType] = useState("");
  const [year, setYear] = useState("");
  const [residenceType, setResidenceType] = useState("");
  const [floor, setFloor] = useState("");
  const [score, setScore] = useState("");
  const [good, setGood] = useState("");
  const [bad, setBad] = useState("");

  //   const createReview = async (e) => {
  //     e.preventDefault();

  //   }

  return (
    <>
      <header>
        <h1>리뷰 등록하기</h1>
        <p>솔직해도 괜찮아 어차피 익명이니까</p>
      </header>
      <main>
        <ReviewMap />
        <div>
          <div>
            <p>거주 유형</p>
            <input
              type="text"
              placeholder="매매 / 전세 / 월세"
              value={contractType}
              onChange={(e) => {
                setContractType(e.target.value);
              }}
            />
            <p>거주 년도</p>
            <input type="text" value={year} onChange={(e) => setYear(e.target.value)} />
            <p>건물 유형</p>
            <input type="text" value={residenceType} onChange={(e) => setResidenceType(e.target.value)} />
            <p>거주 층</p>
            <input type="text" value={floor} onChange={(e) => setFloor(e.target.value)} />
            <div>
              <p>만족도</p>
              <input type="text" value={score} onChange={(e) => setScore(e.target.value)} />
              <p>장점</p>
              <input type="text" value={good} onChange={(e) => setGood(e.target.value)} />
              <p>단점</p>
              <input type="text" value={bad} onChange={(e) => setBad(e.target.value)} />
            </div>
            <button>등록하기</button>
          </div>
        </div>
      </main>
    </>
  );
};

export default ReviewPage;
