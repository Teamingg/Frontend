"use client";
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {getMentoringTeamPost} from "@/service/api/getMentoringTeamPost";
import PostCard from "@/app/(team-page)/components/PostCard";

const Page = () => {
  // project/posts/{team_id}
  const {data, error, isLoading} = useQuery({
    queryKey: ["page"],
    queryFn: getMentoringTeamPost
  });
  console.log(data);
  return (
    /* 게시물이 존재한다면 출력, 없다면 X */
    <div className="h-full p-5 bg-white">
      <PostCard
        title={"title"}
        description={"description"}
        dateRange={"dateRange"}
        tags={["tags"]}
        team={"team"}
      />
      {(data === null || data === undefined) && <div>게시물이 없습니다.</div>}
      <a><span>더보기</span></a>
    </div>
  );
};

export default Page;