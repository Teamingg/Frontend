import {ReactNode} from 'react';
import {queryclient} from "@/lib/getQueryClient";
import {getProjectInfo, getTeamInfo} from "@/service/api/team";
import {dehydrate, HydrationBoundary} from "@tanstack/react-query";

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
      <HydrationBoundary state={dehydrate(queryclient)}>
        {children}
      </HydrationBoundary>
  );
};

export default Layout;