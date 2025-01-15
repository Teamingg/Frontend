"use client";
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {getMentoringTeamMembers} from "@/service/api/getMentoringTeamMembers";

const Page = () => {
  // mentoring/teams/{team_id}/status
  const {data, error, isLoading} = useQuery({
    queryKey: ["page"],
    queryFn: getMentoringTeamMembers
  })

  console.log(data)
  return (
    <div>
      
    </div>
  );
};

export default Page;