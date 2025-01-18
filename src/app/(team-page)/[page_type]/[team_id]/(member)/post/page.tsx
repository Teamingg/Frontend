"use client";
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import PostPageContainer from "@/app/(team-page)/[page_type]/[team_id]/(member)/post/_components/PostPageContainer";
import {getTeamPosts} from "@/service/api/team-page/getTeamPosts";
import {useParams} from "next/navigation";

interface MentoringPosts {
  "boardId": number,
  "title": string,
  "mentoringTeamName": string,
  "startDate": string,
  "endDate": string,
  "category": string[],
  "contents": string,
  "status": string, //"RECRUITING"
}

interface ProjectPosts {
  "title": string,
  "teamName": string,
  "startDate": string,
  "endDate": string,
  "contents": string,
  "status": string, //"RECRUITING",
  "projectTeamId": number,
  "postId": number,
  "createdDate": string,
  "stacks": string[],
}

const Page = () => {
  const params = useParams();
  const {data, error, isLoading} = useQuery({
    queryKey: ["page"],
    queryFn: getTeamPosts
  });

  // 로딩 및 에러처리
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  console.log(data);

  return (
    <PostPageContainer data={data}>
      <div>children</div>
    </PostPageContainer>
  );
};

export default Page;