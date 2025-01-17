"use client";
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {getMentoringTeamPost} from "@/service/api/getMentoringTeamPost";
import PostSeeMoreBtn from "@/app/(team-page)/_components/PostSeeMoreBtn";
import PostPageContainer from "@/app/(team-page)/_components/PostPageContainer";

const Page = () => {
  // mentoring/teams/{team_id}/posts
  const {data, error, isLoading} = useQuery({
    queryKey: ["page"],
    queryFn: getMentoringTeamPost
  });
  console.log(data)

  return (
    <PostPageContainer data={data}>
      <div>children</div>
    </PostPageContainer>
  );
};

export default Page;