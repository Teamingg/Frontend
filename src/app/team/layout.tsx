import React from "react";
import SectionLayout from "@/components/layout/DetailSection/SectionLayout";
import {instance} from "@/service/api/instance/axiosInstance";

const teamPageLeaderPaths = [
  { label: "팀 소개", path: "/team/1/leader/info" },
  { label: "멤버 및 지원자 현황", path: "/team/1/leader/member" },
  { label: "멤버", path: "/team/1/member" },
  { label: "작성한 게시글", path: "/team/1/leader/post" },
];

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <SectionLayout sectionTitle="마이페이지" navPaths={teamPageLeaderPaths}>
      {children}
    </SectionLayout>
  );
};

export default Layout;
