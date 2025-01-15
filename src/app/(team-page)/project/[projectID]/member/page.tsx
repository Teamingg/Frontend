"use client";
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {getProjectTeamMember} from "@/service/api/getProjectTeamMember";

const Page = () => {
  // project/team/{team_id}/member
  const {data, error, isLoading} = useQuery({
    queryKey: ["page"],
    queryFn: getProjectTeamMember
  })
  return (
    <div>
      
    </div>
  );
};

export default Page;