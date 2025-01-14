import React from "react";
import { queryclient } from "@/lib/getQueryClient";
import SectionLayout from "@/components/layout/DetailSection/SectionLayout";
import {dehydrate, HydrationBoundary} from "@tanstack/react-query";
import {getMentoringTeamInfo} from "@/service/api/team/getMentoringTeamInfo";

const teamPageLeaderPaths = [
  { label: "팀 소개", path: "/mentoring/1/info" },
  { label: "멤버 및 지원자 현황", path: "/mentoring/1/member" },
  //{ label: "멤버", path: "/team/1/member" },
  { label: "작성한 게시글", path: "/mentoring/1/post" },
];

const Layout = async ({ children }: { children: React.ReactNode }) => {
  await queryclient.prefetchInfiniteQuery({
    queryKey: ["mentoring"],
    queryFn: getMentoringTeamInfo,
    initialPageParam: 0,
  });

  return (
    <SectionLayout sectionTitle="마이페이지" navPaths={teamPageLeaderPaths}>
      <HydrationBoundary state={dehydrate(queryclient)}>
        {children}
      </HydrationBoundary>
    </SectionLayout>
  );
};

export default Layout;
