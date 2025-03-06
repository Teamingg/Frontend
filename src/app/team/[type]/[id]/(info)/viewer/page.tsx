'use client'
import React from 'react';
import {useParams} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {getProjectInfo, getTeamInfo} from "@/service/api/team";
import {MentoringInfo, ProjectInfo} from "@/components/Team";

const Page = () => {
  const { type, id } = useParams();
  const teamId = id.slice(0, -2) as string;
  const {
    data: projectData,
    isLoading: isProjectLoading,
    isError: isProjectError,
  } = useQuery({
    queryKey: ["projectInfo", id],
    queryFn: () => getProjectInfo(teamId),
    enabled: type === "project",});
  
  const {
    data: mentoringData,
    isLoading: isMentoringLoading,
    isError: isMentoringError,
  } = useQuery({
    queryKey: ["mentoringInfo", id],
    queryFn: () => getTeamInfo(teamId),
    enabled: type === "mentoring",
  });
  
  // 로딩 상태 처리
  if (isProjectLoading || isMentoringLoading) {
    return <p className="text-center text-gray-600">로딩 중...</p>;
  }
  
  // 에러 상태 처리
  if (isProjectError || isMentoringError) {
    return <p className="text-center text-red-500">데이터를 불러오는 중 오류가 발생했습니다.</p>;
  }
  
  // 데이터가 없을 경우 처리
  if (!projectData && !mentoringData) {
    return <p className="text-center text-gray-500">해당 정보를 찾을 수 없습니다.</p>;
  }
  
  const title =
    type === "project"
      ? projectData?.projectName || "프로젝트 정보 없음"
      : mentoringData?.dto?.teamName || "멘토링 정보 없음";
  
  return (
      <>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="pb-2 text-3xl font-bold">{title}</h1>
            <p className="text-gray-600">
              팀 아이디 : {type === 'project' ? 'P' : 'M'}{id}
            </p>
          </div>
          <button className="hidden px-4 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary">
            지원하기
          </button>
        </div>
        {type === 'project' && <ProjectInfo data={projectData} />}
        {type === 'mentoring' && <MentoringInfo data={mentoringData} />}
      </>
  );
};

export default Page;