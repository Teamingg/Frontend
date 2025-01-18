"use client";
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {getMentoringTeamPost} from "@/service/api/getMentoringTeamPost";
import PostPageContainer from "@/app/(team-page)/_components/PostPageContainer";

const Page = () => {
  const {data, error, isLoading} = useQuery({
    queryKey: ["page"],
    queryFn: getMentoringTeamPost
  });
  console.log(data);

  return (
    <PostPageContainer data={data}>
      <div>children</div>
    </PostPageContainer>
  );
};

export default Page;