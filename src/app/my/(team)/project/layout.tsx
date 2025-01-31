import { queryclient } from "@/lib/getQueryClient";
import getMyMentoringTeam from "@/service/api/mentoring/team/getMyMentoringTeam";
import getMyProjectTeam from "@/service/api/project/team/getMyProjectTeam";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

const MyProjectTeamLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  await queryclient.prefetchQuery({
    queryKey: ["user", "team", "project"],
    queryFn: async () => await getMyProjectTeam(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryclient)}>
      {children}
    </HydrationBoundary>
  );
};

export default MyProjectTeamLayout;
