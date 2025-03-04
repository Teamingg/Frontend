import React, {ReactNode} from 'react';
import {dehydrate, HydrationBoundary} from "@tanstack/react-query";
import {queryclient} from "@/lib/getQueryClient";
import {getTeamPosts} from "@/service/api/team";

const Layout = async ({
  children,
  params,
} : {
  children: ReactNode;
  params: Promise<{ type: string; id: string; }>;
}) => {
  const { type, id } = await params;

  if (type === 'project') {
    await queryclient.prefetchQuery({
      queryKey: ["mentoringPost", id],
      queryFn: () => getTeamPosts(type, id),
    });
  } else if (type === 'mentoring') {
    await queryclient.prefetchQuery({
      queryKey: ["mentoringPost", id],
      queryFn: () => getTeamPosts(type,id),
    });
  }

  return (
      <HydrationBoundary state={dehydrate(queryclient)}>
        {children}
      </HydrationBoundary>
  );
};

export default Layout;