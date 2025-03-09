"use client";
import React, { memo } from "react";
import Link from "next/link";
import { PiBellThin, PiUserCircleThin } from "react-icons/pi";
import LogoutButton from "@/components/Button/LogoutButton";
import { useToast } from "@/hooks/useToast";
import CreateTeamButton from "@/components/Button/CreateTeamButton";
import { usePathname } from "next/navigation";
import Notification from "@/components/Notification";

const GlobalNavigation = memo(({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const path = usePathname();
  const { toast } = useToast();
  return (
    <>
      {!isLoggedIn && (
        <Link
          href="/login"
          scroll={false}
          className="block px-4 md:px-6 py-2 hover:button_hover bg-primary rounded-lg text-xs md:text-base text-white"
        >
          로그인
        </Link>
      )}

      {isLoggedIn && (
        <ul className="flex gap-4 items-center">
          {/* 팀 생성은 메인페이지에서만 가능 */}
          {path === "/" && (
            <li>
              <CreateTeamButton />
            </li>
          )}
          <li>
            <Link
              className="flex items-center gap-2"
              href="/my/dashboard"
              onClick={() => {
                if (!isLoggedIn) toast.error("로그인이 필요합니다.");
              }}
            >
              <PiUserCircleThin size={28} />
              <span className="hidden md:inline">마이페이지</span>
            </Link>
          </li>
          <li>
            <Notification />
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      )}
    </>
  );
});

GlobalNavigation.displayName = "GlobalNavigation";
export default GlobalNavigation;
