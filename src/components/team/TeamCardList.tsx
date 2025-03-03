'use client';
import React from 'react';
import Link from "next/link";

const TeamCardList = ({
  title,
  status,
  start,
  end,
  pageType,
  teamId
} : {
  title: string;
  status: string;
  start: string;
  end: string;
  pageType: string;
  teamId: string;
}) => {
  return (
      <li className='col-span-1 rounded-lg border border-gray-200'>
        <Link href={`/team/${pageType}/${teamId}/info`}>
          <div className='p-4 border-b border-b-gray-200'>
            <h4 className='flex justify-between items-center text-xl'>
              <span>{title}</span>
              <span className='p-1 text-xs bg-green-200 rounded-lg'>완료</span>
            </h4>
          </div>
          <div className='p-4'>
            <p>시작일</p>
            <p>{start}</p>
          </div>
          <div className='p-4'>
            <p>종료 예정일</p>
            <p>{end}</p>
          </div>
          <div className='p-4 border-b border-b-gray-200'>
            <p>소개</p>
            <p>프로젝트 진행률</p>
          </div>
        </Link>
      </li>
  );
};

export default TeamCardList;