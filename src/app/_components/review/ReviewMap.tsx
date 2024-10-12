"use client";
// 샘플주소
// 거제대로 3718
// 서간도길 9-9
import React, { useEffect, useRef, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const ReviewMap = () => {
  const [state, setState] = useState({
    center: { lat: 33.55635, lng: 126.795841 }
  });
  const [searchAddress, setSearchAddress] = useState("");
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      // 초기 렌더링 시 실행 막음
      isInitialMount.current = false;
    } else {
      kakao.maps.load(() => getCoords());
    }
  }, [state]);

  const getCoords = () => {
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(`${searchAddress}`, (res, stat) => {
      if (stat === kakao.maps.services.Status.OK) {
        const newSearch = res[0];
        setState({ center: { lat: +newSearch.y, lng: +newSearch.x } });
        console.log(newSearch);
      }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAddress(e.target.value);
  };

  return (
    <>
      <Map center={state.center} style={{ width: "1000px", height: "200px" }}>
        <MapMarker position={state.center} />
      </Map>
      주소입력 :<input type="text" value={searchAddress} onChange={handleInputChange} className="border" />
      <button onClick={getCoords}>입력</button>
    </>
  );
};

export default ReviewMap;
