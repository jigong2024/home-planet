# 프로젝트 이름

- 집플래닛

# 프로젝트 소개 👨‍🏫

이 프로젝트는 실제 거주자들이 작성하는 생생한 리뷰를 통하여서 추후 들어올 세입자들을 위하여 정보를 제공하는 사이트입니다.

## 배포 주소
<https://home-planet-six.vercel.app//>

## 개발 기간 ⏲️

- 2024.10.10(목) ~ 2024.10.17(목)

## 역할 분담

- **김진형**
  - Supabase 초기 셋업(Table 제작 및 Table 관계 연결)
  - 회원가입, 로그인 페이지 구현
  - 로그인 유무에 따른 페이지 접근 제한하는 middleware 구성
- **장세희**
  - 마이페이지 구현
- **설하영**
  - 후기 작성 페이지 구현, 후기 수정 페이지 구현
  - 후기 상세 페이지 구현
- **최지민**
  - 프로젝트 초기 셋업(GitHub, 각종 주요 패키지 설치, prettierrc)
  - 지도 페이지 구현
  - 검색, 필터링 기능 구현

## 주요 기능 💜

- 로그인, 회원가입 기능
- 내 게시글 관리
- 거주 후기 검색 및 필터링
- 거주 후기 CRUD (생성, 읽기, 수정, 삭제)

## 기술 스택 📚️

<div style="text-align: left;">
  <div style="margin: ; text-align: left;" "text-align: left;">
    <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white">
    <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white">
    <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white">
    <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=white">
    <img src="https://img.shields.io/badge/Eslint-4B32C3?style=for-the-badge&logo=Eslint&logoColor=white">
  <br/></div>
</div>


## 개발 환경 

<div style="text-align: left;">
  <div style="margin: ; text-align: left;" "text-align: left;">
    <img src="https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white">
    <img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=Github&logoColor=white">
    <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white">
  <br/></div>
</div>

## 프로젝트 구조

```
home-planet/
│
├── public/
│   └── images/
│       └── (필요한 이미지 파일들)
├── src/
|   ├── app/
│   │   ├── _components/
|   |   |   ├── rotation/
|   |   |   └── route.ts
│   │   ├── (pages)/
|   |   |   ├── donation/
|   |   |   |   └── page.tsx
|   |   |   ├── login/
|   |   |   |   └── page.tsx
|   |   |   ├── map/
|   |   |   |   ├── _components
|   |   |   |   |   ├── KakaoMap.tsx
|   |   |   |   |   ├── SearchInput.tsx
|   |   |   |   |   ├── SideBar.tsx
|   |   |   |   |   ├── SidePanel.tsx
|   |   |   |   |   └── supabase.ts
|   |   |   |   └── page.tsx
|   |   |   ├── mypage/
|   |   |   |   ├── _components
|   |   |   |   |   ├── MyReviewsPage.tsx
|   |   |   |   |   ├── ReviewCard.tsx
|   |   |   |   |   └── ReviewList.tsx
|   |   |   |   ├── myreviews/
|   |   |   |   |   └── page.tsx
|   |   |   |   └── page.tsx
|   |   |   ├── review/
|   |   |   |   ├── _components
|   |   |   |   |   ├── ModifyMap.tsx
|   |   |   |   |   └── ReviewMap.tsx
|   |   |   |   ├── [article_id]/
|   |   |   |   |   ├── modify/
|   |   |   |   |   |   └── page.tsx
|   |   |   |   |   └── page.tsx
|   |   |   |   └── page.tsx
|   |   |   └── signup/
|   |   |       └── page.tsx
│   │   ├── hooks/
|   |   |   ├── useReviews.ts
|   |   |   └── useUserId.ts
│   │   ├── types/
|   |   |   ├── mapTypes
|   |   |   |   └── ArticleType.ts
|   |   |   ├── mypageTypes
|   |   |   |   └── Review.ts
|   |   |   └── reviewTypes
|   |   |       ├── Address.ts
|   |   |       └── Article.ts
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
|   |
│   ├── providers/
│   │   └── storeProvider.tsx
│   │
│   ├── store/
│   │   └── userStore.ts
│   │
│   ├── stores/
│   │   └── loginStore.ts
|   |
│   ├── utils/
│   │   └── supabase/
|   |       ├── client.ts
|   |       ├── middleware.ts
|   |       ├── review.ts
|   |       └── server.ts
│   │
│   └── middleware.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 페이지별 기능

- **로그인 페이지**
  > 사용자 인증
- **회원가입 페이지**
  > 새 사용자 계정 생성
- **메인 페이지**
  > 거주 후기 카드 표시, 최신순, 별점 높은 순 정렬, 후기 검색 기능
- **지도 페이지**
  > 지도에 마커 표시, 후기 검색 기능, 건물 유형 별 필터링
- **디테일 페이지**
  > 개별 후기의 상세 정보 표시
- **마이 페이지**
  > 사용자가 작성한 거주 후기 목록 관리
- **피드 작성 폼 페이지**
  > 새로운 후기 생성 및 수정, 이미지 핸들링

## 이슈 🔥
