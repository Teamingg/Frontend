import React from 'react';
import {dehydrate, HydrationBoundary} from "@tanstack/react-query";
import {queryclient} from "@/lib/getQueryClient";
import {getProjectMembers, getTeamMembers} from "@/service/api/team";

const LayoutDump = async ({
  children,
  params,
} : {
  children: React.ReactNode;
  params: Promise<{ type: string; id: string; }>;
}) => {
  const {type, id} = await params;
  if (type === 'project') {
    await Promise.all([
      queryclient.prefetchQuery({
        queryKey: ["projectMemberStatus", id],
        queryFn: () => getTeamMembers(type, id),
      }),
      
      queryclient.prefetchQuery({
        queryKey: ["projectMember", id],
        queryFn: () => getProjectMembers(id),
      })
    ]);
  } else if (type === 'mentoring') {
    await queryclient.prefetchQuery({
      queryKey: ["mentoringMember", id],
      queryFn: () => getTeamMembers(type, id),
    });
  }
  
  return (
    <HydrationBoundary state={dehydrate(queryclient)}>
      {children}
    </HydrationBoundary>
  );
};

export default LayoutDump;