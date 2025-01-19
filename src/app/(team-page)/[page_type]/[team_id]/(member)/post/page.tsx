"use client";
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {useParams} from "next/navigation";
import {fetchTeamPageData} from "@/service/api/team-page/fetchTeamPageData";
import PostCard from "@/app/(team-page)/[page_type]/[team_id]/(member)/post/_components/PostCard";
import PostSeeMoreBtn from "@/app/(team-page)/[page_type]/[team_id]/(member)/post/_components/PostSeeMoreBtn";
import Link from "next/link";

const Page = () => {
  const params = useParams();
  const {data, error, isLoading} = useQuery({
    queryKey: ["page"],
    queryFn: () => fetchTeamPageData(String(params.page_type), String(params.team_id), "posts")
  });

  // 로딩 및 에러처리
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  /*const MENTORING_POSTS = [
    { label: "title", postData: data?.title },
  ];

  const PROJECT_POSTS = [
    { label: "title", postData: data?.title },
  ];*/

  return (
      <>
        {/* 게시물이 존재한다면 출력, 없다면 X */}
        {data === null || data === undefined ? (
            <div className="text-center">
              <p>게시물이 없습니다.</p>
              <Link href={`/create/${params.page_type}/post`} className="text-blue-400">
                게시글 작성하러 가기
              </Link>
            </div>
        ) : (
            <>
              {/* contents */}
              <PostCard
                  title={"title"}
                  description={"description"}
                  startDate={"startDate"}
                  endDate={"endDate"}
                  tags={["tags"]}
                  team={"team"}
              />
              {/* 더보기 버튼 */}
              <PostSeeMoreBtn/>
            </>
        )}
      </>
  );
};

export default Page;