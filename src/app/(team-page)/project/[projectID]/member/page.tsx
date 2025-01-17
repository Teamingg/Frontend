"use client";
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {getProjectTeamMember} from "@/service/api/getProjectTeamMember";
import MemberTable from "@/app/(team-page)/_components/MemberTable";

const Page = () => {
  // project/team/{team_id}/member
  const {data, error, isLoading} = useQuery({
    queryKey: ["page"],
    queryFn: getProjectTeamMember
  })

  return (
    <MemberTable/>
  );
};

export default Page;