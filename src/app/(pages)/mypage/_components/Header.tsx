"use client";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="shadow-lg bg-white">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black">
          <Link href="/">
            <Image src="/images/house-planet-logo.png" alt="집플래닛 로고" width={70} height={70} />
          </Link>
        </h1>
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="text-black transition-colors duration-300">
              지도
            </Link>
          </li>
          <li>
            <Link href="/mypage" className="text-black transition-colors duration-300">
              마이페이지
            </Link>
          </li>
          <li>
            <Link href="/" className="text-black transition-colors duration-300">
              로그인
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
