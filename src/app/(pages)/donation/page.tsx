import React from "react";
import Image from "next/image";
import { FaGithub, FaBlog } from "react-icons/fa";

const teamMembers = [
  {
    name: "김진형",
    role: "머리",
    mbti: "ISTJ",
    message: "모두 마지막 학습주차 힘내봅시다!",
    account: "신한은행 110-076-199825",
    blog: "https://velog.io/@lukby2457/posts",
    github: "https://github.com/lukby2457"
  },
  {
    name: "장세희",
    role: "오른팔",
    mbti: "ENTJ",
    message: "오른팔 역할 잘 해내보겠슴니다….!!! 🌷💗🍀",
    account: "우리은행 1002-235-650145",
    blog: "https://seheej.tistory.com/",
    github: "https://github.com/Sehee-Jang?tab=repositories"
  },
  {
    name: "김민규",
    role: "왼팔",
    mbti: "ENFJ",
    message: "왼팔은 거들뿐!",
    account: "신한은행 110-076-199825",
    blog: "https://rarrit.github.io/",
    github: "https://github.com/RARRIT"
  },
  {
    name: "설하영",
    role: "오른발",
    mbti: "INTJ",
    message: "안녕하세요 오른발입니다. 모두들 화이팅해용!!!",
    account: "하나은행 522-910349-45307",
    blog: "https://doonii.tistory.com",
    github: "https://github.com/hadooni"
  },
  {
    name: "최지민",
    role: "왼발",
    mbti: "ENFP",
    message: "다들 반갑습니다! 열심히 하겠습니다! 왼발 역할 충실히 하겠습니다 :)",
    account: "농협은행 302-0811-575711",
    blog: "https://choijming21.tistory.com",
    github: "http://github.com/jigong2024"
  }
];

const DonationPage = () => {
  return (
    <div className="flex flex-col p-6 bg-gray-100 min-h-screen">
      {/* 타이틀 */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">후원하기</h1>
        <h2 className="text-lg text-gray-600">무직백수 취준생 사지가 8색조 후원하기</h2>
      </div>

      {/* 이미지와 멤버 카드 영역 */}
      <div className="flex flex-col md:flex-row items-start">
        {/* 이미지 영역 */}
        <div className="mb-6 md:mb-0 md:mr-6 w-full md:w-1/2">
          <Image
            src="/images/team-image.png"
            alt="8조 팀원 이미지"
            width={700}
            height={700}
            className="rounded-lg shadow-lg transition-transform transform hover:scale-105"
          />
        </div>

        {/* 멤버 카드 영역 */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/2">
          {/* 팀원 정보 카드 */}
          <div className="grid grid-cols-1 gap-4 w-full">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 shadow-md overflow-hidden transition-shadow duration-300 bg-white hover:shadow-xl hover:bg-[#F2FBFF] transition-transform transform hover:scale-105"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {member.name} | {member.role} | {member.mbti}
                </h3>
                <p className="mb-2 text-gray-700">{member.message}</p>
                <p className="text-gray-600">계좌: {member.account}</p>
                <p className="text-gray-600">
                  블로그:{" "}
                  <a
                    href={member.blog}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:underline"
                  >
                    <FaBlog className="inline mr-1" /> {member.blog}
                  </a>
                </p>
                <p className="text-gray-600">
                  깃헙:{" "}
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:underline"
                  >
                    <FaGithub className="inline mr-1" /> {member.github}
                  </a>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
