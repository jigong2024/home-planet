import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CounterStoreProvider } from "@/providers/storeProvider";
import { createClient } from "@/utils/supabase/server";
import Script from "next/script";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
});

export const metadata: Metadata = {
  title: "집플래닛",
  description: "house-planet",
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const serverClient = createClient();
  const {
    data: { user }
  } = await serverClient.auth.getUser();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=services,clusterer`}
          strategy="beforeInteractive"
        />
        <CounterStoreProvider uid={user?.id}>
          <Header />
          {children}
          <Footer />
        </CounterStoreProvider>
      </body>
    </html>
  );
}
