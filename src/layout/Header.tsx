import Image from "next/image";
import Link from "next/link";

import { checkCookie } from "@/utils/cookies";
import GlobalNavigation from "./Navigation/GlobalNavigation";

const Header = async () => {
  const isLoggedIn =
      (await checkCookie("accessToken")) || (await checkCookie("refreshToken"));

  return (
      <header className="bg-white fixed top-0 z-50 w-full px-4 py-3 md:p-4 drop-shadow-sm">
        <div className="w-full max-w-6xl mx-auto px-5 flex items-center justify-between">
          {/* 로고 */}
          <h1 className="flex items-center gap-8">
            <Link href="/public" className="block relative w-[120px] md:w-[140px] h-[35px] md:h-[40px]">
              <Image
                  src="/newLogo.png"
                  fill
                  alt="로고"
                  sizes="150px"
                  priority/>
            </Link>
          </h1>

          {/* 글로벌 네비게이션 바 (로그인, 로그아웃, 마이페이지, 알림 ..) */}
          <GlobalNavigation isLoggedIn={isLoggedIn} />
        </div>
      </header>
  );
};

export default Header;