"use client";

import { ReactNode } from "react";
import { queryclient } from "@/lib/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {
  getServerMentoringTeam,
  getServerProjectInfo,
} from "@/service/api/team/team";
import TeamContainer from "@/layout/Team/TeamContainer";
import { useParams } from "next/navigation";

const Layout = ({ children }: { children: ReactNode }) => {
  const { type, id } = useParams();

  const navItems = [
    { label: "대시보드", path: `/team/${type}/${id}/dashboard` },
    { label: "멤버", path: `/team/${type}/${id}/member` },
    { label: "게시글", path: `/team/${type}/${id}/post` },
  ];
  console.log("팀페이지 최상위 레이아웃 실행 로그");
  return (
    <HydrationBoundary state={dehydrate(queryclient)}>
      <TeamContainer
        navItems={navItems}
        type={type as string}
        id={id as string}
      >
        {children}
      </TeamContainer>
    </HydrationBoundary>
  );
};

export default Layout;
