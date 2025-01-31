"use client";
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {useParams} from "next/navigation";
import {fetchTeamPageData} from "@/service/api/team-page/fetchTeamPageData";
import PostCard from "@/app/team/[page_type]/[team_id]/(member)/post/_components/PostCard";
import PostSeeMoreBtn from "@/app/team/[page_type]/[team_id]/(member)/post/_components/PostSeeMoreBtn";
import Link from "next/link";
import {MentoringPosts, ProjectPosts} from "@/app/team/_type/teamPagePosts";
import LoadingSpinner from "@/components/loading/LoadingSpinner";

const Page = () => {
  const params = useParams();
  const queryFn = fetchTeamPageData(String(params.page_type), String(params.team_id), "posts");

  const {data, error, isLoading} = useQuery({
    queryKey: ["posts"],
    queryFn: () => queryFn
  });

  // 로딩 및 에러처리
  if (isLoading) return <LoadingSpinner/>;
  if (error) return <div>Error fetching data</div>;

  // 타입 가드
  const isMentoringPosts = (data: unknown): data is MentoringPosts[] => {
    return typeof data === "object" && data !== null && "boardId" in data;
  }

  // 데이터가 없을 경우
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return (
        <div className="h-full flex flex-col justify-center items-center">
          <p>게시물이 없습니다.</p>
          <Link href={`/create/${params.page_type}/post`} className="text-blue-400">
            게시글 작성하러 가기
          </Link>
        </div>
    )
  }

  // ProjectPosts 일 경우 타입 지정 후 렌더링
  // isMentoringPosts() => false
  // 5개의 데이터만 출력
  if (!isMentoringPosts(data)) {
    const projectPosts = data as ProjectPosts[];
    return (
        <div className="h-full flex flex-col">
          <Link
              href={`/create/${params.page_type}/post`}
              className="block mb-5 text-right text-blue-400">
            게시글 작성하러 가기
          </Link>
          {/* contents */}
          <div className="h-full overflow-y-scroll">
            {projectPosts.slice(0, 5).map((item, idx) => (
                <PostCard
                    key={idx}
                    title={item.title}
                    description={item.contents}
                    startDate={item.startDate}
                    endDate={item.endDate}
                    tags={item.stacks}
                    team={item.teamName}
                />
            ))}
          </div>
          {/* 더보기 버튼 */}
          <PostSeeMoreBtn/>
        </div>
    )
  }

  // MentoringPosts 일 경우
  // isMentoringPosts() => true
  // 5개의 데이터만 출력
  return (
      <div className="h-full flex flex-col">
        <Link
            href={`/create/${params.page_type}/post`}
            className="block mb-5 text-right text-blue-400">
          게시글 작성하러 가기
        </Link>
        {/* contents */}
        <div className="h-full overflow-y-scroll">
          {data.slice(0, 5).map((item, idx) => (
              <PostCard
                  key={idx}
                  title={item.title}
                  description={item.contents}
                  startDate={item.startDate}
                  endDate={item.endDate}
                  team={item.mentoringTeamName}
              />
          ))}
        </div>
        {/* 더보기 버튼 */}
        <PostSeeMoreBtn/>
      </div>
  );
};

export default Page;