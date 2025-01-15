"use client";
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {getMentoringTeamPost} from "@/service/api/getMentoringTeamPost";

const Page = () => {
  // mentoring/teams/{team_id}/posts
  const {data, error, isLoading} = useQuery({
    queryKey: ["page"],
    queryFn: getMentoringTeamPost
  });
  console.log(data)

  return (
    /* 게시물이 존재한다면 출력, 없다면 X */
    <div>
      <a><span>더보기</span></a>
    </div>
  );
};

export default Page;