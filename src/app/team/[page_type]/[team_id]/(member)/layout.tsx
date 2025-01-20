"use client";
import React from "react";
import SectionLayout from "@/components/layout/DetailSection/SectionLayout";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useParams, usePathname} from "next/navigation";
import {fetchTeamPageData} from "@/service/api/team-page/fetchTeamPageData";
import {TeamPageInfo} from "@/app/team/[page_type]/[team_id]/(member)/_type/teamPageInfo";

const Layout: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const params = useParams();
  const path = usePathname();
  const currentPath = path.split("/").pop();

  // 항상 useQuery 를 호출하고, "info"가 아닐 때는 enabled 옵션으로 비활성화
  const queryClient = useQueryClient();
  const queryFn = fetchTeamPageData<TeamPageInfo>(String(params.page_type), String(params.team_id), "info");

  const {data, error, isLoading} = useQuery<TeamPageInfo>({
    queryKey: ["teamInfo", params.page_type, params.team_id],
    queryFn: () => queryFn,
    enabled: currentPath === "info" && !!params.page_type && !!params.team_id,
  });

  // 로딩 및 에러처리
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  // 데이터 캐싱
  queryClient.setQueryData(["teamInfo", params.page_type, params.team_id], data);

  // data?.authority 값에 따라 다른 네비게이션 구성
  // 예 : page_type 이 project 면 /project/{project_team_id}/info ...
  const firstPath = `/team/${params.page_type}/${params.team_id}`;
  const teamPagePaths = [
    {label: "팀 소개", path: `${firstPath}/info`},
    data?.authority === "LEADER"
      ? {label: "멤버 및 지원자 현황", path: `${firstPath}/leader`}
      : {label: "멤버", path: `${firstPath}/member`},
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
