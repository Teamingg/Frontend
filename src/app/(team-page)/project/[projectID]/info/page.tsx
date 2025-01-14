"use client";
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {getMentoringTeamInfo} from "@/service/api/team/getMentoringTeamInfo";
import StatusButton from "@/app/(team-page)/components/StatusButton";

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
  const {
    data,
    error,
    isLoading} = useQuery<TeamInfo>({
    queryKey: ["id"],
    queryFn: getMentoringTeamInfo
  })
  console.log(data)

  return (
    <div className="team-intro-container border rounded p-4">
      {/* 모집 상태 */}
      <StatusButton status={data?.dto?.status}/>

      {/* 팀 소개 */}
      <div className="team-intro-section border-t mt-4 pt-4">
        <h2 className="text-lg font-bold mb-4">팀 소개</h2>

        {/* 날짜 정보 */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="info-item">
            <label className="block text-gray-600">시작일자</label>
            <p>2025.01.01</p>
          </div>
          <div className="info-item">
            <label className="block text-gray-600">종료일자</label>
            <p>2025.04.01</p>
          </div>
        </div>

        {/* 팀 정보 */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="info-item">
            <label className="block text-gray-600">모집인원</label>
            <p>5명</p>
          </div>
          <div className="info-item">
            <label className="block text-gray-600">연락방법</label>
            <p>https://open.kakao.teaming-1...</p>
          </div>
        </div>

        {/* 기술 스택 */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="info-item col-span-2">
            <label className="block text-gray-600">기술스택</label>
            <div className="flex space-x-2">
              <img src="/images/stack-icon1.png" alt="stack1" className="w-8 h-8" />
              <img src="/images/stack-icon2.png" alt="stack2" className="w-8 h-8" />
              <img src="/images/stack-icon3.png" alt="stack3" className="w-8 h-8" />
              <img src="/images/stack-icon4.png" alt="stack4" className="w-8 h-8" />
            </div>
          </div>
        </div>

        {/* 모집 구분 및 마감일 */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="info-item">
            <label className="block text-gray-600">모집구분</label>
            <p>프론트엔드 기획자</p>
          </div>
          <div className="info-item">
            <label className="block text-gray-600">모집마감일</label>
            <p>2025.01.08</p>
          </div>
        </div>
      </div>

      {/* My Team 소개 */}
      <div className="my-team-section border-t mt-4 pt-4">
        <h3 className="text-lg font-bold mb-4">My Team 소개</h3>
        <p className="text-gray-800">
          프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명
          프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명
          프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명
        </p>
      </div>

      {/* 수정하기 버튼 */}
      {/* 리더만 출력 */}
      <div className="edit-button-container flex justify-center mt-8">
        <button className="edit-button bg-blue-500 text-white py-2 px-6 rounded">수정하기</button>
      </div>
    </div>
  );
};

export default Page;
