"use client";
import React from "react";
import SectionLayout from "@/components/layout/DetailSection/SectionLayout";
import {useQuery} from "@tanstack/react-query";
import {useParams, usePathname} from "next/navigation";
import {fetchTeamPageData} from "@/service/api/team-page/fetchTeamPageData";
import {ProjectInfo, TeamPageInfo} from "@/app/team/_type/teamPageInfo";
import LoadingSpinner from "@/components/loading/LoadingSpinner";

const Layout: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const params = useParams();
  const path = usePathname();
  const currentPath = path.split("/").pop();

  const {data, error, isLoading} = useQuery<TeamPageInfo | ProjectInfo>({
    queryKey: ["teamInfo", params.page_type, params.team_id],
    queryFn: () => 
        fetchTeamPageData<TeamPageInfo | ProjectInfo>(
            String(params.page_type),
            String(params.team_id),
            "info"),
    enabled: currentPath === "info" && !!params.page_type && !!params.team_id,
  });

  // 로딩 및 에러처리
  if (isLoading) return <LoadingSpinner/>;
  if (error) return <div>Error fetching data</div>;

  // ✅ 타입 가드 적용
  let isUserAuthority = false;
  const firstPath = `/team/${params.page_type}/${params.team_id}`;

  if (params.page_type === "project") {
    const projectData = data as ProjectInfo;
    isUserAuthority = projectData.userRole === "LEADER";
  } else {
    const teamData = data as TeamPageInfo;
    isUserAuthority = teamData.authority === "OWNER";
  }

  // 네비게이션 구선
  const leaderNavigation = {label: "멤버 및 지원자 현황", path: `${firstPath}/leader`};
  const memberNavigation = {label: "멤버", path: `${firstPath}/member`};
  const teamPagePaths = [
    {label: "팀 소개", path: `${firstPath}/info`},
    isUserAuthority ? leaderNavigation : memberNavigation,
    {label: "작성한 게시글", path: `${firstPath}/post`},
  ];

  return (
    <SectionLayout
        sectionTitle="My Team"
        navPaths={teamPagePaths}>
      <div className="h-full min-h-full p-6 bg-gray-100">
        <div className="h-full bg-white shadow-md rounded-lg p-6">
          {children}
        </div>
      </div>
    </SectionLayout>
  );
};

export default Layout;
