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
      <body className="pt-[59px] md:pt-[71px]">
        <div id="toast"></div>
        <div id="modal-root"></div>

        <Header />

        <main className="min-h-screen mx-auto md:py-2">
          <AppProvider>
            <ToastList />
            {modal}
            {children}
          </AppProvider>
        </main>

        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
