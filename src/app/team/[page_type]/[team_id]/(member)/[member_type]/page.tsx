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
import {MentoringTeamLeader, MentoringTeamMember, ProjectMember} from "@/app/team/_type/teamPageMember";
import {transformTeamData} from "@/app/team/_service/teamMemberService";

export interface TeamMemberTables {
  type: "MEMBER" | "LEADER";
  data: ProjectMember[];
}

const Page = () => {
  // 데이터 패칭
  const params = useParams();
  const {data, error, isLoading} = useQuery({
    queryKey: ["members"],
    queryFn: () =>
        fetchTeamPageData<MentoringTeamLeader | MentoringTeamMember | ProjectMember[]>(
            String(params.page_type), String(params.team_id), "member"),
  });

  // 로딩 및 에러처리
  if (isLoading) return <LoadingSpinner/>;
  // if (error) return <div>Error fetching data</div>;

  // ✅ 데이터 변환
  const members = transformTeamData(data);

  return (
      <>
        {/* 팀원 리스트 */}
        <MemberTableWrapper title="팀원">
          {/* 테이블 헤더 */}
          <MemberTableHeader tableName={team.member}/>
          {/* 테이블 데이터 */}
          <MemberTables
              type="MEMBER"
              data={members}
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
                  data={members}
              />
            </MemberTableWrapper>
        )}
      </>
  );
};

export default Page;