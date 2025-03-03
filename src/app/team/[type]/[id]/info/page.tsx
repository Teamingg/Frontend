'use client';
import React from 'react';
import {getProjectInfo, getTeamInfo} from "@/service/api/projects";
import {useQuery} from "@tanstack/react-query";
import clsx from "clsx";
import ProjectInfo from "@/components/Team/ProjectInfo";
import MentoringInfo from "@/components/Team/MentoringInfo";

const Page = () => {
  const { data: projectData } = useQuery({
    queryKey: ["projectInfo"],
    queryFn: getProjectInfo });

  const { data: mentoringData } = useQuery({
    queryKey: ["mentoringInfo"],
    queryFn: getTeamInfo });

  const contentsWrap = clsx('mb-5')
  const subTitle = clsx('lg:text-xl md:text-lg text-base')

  return (
      <>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold">AI 기반 웹 서비스 개발 멘토링</h1>
            <p className="text-gray-600">팀 아이디 : PJT1</p>
          </div>
          <button className="px-4 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary">
            지원하기
          </button>
        </div>
        {projectData && <ProjectInfo data={projectData} />}
        {mentoringData && <MentoringInfo data={mentoringData} />}
      </>
  );
};

export default Page;