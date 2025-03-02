import {ReactNode} from 'react';
import {queryclient} from "@/lib/getQueryClient";
import {getTeamInfo} from "@/service/api/projects";
import {dehydrate, HydrationBoundary} from "@tanstack/react-query";

const Layout = async ({
  children,
  //params,
} : {
  children: ReactNode;
  // params: Promise<{ page_type: string, team_id: string }>
  //params: Promise<{ type: string; id: string; }>;
}) => {
  //const { type, id } = await params;

  /*await queryclient.prefetchQuery({
    queryKey: ["info"],
    queryFn: getTeamInfo,
  });*/

  const result = await queryclient.prefetchQuery({
    queryKey: ["info"],
    queryFn: getTeamInfo,
  });

  console.log('Server Layout')
  console.log(result)

  return (
      <HydrationBoundary state={dehydrate(queryclient)}>
        {children}
      </HydrationBoundary>
  );
};

export default Layout;