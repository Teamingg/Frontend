"use client";
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {getMentoringTeamInfo} from "@/service/api/team/getMentoringTeamInfo";
import StatusButton from "@/app/(team-page)/components/StatusButton";
import TeamInfoSection from "@/app/(team-page)/components/TeamInfoSection";
import TeamDescription from "@/app/(team-page)/components/TeamDescription";
import ProjectTeamInfoTecStack from "@/app/(team-page)/components/ProjectTeamInfoTecStack";
import TeamInfoItem from "@/app/(team-page)/components/TeamInfoItem";

interface TeamInfo {
  categories: string[];
  content: string;
  endDate: string;
  id: number;
  link: string;
  mentoringCnt: number;
  name: string;
  startDate: string;
  status: string;
}

const Page = () => {
  // project/team/{team_id}
  const {
    data,
    error,
    isLoading
  } = useQuery<TeamInfo>({
    queryKey: ["id"],
    queryFn: getMentoringTeamInfo
  })
  console.log(data)

  const teamInfoItems = [
    { label: "시작일자", infoData: data?.dto.startDate },
    { label: "종료일자", infoData: data?.dto.endDate },
    { label: "모집인원", infoData: `${data?.dto.mentoringCnt} 명` },
    { label: "연락방법", infoData: data?.dto.link },
    { label: "기술스택", infoData: null },
    { label: "모집구분", infoData: "프론트엔드 기획자" },
    { label: "모집마감일", infoData: data?.dto.endDate },
  ];

  return (
    <div className="h-full p-4 border rounded bg-white">
      {/* 모집 상태 */}
      <StatusButton status={data?.dto?.status}/>

      {/* 팀 소개 */}
      <TeamInfoSection>
        <ul className="flex flex-col gap-4 mb-6">
          {teamInfoItems.map((item) => {
            if (item.label !== "기술스택") {
              return (
                <TeamInfoItem
                  key={item.label}
                  label={item.label}
                  infoData={item.infoData}
                  className={"flex justify-between items-center"}
                />
              )
            } else {
              return (
                <ProjectTeamInfoTecStack key={item.label}/>
              )
            }
          })}
        </ul>

        {/* My Team 소개 */}
        <TeamDescription content={data?.dto.content}/>

        {/* 수정하기 버튼 */}
        {/* 리더만 출력 */}
        <div className="flex justify-end mt-8">
          <button className="bg-blue-500 text-white py-2 px-6 rounded">수정하기</button>
        </div>
      </TeamInfoSection>
    </div>
  );
};

export default Page;
