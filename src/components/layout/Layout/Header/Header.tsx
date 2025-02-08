"use client";

import Image from "next/image";
import Link from "next/link";

import LogoutButton from "../../../auth/LogoutButton";
import { useToast } from "@/hooks/useToast";

const Header = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const { toast } = useToast();

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center py-6 md:max-w-4xl">
        {/* 로고 */}
        <h1 className="relative w-[150px] h-[30px]">
          <Link href="/">
            <Image src="/Logo.png" fill alt="Teaming" sizes="150px" priority />
          </Link>
        </h1>

        {/* 네비게이션 */}
        <nav>
          <ul className="flex gap-4">
            <li>
              {!isLoggedIn ? (
                <Link href="/login" scroll={false}>
                  로그인
                </Link>
              ) : (
                  <>
                    <LogoutButton />
                    <Link href="/my">마이페이지</Link>
                  </>
              )}
            </li>
            <li
              onClick={() => {
                if (!isLoggedIn) {
                  toast.error("로그인이 필요합니다.");
                }
              }}
            >

            </li>
            <li>알림</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
