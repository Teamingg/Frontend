"use client";
import React from "react";
import SectionLayout from "@/components/layout/DetailSection/SectionLayout";
import {instance} from "@/service/api/instance/axiosInstance";
import {useQuery} from "@tanstack/react-query";
import {getMentoringTeamInfo} from "@/service/api/team/getMentoringTeamInfo";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const {data, error, isLoading} = useQuery({
    queryKey: ["id"],
    queryFn: getMentoringTeamInfo
  });

  const teamPageLeaderPaths = [
    { label: "팀 소개", path: "/project/1/info" },
    { label: "멤버 및 지원자 현황", path: "/project/1/member" },
    data?.role === "LEADER"
      ? { label: "멤버 및 지원자 현황", path: "/project/1/member" }
      : { label: "멤버", path: "/project/1/member" },
    { label: "작성한 게시글", path: "/project/1/post" },
  ];

  return (
    <SectionLayout sectionTitle="마이페이지" navPaths={teamPageLeaderPaths}>
      {children}
    </SectionLayout>
  );
};

export default Layout;
