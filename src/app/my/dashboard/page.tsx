'use client';
import React from 'react';
import {myPageKeys} from "@/hooks/queries/my";
import {getMyInfo, getMyMentoringTeam, getMyProjectTeam} from "@/service/api/my";
import {useQuery} from "@tanstack/react-query";
import clsx from "clsx";
import Link from "next/link";
import {VscGithubProject} from "react-icons/vsc";
import {PiStudentBold} from "react-icons/pi";
import {FaChalkboardTeacher} from "react-icons/fa";
import ReviewCard from "@/components/Card/ReviewCard";

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
  return (
        <>
          <article className="mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 진행 중인 프로젝트 카드 */}
            <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
              <VscGithubProject className='w-12 h-12 text-blue-500 bg-blue-100 p-3 rounded-full'/>
              <h4 className="text-xl font-bold mt-3">{projects.length}</h4>
              <p className="text-gray-600 text-sm">진행 중인 프로젝트</p>
            </div>

            {/* 멘토링 세션 카드 */}
            <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
              <FaChalkboardTeacher className="w-12 h-12 text-green-500 text-4xl bg-green-100 p-3 rounded-full" />
              <h4 className="text-xl font-bold mt-3">{mentoring.length}</h4>
              <p className="text-gray-600 text-sm">총 진행한 멘토링 세션</p>
            </div>

            {/* 멘티 카드 */}
            <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
              <PiStudentBold className="w-12 h-12 text-yellow-500 bg-yellow-100 p-3 rounded-full"/>
              <h4 className="text-xl font-bold mt-3">{mentee.length}</h4>
              <p className="text-gray-600 text-sm">현재 멘토링 중</p>
            </div>
          </article>

          <article className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">내 프로필 정보</h2>
              <Link href="/my/dashboard" className="text-blue-500 text-sm hover:underline">수정하기</Link>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-gray-500 text-sm">이름 (닉네임)</p>
                <p className="font-medium">{info.name}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">이메일</p>
                <p className="font-medium">{info.email}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">분야</p>
                <p className="font-medium">웹 개발 / UX 디자인</p>
              </div>
              {/*<div>
                <p className="text-gray-500 text-sm">경력</p>
                <p className="font-medium">5년</p>
              </div>*/}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-gray-500 text-sm">소개</p>
              <p className="font-medium text-gray-700 leading-relaxed">
                {info.introduce}
              </p>
            </div>
          </article>
          {/*<article>
            <h3 className={contentTitle}>최근 활동</h3>
          </article>*/}
        </>
  );
};

export default Page;