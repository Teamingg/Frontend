"use client";
import React from 'react';
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getProjectTeamInfo} from "@/service/api/team/getProjectTeamInfo";
import TeamPageInfo from "@/app/(team-page)/_components/TeamPageInfo";
import {useParams} from "next/navigation";

interface ProjectInfo {
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

interface MentoringInfo {
  dto: {
    status: string;
    startDate: string;
    endDate: string;
    mentoringCnt: number;
    link: string;
    categories: string[];
    content: string;
  };
  error?: never;
  isLoading: boolean;
}

interface TeamInfoItem {
  label: string;
  infoData?: string | number;
  stacks?: string[] | undefined;
}

const Page = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["teamInfo", params.page_type, params.team_id]);
  console.log(data);

  if (!data) return <div>No Data Available</div>;

  let teamInfoData: TeamInfoItem[] = [];

  if ("dto" in data) {
    teamInfoData = [
      { label: "시작일자", infoData: data?.dto.startDate, },
      { label: "종료일자", infoData: data?.dto.endDate, },
      { label: "모집인원", infoData: data?.dto.mentoringCnt, },
      { label: "연락방법", infoData: data?.dto.link, },
      { label: "모집마감일", infoData: data?.dto.endDate, },
      { label: "모집 분야", infoData: data?.dto.categories?.join(", "), },
    ]
  } else {
    teamInfoData = [
      {label: "시작일자", infoData: data?.startDate, stacks: undefined},
      {label: "종료일자", infoData: data?.endDate, stacks: undefined},
      {label: "모집인원", infoData: `${data?.memberCnt} 명`, stacks: undefined},
      {label: "연락방법", infoData: data?.link, stacks: undefined},
      {label: "기술스택", infoData: undefined, stacks: data?.stacks},
      {label: "모집구분", infoData: "프론트엔드 기획자"},
      {label: "모집마감일", infoData: data?.endDate, stacks: undefined},
    ]
  }

  /*const PROJECT_INFO: TeamInfoItem[] = [
    {label: "시작일자", infoData: data?.startDate, stacks: undefined},
    {label: "종료일자", infoData: data?.endDate, stacks: undefined},
    {label: "모집인원", infoData: `${data?.memberCnt} 명`, stacks: undefined},
    {label: "연락방법", infoData: data?.link, stacks: undefined},
    {label: "기술스택", infoData: undefined, stacks: data?.stacks},
    {label: "모집구분", infoData: "프론트엔드 기획자"},
    {label: "모집마감일", infoData: data?.endDate, stacks: undefined},
  ];

  const MENTORING_INFO: TeamInfoItem[] = [
    { label: "시작일자", infoData: data?.dto.startDate, },
    { label: "종료일자", infoData: data?.dto.endDate, },
    { label: "모집인원", infoData: data?.dto.mentoringCnt, },
    { label: "연락방법", infoData: data?.dto.link, },
    { label: "모집마감일", infoData: data?.dto.endDate, },
    { label: "모집 분야", infoData: data?.dto.categories?.join(", "), },
  ];*/

  return (
      <TeamPageInfo
          status={"dto" in data ? data.dto.status : data.status}
          infoData={teamInfoData}
          content={"dto" in data ? data.dto.content : data.content}
          authority={"LEADER"}
      />
  );
};

export default Page;
