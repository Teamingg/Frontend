'use client';
import React from 'react';
import {getTeamInfo} from "@/service/api/projects";
import {useQuery} from "@tanstack/react-query";
import Link from "next/link";
import ProjectTeamInfoTecStack from "@/app/team/_dump/[page_type]/[team_id]/info/_components/ProjectTeamInfoTecStack";
import clsx from "clsx";

const Page = () => {
  const {data} = useQuery({
    queryKey: ["info"],
    queryFn: getTeamInfo,
  });

  console.log('useQuery')
  console.log(data)
  const contentsWrap = clsx('mb-5')
  const subTitle = clsx('lg:text-xl md:text-lg text-base')

  return (
      <>
        <header className='mb-5'>
          <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold'>{data.projectName}</h2>
          <div>{data.status}</div>
        </header>
        <div className={`${contentsWrap} flex justify-between items-center`}>
          <h2 className={subTitle}>프로젝트 진행률</h2>
          <span className='lg:text-base text-sm'>{data.startDate} ~ {data.endDate}</span>
        </div>
        <div className={contentsWrap}>
          <h2 className={subTitle}>모집 마감일</h2>
        </div>
        <ProjectTeamInfoTecStack stacks={data.stacks ?? []}/>
        <div className={contentsWrap}>
          <h2 className={subTitle}>연락 방법</h2>
          <Link href={data.link}>Kakao</Link>
        </div>
        <div className={contentsWrap}>
          <h2 className={subTitle}>팀 소개</h2>
          <p>{data.contents}</p>
        </div>
      </>
  );
};

export default Page;