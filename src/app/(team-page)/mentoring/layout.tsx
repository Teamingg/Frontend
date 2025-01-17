'use client';
import React, {Suspense} from "react";
import SectionLayout from "@/components/layout/DetailSection/SectionLayout";
import {useQuery} from "@tanstack/react-query";
import {getMentoringTeamInfo} from "@/service/api/team/getMentoringTeamInfo";
import {useParams} from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const {data, error, isLoading} = useQuery({
    queryKey: ["mentoring"],
    queryFn: () => getMentoringTeamInfo(params.mentoringID),
    enabled: !!params.mentoringID,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  const teamPageLeaderPaths = [
    { label: "팀 소개", path: `/mentoring/${params.mentoringID}/info` },
    data?.role === "LEADER"
      ? { label: "멤버 및 지원자 현황", path: `/mentoring/${params.mentoringID}/member` }
      : { label: "멤버", path: `/mentoring/${params.mentoringID}/member` },
    { label: "작성한 게시글", path: `/mentoring/${params.mentoringID}/post` },
  ];

  return (
    <SectionLayout sectionTitle="마이페이지" navPaths={teamPageLeaderPaths}>
      {children}
    </SectionLayout>
  );
};

export default Layout;
