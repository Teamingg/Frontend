import type { Metadata } from "next";
import "./globals.css";

import { checkCookie } from "@/utils/cookies";

import AppProvider from "@/components/provider/AppProvider";

import Header from "@/components/layout/Layout/Header/Header";
import Footer from "@/components/layout/Layout/Footer";

import React from "react";
import ToastList from "@/components/common/Toast/ToastList";

export const metadata: Metadata = {
  title: "티밍",
  description:
    "나와 함께 할 팀을 찾고, 가르침과 배움이 공존하는 티밍에서 다양한 팀원들과 함께 성장해보세요",
};

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  // 로그인 상태 확인

  return (
    <html lang="ko">
      <body>
        <div id="toast"></div>
        <div id="modal-root"></div>
        <Header/>
        <main className="w-full mt-[72px] px-5 pt-5 pb-32 min-h-[calc(100vh-40px)] max-w-2xl md:max-w-3xl lg:max-w-6xl mx-auto">
          <AppProvider>
            <ToastList />
            {modal}
            {children}
          </AppProvider>
        </main>
        <Footer/>
      </body>
    </html>
  );
}