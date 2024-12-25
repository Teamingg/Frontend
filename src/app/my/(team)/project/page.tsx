import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { queryclient } from "@/lib/getQueryClient";

import ProjectTeamList from "@/app/my/(team)/project/_components/ProjectTeamList";
import getMyProjectTeam from "@/service/api/getMyProjectTeam";

const MyProjectTeamPage = async () => {
  await queryclient.prefetchQuery({
    queryKey: ["user", "team", "project"],
    queryFn: () => getMyProjectTeam(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryclient)}>
      <ProjectTeamList />
    </HydrationBoundary>
  );
};

export default MyProjectTeamPage;
