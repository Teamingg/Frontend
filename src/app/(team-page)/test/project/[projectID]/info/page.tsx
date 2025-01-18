"use client";
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {getProjectTeamInfo} from "@/service/api/team/getProjectTeamInfo";
import TeamPageInfo from "@/app/(team-page)/_components/TeamPageInfo";

interface TeamInfo {
  projectId: number;
  startDate: string;
  endDate: string;
  content: string;
  categories: string[];
  link: string;
  memberCnt: number;
  projectName: string;
  status: string;
  stacks: string[];
}

const Page = () => {
  const {
    data,
    error,
    isLoading
  } = useQuery<TeamInfo>({
    queryKey: ["projectId"],
    queryFn: getProjectTeamInfo
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (!data) return <div>No Data Available</div>;
  console.log("data", data);
  const TEAM_INFO_ITEMS = [
    {label: "시작일자", infoData: data?.startDate, stacks: undefined},
    {label: "종료일자", infoData: data?.endDate, stacks: undefined},
    {label: "모집인원", infoData: `${data?.memberCnt} 명`, stacks: undefined},
    {label: "연락방법", infoData: data?.link, stacks: undefined},
    {label: "기술스택", infoData: undefined, stacks: data?.stacks},
    {label: "모집구분", infoData: "프론트엔드 기획자"},
    {label: "모집마감일", infoData: data?.endDate, stacks: undefined},
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
