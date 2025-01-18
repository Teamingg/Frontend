"use client";
import React from "react";
import SectionLayout from "@/components/layout/DetailSection/SectionLayout";
import {instance} from "@/service/api/instance/axiosInstance";
import {useQuery} from "@tanstack/react-query";
import {getMentoringTeamInfo} from "@/service/api/team/getMentoringTeamInfo";
import {getProjectTeamInfo} from "@/service/api/team/getProjectTeamInfo";
import {useParams} from "next/navigation";

const Layout = ({children}: { children: React.ReactNode }) => {
  const params = useParams();
  const {data, error, isLoading} = useQuery({
    queryKey: ["id"],
    queryFn: getProjectTeamInfo
  });

  const teamPageLeaderPaths = [
    {label: "팀 소개", path: "/project/1/info"},
    {label: "멤버 및 지원자 현황", path: "/project/1/member"},
    data?.role === "LEADER"
      ? {label: "멤버 및 지원자 현황", path: "/project/1/member"}
      : {label: "멤버", path: "/project/1/member"},
    {label: "작성한 게시글", path: "/project/1/post"},
  ];

  return (
    <SectionLayout sectionTitle="마이페이지" navPaths={teamPageLeaderPaths}>
      <div className="p-6 bg-gray-100 min-h-full overflow-x-scroll">
        <div className="bg-white shadow-md rounded-lg p-6">
          {children}
        </div>
      </div>
    </SectionLayout>
  );
};

export default Layout;
