"use client";
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {fetchTeamPageData} from "@/service/api/team-page/fetchTeamPageData";
import MemberTableWrapper from "@/app/team/_components/MemberTableWrapper";
import MemberTableHeader from "@/app/team/_components/MemberTableHeader";
import MemberTables from "@/app/team/_components/MemberTables";
import {useParams} from "next/navigation";
import {team} from "@/app/team/_data/member";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import {ProjectMember} from "@/app/team/_type/teamPageMember";

export interface TeamMemberTables {
  type: "MEMBER" | "LEADER";
  data: ProjectMember[];
}

const Page = () => {
  // 데이터 패칭
  const params = useParams();
  const {data, error, isLoading} = useQuery({
    queryKey: ["page"],
    queryFn: () => fetchTeamPageData(String(params.page_type), String(params.team_id), "member")
  });

  // 로딩 및 에러처리
  if (isLoading) return <LoadingSpinner/>;
  // if (error) return <div>Error fetching data</div>;



  /*
   * 멘토링팀 멤버 및 지원자 조회 (/mentoring/teams/{team_id}/status
   * 프로젝트 팀 지원자 조회 (/project/team/{team_id}/participation
   * 만약 데이터가 멘토링이면 ? 프로젝트면 ? => 데이터 바인딩 함수 생성
   * 타입가드
   */
  return (
      <>
        {/* 팀원 리스트 */}
        <MemberTableWrapper title="팀원">
          {/* 테이블 헤더 */}
          <MemberTableHeader tableName={team.member}/>
          {/* 테이블 데이터 */}
          <MemberTables
              type="MEMBER"
              data={data}
          />
        </MemberTableWrapper>

        {/* 신청 내역 리스트 (리더 전용) */}
        {params.member_type === "LEADER" && (
            <MemberTableWrapper title="신청내역">
              {/* 테이블 헤더 */}
              <MemberTableHeader tableName={team.leader}/>
              {/* 테이블 데이터 */}
              <MemberTables
                  type="LEADER"
                  data={data}
              />
            </MemberTableWrapper>
        )}
      </>
  );
};

export default Page;