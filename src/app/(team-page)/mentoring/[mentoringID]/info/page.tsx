"use client";
import React from 'react';
import StatusButton from "@/app/(team-page)/components/StatusButton";
import useInfinitePosts from "@/hooks/useInfinitePosts";
import {getMentoringTeamInfo} from "@/service/api/team/getMentoringTeamInfo";

const Page = () => {
  const { fetchNextPage, hasNextPage, isFetchingNextPage, data } =
    useInfinitePosts({
      category: "mentoring",
      getPosts: getMentoringTeamInfo,
    });
  console.log(data)
  console.log(data?.pages)

  return (
    <div className="team-intro-container border rounded p-4">
      {/* 모집 상태 */}
      <StatusButton status={data?.pages[0]?.dto?.status}/>

      {/* 오른쪽 팀 정보 섹션 */}
      <div className="flex flex-col w-full md:w-3/4 pl-4">
        <h3 className="text-xl font-bold mb-6">팀 소개</h3>
        <div className="flex flex-col gap-4 mb-6">
          <div>
            <label className="block text-gray-600">시작일자</label>
            <p>{data?.pages[0]?.dto.startDate || "2025.01.01"}</p>
          </div>
          <div>
            <label className="block text-gray-600">종료일자</label>
            <p>{data?.pages[0]?.dto.endDate || "2025.04.01"}</p>
          </div>
          <div>
            <label className="block text-gray-600">모집인원</label>
            <p>{data?.pages[0]?.dto.mentoringCnt || "3명"}</p>
          </div>
          <div>
            <label className="block text-gray-600">연락방법</label>
            <p>{data?.pages[0]?.dto.link || "http://open.kakao.teaming..."}</p>
          </div>
          <div>
            <label className="block text-gray-600">모집마감일</label>
            <p>{data?.pages[0]?.dto.endDate || "2025.01.08"}</p>
          </div>
          <div>
            <label className="block text-gray-600">모집 분야</label>
            <p>{data?.pages[0]?.dto.categories?.join(", ") || "모집 카테고리"}</p>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-4">My Team 소개</h4>
          <p className="text-gray-800">
            {data?.pages[0]?.dto.content || "프로젝트 설명 프로젝트 설명 프로젝트 설명..."}
          </p>
        </div>
        {/* 수정하기 버튼 */}
        <div className="flex justify-center mt-8">
          <button className="bg-blue-500 text-white px-6 py-2 rounded">수정하기</button>
        </div>
      </div>
    </div>
  );
};

export default Page;
