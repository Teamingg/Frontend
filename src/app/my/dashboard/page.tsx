import React from 'react';
import {queryclient} from "@/lib/getQueryClient";
import {myPageKeys} from "@/hooks/queries/my";
import {getMyInfo, getMyMentoringTeam, getMyProjectTeam} from "@/service/api/my";
import {dehydrate, HydrationBoundary} from "@tanstack/react-query";
import clsx from "clsx";

const Page = async () => {
  // 서버에서 데이터 직접 fetch
  const data = await queryclient.fetchQuery({
    queryKey: myPageKeys.info,
    queryFn: getMyInfo,
  });

  const mentoring = await queryclient.fetchQuery({
    queryKey: myPageKeys.team("mentoring"),
    queryFn: getMyMentoringTeam,
  });

  const projects = await queryclient.fetchQuery({
    queryKey: myPageKeys.team("project"),
    queryFn: getMyProjectTeam,
  });

  const mentee = mentoring.filter(item => item.authority === 'LEADER')
  const contentTitle = clsx('text-2xl');

  return (
      <HydrationBoundary state={dehydrate(queryclient)}>
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
            <p>{data.name}</p>
          </div>
          <div>
            <h4>이메일</h4>
            <p>{data.email}</p>
          </div>
          <div>
            <h4>소개</h4>
            <p>{data.introduce}</p>
          </div>
        </article>
        <article>
          <h3 className={contentTitle}>최근 활동</h3>
        </article>
      </HydrationBoundary>
  );
};

export default Page;