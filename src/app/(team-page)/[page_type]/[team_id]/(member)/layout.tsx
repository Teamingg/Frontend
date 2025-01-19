"use client";
import React from "react";
import SectionLayout from "@/components/layout/DetailSection/SectionLayout";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useParams} from "next/navigation";
import {fetchTeamPageData} from "@/service/api/team-page/fetchTeamPageData";
import {TeamPageInfo} from "@/app/(team-page)/[page_type]/[team_id]/(member)/_type/teamPageInfo";

const Layout = ({children}: { children: React.ReactNode }) => {
  const params = useParams();
  const queryClient = useQueryClient();

  const {data, error, isLoading} = useQuery<TeamPageInfo>({
    queryKey: ["teamInfo", params.page_type, params.team_id],
    queryFn: () => fetchTeamPageData<TeamPageInfo>(String(params.page_type), String(params.team_id), "info"),
    enabled: !!params.page_type && !!params.team_id,
  });

  // 로딩 및 에러처리
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  // 데이터 캐싱
  queryClient.setQueryData(["teamInfo", params.page_type, params.team_id], data);

  // url 에 따라 다른 페이지 출력
  // 예 : page_type 이 project 면 /project/{project_team_id}/info ...
  const teamPagePaths = [
    {label: "팀 소개", path: `/${params.page_type}/${params.team_id}/info`},
    {label: "멤버 및 지원자 현황", path: `/${params.page_type}/${params.team_id}/member`},
    data?.authority === "LEADER"
      ? {label: "멤버 및 지원자 현황", path: `/${params.page_type}/${params.team_id}/member`}
      : {label: "멤버", path: `/${params.page_type}/${params.team_id}/member`},
    {label: "작성한 게시글", path: `/${params.page_type}/${params.team_id}/post`},
  ];

  return (
    <SectionLayout sectionTitle="My Team" navPaths={teamPagePaths}>
      <div className="p-6 bg-gray-100 min-h-full overflow-x-scroll">
        <div className="bg-white shadow-md rounded-lg p-6">
          {children}
        </div>
      </div>
    </SectionLayout>
  );
};

export default Layout;
