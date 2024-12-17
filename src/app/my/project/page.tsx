import getMyProjectTeam from "@/service/api/getMyProjectTeam";
import ProjectTeamList from "@/app/my/project/_components/ProjectTeamList";
import { queryclient } from "@/lib/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

const ProjectPage = async () => {
  await queryclient.prefetchQuery({
    queryKey: ["user", "team", "project"],
    queryFn: getMyProjectTeam,
  });
  return (
    <HydrationBoundary state={dehydrate(queryclient)}>
      <ProjectTeamList />
    </HydrationBoundary>
  );
};

export default ProjectPage;
