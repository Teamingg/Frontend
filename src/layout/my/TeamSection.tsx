'use client';
import {ReactNode} from "react";
import Link from "next/link";

export const TeamSection = ({
  title,
  isEmpty,
  pageType,
  children,
}: {
  title: string,
  isEmpty: boolean;
  pageType: "project" | "mentoring";
  children: ReactNode;
}) => {
  return (
      <article className="w-full p-8 bg-white rounded-xl">
        <h3 className="mb-4 text-2xl font-bold">{title}</h3>
        {!isEmpty ? (
            <ul className='grid grid-cols-2 lg:grid-cols-4 gap-2'>
              {children}
            </ul>
        ) : (
            <div className="text-center my-10">
              <p className="text-gray-500 mb-4">{title}가 존재하지 않습니다.</p>
              <div className="flex justify-center gap-4">
                <Link
                    href={`/form/create/${pageType}`}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  {pageType === "project" ? "프로젝트 생성하기" : "멘토링 생성하기"}
                </Link>
                <Link
                    href={`/${pageType}`}
                    className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-100">
                  {pageType === "project" ? "프로젝트 참가하기" : "멘토링 참가하기"}
                </Link>
              </div>
            </div>
        )}
      </article>
  );
};