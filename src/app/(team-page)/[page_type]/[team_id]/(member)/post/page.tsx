"use client";
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {useParams} from "next/navigation";
import {fetchTeamPageData} from "@/service/api/team-page/fetchTeamPageData";
import PostCard from "@/app/(team-page)/[page_type]/[team_id]/(member)/post/_components/PostCard";
import PostSeeMoreBtn from "@/app/(team-page)/[page_type]/[team_id]/(member)/post/_components/PostSeeMoreBtn";
import Link from "next/link";
import {MentoringPosts, ProjectPosts} from "@/app/(team-page)/[page_type]/[team_id]/(member)/_type/teamPagePosts";

// Todo : 게시글 작성 버튼 추가 필요
const Page = () => {
  const params = useParams();
  const queryFn = fetchTeamPageData(String(params.page_type), String(params.team_id), "posts");

  const {data, error, isLoading} = useQuery({
    queryKey: ["page"],
    queryFn: () => queryFn
  });

  // 로딩 및 에러처리
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  // 타입 가드
  const isMentoringPosts = (data: unknown): data is MentoringPosts[] => {
    return typeof data === "object" && data !== null && "boardId" in data;
  }

  // 데이터가 없을 경우
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return (
        <div className="text-center">
          <p>게시물이 없습니다.</p>
          <Link href={`/create/${params.page_type}/post`} className="text-blue-400">
            게시글 작성하러 가기
          </Link>
        </div>
    )
  }

  // ProjectPosts 일 경우 타입 지정 후 렌더링
  // isMentoringPosts() => false
  if (!isMentoringPosts(data)) {
    const projectPosts = data as ProjectPosts[];
    return (
        <>
          {/* contents */}
          {projectPosts.map((item, idx) => (
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
          {/* 더보기 버튼 */}
          <PostSeeMoreBtn/>
        </>
    )
  }

  // MentoringPosts 일 경우
  // isMentoringPosts() => true
  return (
      <>
        {/* contents */}
        {data.map((item, idx) => (
            <PostCard
                key={idx}
                title={item.title}
                description={item.contents}
                startDate={item.startDate}
                endDate={item.endDate}
                team={item.mentoringTeamName}
            />
        ))}
        {/* 더보기 버튼 */}
        <PostSeeMoreBtn/>
      </>
  );
};

export default Page;