'use client'
import {ReactNode} from 'react';
import dynamic from 'next/dynamic';
import {queryclient} from "@/lib/getQueryClient";
import {getProjectInfo, getTeamInfo} from "@/service/api/team";

const HydrationBoundary = dynamic(() => import("@tanstack/react-query").then(mod => mod.HydrationBoundary), {
  ssr: false
});

const Layout = async ({
  children,
  params,
} : {
  children: ReactNode;
  params: Promise<{ type: string; id: string; }>;
}) => {
  const { type, id } = await params;
  if (type === "project") {
    await queryclient.prefetchQuery({
      queryKey: ["projectInfo", id],
      queryFn: () => getProjectInfo(id),
    });
  } else if (type === 'mentoring') {
    await queryclient.prefetchQuery({
      queryKey: ["mentoringInfo", id],
      queryFn: () => getTeamInfo(id),
    });
  }

  return (
      <HydrationBoundary state={queryclient}>
        {children}
      </HydrationBoundary>
  );
};

export default Layout;