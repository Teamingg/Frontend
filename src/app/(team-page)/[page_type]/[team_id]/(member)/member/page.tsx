"use client";
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import MemberTableList from "@/app/(team-page)/[page_type]/[team_id]/(member)/member/_components/MemberTableList";
import MemberTableHeader from "@/app/(team-page)/[page_type]/[team_id]/(member)/member/_components/MemberTableHeader";
import {useParams} from "next/navigation";
import MemberTableData from "@/app/(team-page)/[page_type]/[team_id]/(member)/member/_components/MemberTableData";
import {fetchTeamPageData} from "@/service/api/team-page/fetchTeamPageData";

const MEMBER = [
  {id: 1, label: "날짜"},
  {id: 2, label: "닉네임"},
  {id: 3, label: "역할"},
  {id: 4, label: "강퇴"},
  {id: 5, label: "신고"},
  {id: 6, label: "리뷰"}
];

const LEADER = [
  {id: 1, label: "신청일시"},
  {id: 2, label: "닉네임"},
  {id: 3, label: "경고 횟수"},
  {id: 4, label: "수락/거절"}
];

const Page = () => {
  const params = useParams();
  const {data, error, isLoading} = useQuery({
    queryKey: ["page"],
    queryFn: () => fetchTeamPageData(String(params.page_type), String(params.team_id), "member")
  })

  // 로딩 및 에러처리
  if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error fetching data</div>;

  return (
      <>
        {/* 팀원 리스트 */}
        <MemberTableList title="팀원">
          {/* 테이블 헤더 */}
          <MemberTableHeader tableName={MEMBER}/>
          {/* 테이블 데이터 */}
          <MemberTableData
              data={data}
              tableName={MEMBER}
          />
        </MemberTableList>

        {/* 신청 내역 리스트 */}
        <MemberTableList title="신청내역">
          {/* 테이블 헤더 */}
          <MemberTableHeader tableName={LEADER}/>
          {/* 테이블 데이터 */}
          <MemberTableData
              data={data}
              tableName={LEADER}
          />
        </MemberTableList>
      </>
  );
};

export default Page;