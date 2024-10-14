"use client";

import { Address } from "@/app/types/reviewTypes/Address";
import { useEffect, useRef, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

type props = {
  getAddressData(data: Address): void;
};

const ReviewMap = (props: props) => {
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
      kakao.maps.load(() => {
        getCoords();
      });
    }
  }, []);

  // 좌표 찾는 함수
  const getCoords = () => {
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(`${searchAddress}`, (res, stat) => {
      if (stat === kakao.maps.services.Status.OK) {
        const newSearch = res[0];
        setState({ center: { lat: +newSearch.y, lng: +newSearch.x } });
        console.log(newSearch);
        props.getAddressData(newSearch);
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
      <input
        type="text"
        value={searchAddress}
        onChange={handleInputChange}
        className="border text-center bg-[#E2E1E1] rounded-md"
        placeholder="주소 입력"
      />
      <button onClick={getCoords} className="border px-2 ml-1 my-4 bg-[#9d9d9d] rounded-md text-white font-semibold">
        확인
      </button>
    </>
  );
};

export default ReviewMap;
