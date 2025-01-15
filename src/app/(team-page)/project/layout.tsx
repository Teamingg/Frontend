"use client";
import React from "react";
import SectionLayout from "@/components/layout/DetailSection/SectionLayout";
import {instance} from "@/service/api/instance/axiosInstance";

const teamPageLeaderPaths = [
  { label: "팀 소개", path: "/project/1/info" },
  { label: "멤버 및 지원자 현황", path: "/project/1/member" },
  //{ label: "멤버", path: "/team/1/member" },
  { label: "작성한 게시글", path: "/project/1/post" },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SectionLayout sectionTitle="마이페이지" navPaths={teamPageLeaderPaths}>
      {children}
    </SectionLayout>
  );
};

export default Layout;
