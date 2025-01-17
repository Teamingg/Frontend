"use client";
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {getProjectTeamInfo} from "@/service/api/team/getProjectTeamInfo";
import TeamPageInfo from "@/app/(team-page)/_components/TeamPageInfo";

interface TeamInfo {
  data?: {
    categories: string[];
    content: string;
    endDate: string;
    id: number;
    link: string;
    mentoringCnt: number;
    name: string;
    createDate: string;
    status: string;
  }
}

const Page = () => {
  const {
    data,
    error,
    isLoading
  } = useQuery<TeamInfo>({
    queryKey: ["id"],
    queryFn: getProjectTeamInfo
  });
  console.log(data)
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (!data) return <div>No Data Available</div>;

  const TEAM_INFO_ITEMS = [
    { label: "시작일자", infoData: data?.createDate },
    { label: "종료일자", infoData: data?.endDate },
    { label: "모집인원", infoData: `${data?.memberCnt} 명` },
    { label: "연락방법", infoData: data?.link },
    { label: "기술스택", infoData: 1 },
    { label: "모집구분", infoData: "프론트엔드 기획자" },
    { label: "모집마감일", infoData: data?.endDate },
  ];

  return (
    <TeamPageInfo
      status={data?.status}
      infoData={TEAM_INFO_ITEMS}
      content={data?.content}
      authority={"LEADER"}
    />
  );
};

export default Page;
