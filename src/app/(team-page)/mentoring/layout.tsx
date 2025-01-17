'use client';
import React, {Suspense} from "react";
import SectionLayout from "@/components/layout/DetailSection/SectionLayout";
import {useQuery} from "@tanstack/react-query";
import {getMentoringTeamInfo} from "@/service/api/team/getMentoringTeamInfo";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const {data, error, isLoading} = useQuery({
    queryKey: ["mentoring"],
    queryFn: getMentoringTeamInfo
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  // console.log("🔹 Layout Data:", data);
  // console.log("🔹 Layout Children:", children);

  const teamPageLeaderPaths = [
    { label: "팀 소개", path: "/mentoring/1/info" },
    data?.role === "LEADER"
      ? { label: "멤버 및 지원자 현황", path: "/mentoring/1/member" }
      : { label: "멤버", path: "/mentoring/1/member" },
    { label: "작성한 게시글", path: "/mentoring/1/post" },
  ];

  return (
    <SectionLayout sectionTitle="마이페이지" navPaths={teamPageLeaderPaths}>
      {children}
    </SectionLayout>
  );
};

export default Layout;
