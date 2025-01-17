"use client";
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {getMentoringTeamMembers} from "@/service/api/getMentoringTeamMembers";
import MemberTable from "@/app/(team-page)/_components/MemberTable";

const Page = () => {
  // mentoring/teams/{team_id}/status
  const {data, error, isLoading} = useQuery({
    queryKey: ["page"],
    queryFn: getMentoringTeamMembers
  })

  return (
    <MemberTable/>
  );
};

export default Page;