"use client";
import React from 'react';
import StatusButton from "@/app/(team-page)/_components/StatusButton";
import useInfinitePosts from "@/hooks/useInfinitePosts";
import {getMentoringTeamInfo} from "@/service/api/team/getMentoringTeamInfo";
import TeamInfoSection from "@/app/(team-page)/_components/TeamInfoSection";
import TeamDescription from "@/app/(team-page)/_components/TeamDescription";
import TeamInfoItem from "@/app/(team-page)/_components/TeamInfoItem";
import {useQuery} from "@tanstack/react-query";

interface MentoringInfo {
  data?: {
    dto: {
      status: string;
      startDate: string;
      endDate: string;
      mentoringCnt: number;
      link: string;
      categories: string[];
      content: string;
    };
  };
  error?: any;
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
    {
      label: "시작일자",
      infoData: data?.dto.startDate,
    },
    {
      label: "종료일자",
      infoData: data?.dto.endDate,
    },
    {
      label: "모집인원",
      infoData: data?.dto.mentoringCnt,
    },
    {
      label: "연락방법",
      infoData: data?.dto.link,
    },
    {
      label: "모집마감일",
      infoData: data?.dto.endDate,
    },
    {
      label: "모집 분야",
      infoData: data?.dto.categories?.join(", "),
    },
  ]

  return (
    <div className="border rounded p-4">
      {/*모집 상태*/}
      <StatusButton status={data?.dto?.status}/>

       {/*오른쪽 팀 정보 섹션*/}
      <TeamInfoSection>
        <ul className="flex flex-col gap-4 mb-6">
          {MENTORING_INFO_DATA.map(item => (
            <TeamInfoItem
              key={item.label}
              label={item.label}
              infoData={item.infoData}
              className={"flex justify-between items-center"}
            />
          ))}
        </ul>

        {/* My Team 소개*/}
        <TeamDescription content={data?.dto.content || "프로젝트 설명 ..."}/>

         {/*수정하기 버튼*/}
        <div className="flex justify-center mt-8">
          <button className="bg-blue-500 text-white px-6 py-2 rounded">수정하기</button>
        </div>
      </TeamInfoSection>
    </div>
  );
};

export default Page;
