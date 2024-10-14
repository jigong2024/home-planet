"use client";
import { useEffect, useRef, useState } from "react";

type props = {
  getHouseType(data: string): void;
  props: {
    title: string[];
    data: string[];
  };
};

const Dropdown = (props: props) => {
  const title = props.props.title[0];
  const list: string[] = props.props.data;
  const [currentValue, setCurrentValue] = useState(title);
  const [showOptions, setShowOptions] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // 선택 외부 영역 클릭 시 옵션 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLDivElement;
      if (selectRef.current && !selectRef.current.contains(target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectRef]);

  // 유형 선택
  const handleOnChangeSelectValue = (e: React.MouseEvent<HTMLLIElement>) => {
    const changedValue = e.currentTarget.getAttribute("value");
    if (!changedValue) {
      throw new Error("Not changed value");
    }
    setCurrentValue(changedValue);
    props.getHouseType(changedValue);
  };

  return (
    <div onClick={() => setShowOptions((prev) => !prev)} ref={selectRef} className=" bg-[#E2E1E1] rounded-lg">
      <label className="inline-block">{currentValue}</label>
      <ul className={`overflow-y-auto ${showOptions ? "max-h-none" : "border-none max-h-0"} `}>
        {list.map((data, idx) => (
          <li key={idx} value={data} onClick={handleOnChangeSelectValue}>
            {data}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
