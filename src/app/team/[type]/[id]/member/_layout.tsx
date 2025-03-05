/*
import React, {ReactNode} from 'react';
import {dehydrate, HydrationBoundary} from "@tanstack/react-query";
import {queryclient} from "@/lib/getQueryClient";
import {getMentoringPost, getProjectPost} from "@/service/api/post";
import {getTeamMembers} from "@/service/api/team";

const _layout = async ({
  children,
  params,
} : {
  children: ReactNode;
  params: Promise<{ type: string; id: string; }>;
}) => {
  const { type, id } = await params;
  if (type === 'project') {
    await queryclient.prefetchQuery({
      queryKey: ["projectMember", id],
      queryFn: () => getTeamMembers(type, id),
    });
  } else if (type === 'mentoring') {
    await queryclient.prefetchQuery({
      queryKey: ["mentoringMember", id],
      queryFn: () => getTeamMembers(type, id),
    });
  }
  
  /!*const data = await queryclient.fetchQuery({
    queryKey: ['projectMember', id],
    queryFn: () => getTeamMembers(type, id),
  })
  console.log(data)*!/

  return (
      <HydrationBoundary state={dehydrate(queryclient)}>
        {children}
      </HydrationBoundary>
  );
};

export default _layout;*/
import React from 'react';

const _layout = () => {
  return (
    <div>
      
    </div>
  );
};

export default _layout;