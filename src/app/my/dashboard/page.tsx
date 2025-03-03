'use client';
import React from 'react';
import {myPageKeys} from "@/hooks/queries/my";
import {getMyInfo, getMyMentoringTeam, getMyProjectTeam} from "@/service/api/my";
import {useQuery} from "@tanstack/react-query";
import clsx from "clsx";

const Page = () => {
  const { data: info, isLoading } = useQuery({
    queryKey: myPageKeys.info,
    queryFn: getMyInfo,
  });

  const { data: mentoring } = useQuery({
    queryKey: myPageKeys.team("mentoring"),
    queryFn: getMyMentoringTeam,
  });

  const { data: projects } = useQuery({
    queryKey: myPageKeys.team("project"),
    queryFn: getMyProjectTeam,
  });

  if (isLoading) return <div>loading</div>

  const mentee = mentoring.filter(item => item.authority === 'LEADER')
  const contentTitle = clsx('text-2xl');

  return (
        <>
          <article>
            <h3 className={contentTitle}>대시 보드</h3>
            <div className='grid grid-cols-2 grid-rows-2 gap-3'>
              <div>
                <p>진행 중인 프로젝트</p>
                <p>{projects.length}</p>
                <p>팀 프로젝트</p>
              </div>
              <div>
                <p>멘토링 세션</p>
                <p>{mentoring.length}</p>
                <p>총 진행한 멘토링 세션</p>
              </div>
              <div>
                <p>멘티</p>
                <p>{mentee.length}</p>
                <p>현재 멘토링 중</p>
              </div>
            </div>
          </article>
          <article>
            <div className='flex justify-between items-center'>
              <h3 className={contentTitle}>계정 정보</h3>
              <p>수정하기</p>
            </div>
            <div>
              <h4>이름</h4>
              <p>{info.name}</p>
            </div>
            <div>
              <h4>이메일</h4>
              <p>{info.email}</p>
            </div>
            <div>
              <h4>소개</h4>
              <p>{info.introduce}</p>
            </div>
          </article>
          <article>
            <h3 className={contentTitle}>최근 활동</h3>
          </article>
        </>
  );
};

export default Page;