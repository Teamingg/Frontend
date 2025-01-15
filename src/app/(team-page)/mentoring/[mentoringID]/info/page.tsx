"use client";
import React from 'react';
import StatusButton from "@/app/(team-page)/components/StatusButton";
import useInfinitePosts from "@/hooks/useInfinitePosts";
import {getMentoringTeamInfo} from "@/service/api/team/getMentoringTeamInfo";
import TeamInfoSection from "@/app/(team-page)/components/TeamInfoSection";
import TeamDescription from "@/app/(team-page)/components/TeamDescription";
import TeamInfoItem from "@/app/(team-page)/components/TeamInfoItem";

const Page = () => {
  // mentoring
  const {fetchNextPage, hasNextPage, isFetchingNextPage, data} =
    useInfinitePosts({
      category: "mentoring",
      getPosts: getMentoringTeamInfo,
    });
  console.log(data)
  console.log(data?.pages)

  const MENTORING_INFO_DATA = [
    {
      label: "시작일자",
      infoData: data?.pages[0]?.dto.startDate,
    },
    {
      label: "종료일자",
      infoData: data?.pages[0]?.dto.endDate,
    },
    {
      label: "모집인원",
      infoData: data?.pages[0]?.dto.mentoringCnt,
    },
    {
      label: "연락방법",
      infoData: data?.pages[0]?.dto.link,
    },
    {
      label: "모집마감일",
      infoData: data?.pages[0]?.dto.endDate,
    },
    {
      label: "모집 분야",
      infoData: data?.pages[0]?.dto.categories?.join(", "),
    },
  ]

  return (
    <div className="team-intro-container border rounded p-4">
      {/* 모집 상태 */}
      <StatusButton status={data?.pages[0]?.dto?.status}/>

      {/* 오른쪽 팀 정보 섹션 */}
      <TeamInfoSection>
        <ul className="flex flex-col gap-4 mb-6">
          {MENTORING_INFO_DATA.map(item => (
            <TeamInfoItem
              key={item.label}
              label={item.label}
              infoData={item.infoData}
              className={"flex justify-between"}
            />
          ))}
        </ul>

        {/* My Team 소개 */}
        <TeamDescription content={data?.pages[0]?.dto.content || "프로젝트 설명 ..."}/>

        {/* 수정하기 버튼 */}
        <div className="flex justify-center mt-8">
          <button className="bg-blue-500 text-white px-6 py-2 rounded">수정하기</button>
        </div>
      </TeamInfoSection>
    </div>
  );
};

export default Page;
