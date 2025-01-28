"use client";
import React from "react";
import SectionLayout from "@/components/layout/DetailSection/SectionLayout";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useParams, usePathname} from "next/navigation";
import {fetchTeamPageData} from "@/service/api/team-page/fetchTeamPageData";
import {TeamPageInfo} from "@/app/team/_type/teamPageInfo";
import LoadingSpinner from "@/components/loading/LoadingSpinner";

const Layout: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const params = useParams();
  const path = usePathname();
  const currentPath = path.split("/").pop();

  const {data, error, isLoading} = useQuery<TeamPageInfo>({
    queryKey: ["teamInfo", params.page_type, params.team_id],
    queryFn: () => fetchTeamPageData<TeamPageInfo>(String(params.page_type), String(params.team_id), "info"),
    enabled: currentPath === "info" && !!params.page_type && !!params.team_id,
  });

  // 로딩 및 에러처리
  if (isLoading) return <LoadingSpinner/>;
  if (error) return <div>Error fetching data</div>;

  // data?.authority 값에 따라 다른 네비게이션 구성
  // 예 : page_type 이 project 면 /project/{project_team_id}/info ...
  const firstPath = `/team/${params.page_type}/${params.team_id}`;
  const isUserAuthority = data?.authority === "LEADER" || data?.userRole === "OWNER";
  const leaderNavigation = {label: "멤버 및 지원자 현황", path: `${firstPath}/leader`};
  const memberNavigation = {label: "멤버", path: `${firstPath}/member`};
  const teamPagePaths = [
    {label: "팀 소개", path: `${firstPath}/info`},
    isUserAuthority ? leaderNavigation : memberNavigation,
    {label: "작성한 게시글", path: `${firstPath}/post`},
  ];

  return (
    <SectionLayout sectionTitle="My Team" navPaths={teamPagePaths}>
      <div className="h-full min-h-full p-6 bg-gray-100">
        <div className="h-full bg-white shadow-md rounded-lg p-6">
          {children}
        </div>
      </div>
    </SectionLayout>
  );
};

export default Layout;
