import Link from "next/link";

const MyPage = () => {
  return (
    <div>
      <h1>마이페이지</h1>
      <nav>
        <ul>
          <li>
            <Link href="/mypage/myreviews">내가 쓴 리뷰</Link>
          </li>
          <li>
            <Link href="/mypage/wishlist">관심 리스트</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MyPage;
