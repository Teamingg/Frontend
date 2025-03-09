import React from "react";
import GlobalNavigation from "./Navigation/GlobalNavigation";
import {checkCookie} from "../utils/cookies";
import Logo from "@/components/Logo/Logo";

const Header = async () => {
  const isLoggedIn =
      (await checkCookie("accessToken")) || (await checkCookie("refreshToken"));

  return (
      <header className="bg-white fixed top-0 z-50 w-full px-4 py-3 md:p-4 drop-shadow-sm">
        <div className="w-full max-w-5xl lg:max-w-7xl mx-auto flex items-center justify-between">
          {/* 로고 */}
          <Logo/>
          {/* 글로벌 네비게이션 바 (로그인, 로그아웃, 마이페이지, 알림 ..) */}
          <GlobalNavigation isLoggedIn={isLoggedIn} />
        </div>
      </header>
  );
};

export default Header;