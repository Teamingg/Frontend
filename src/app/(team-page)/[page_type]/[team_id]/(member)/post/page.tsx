"use client";
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import PostPageContainer from "@/app/(team-page)/[page_type]/[team_id]/(member)/post/_components/PostPageContainer";
import {useParams} from "next/navigation";
import {fetchTeamPageData} from "@/service/api/team-page/fetchTeamPageData";

const Page = () => {
  const params = useParams();
  const {data, error, isLoading} = useQuery({
    queryKey: ["page"],
    queryFn: () => fetchTeamPageData(String(params.page_type), String(params.team_id), "posts")
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