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
  const getCoords = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (searchAddress.length === 0) return alert("주소를 입력해주세요!");
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(`${searchAddress}`, (res, stat) => {
      if (stat === kakao.maps.services.Status.OK) {
        const newSearch = res[0];
        setState({ center: { lat: +newSearch.y, lng: +newSearch.x } });
        props.getAddressData(newSearch);
      } else {
        alert("유효한 주소 정보가 아닙니다. 다시 확인해주세요!");
        setSearchAddress("");
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
      <form onSubmit={getCoords}>
        <input
          type="text"
          value={searchAddress}
          onChange={handleInputChange}
          className="text-input"
          placeholder="주소 입력"
        />
        <button className="map-confirm-btn">확인</button>
      </form>
    </>
  );
};

export default ReviewMap;
