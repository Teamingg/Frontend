"use client";
import React from 'react';
import {getMentoringTeamInfo} from "@/service/api/team/getMentoringTeamInfo";
import {useQuery} from "@tanstack/react-query";
import TeamPageInfo from "@/app/(team-page)/_components/TeamPageInfo";

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

const Page = () => {
  const {data, error, isLoading} = useQuery<MentoringInfo>({
    queryKey: ["mentoring"],
    queryFn: getMentoringTeamInfo
  });
  console.log(data)
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (!data) return <div>No Data Available</div>;

  const MENTORING_INFO_DATA = [
    { label: "시작일자", infoData: data?.dto.startDate, },
    { label: "종료일자", infoData: data?.dto.endDate, },
    { label: "모집인원", infoData: data?.dto.mentoringCnt, },
    { label: "연락방법", infoData: data?.dto.link, },
    { label: "모집마감일", infoData: data?.dto.endDate, },
    { label: "모집 분야", infoData: data?.dto.categories?.join(", "), },
  ];

  return (
    <TeamPageInfo
      status={data?.dto.status}
      infoData={MENTORING_INFO_DATA}
      content={data?.dto.content}
      authority={"LEADER"}
    />
  );
};

export default Page;
