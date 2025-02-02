import { queryclient } from "@/lib/getQueryClient";
import getMyMentoringTeam from "@/service/api/mentoring/team/getMyMentoringTeam";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

const MyMentoringTeamLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  await queryclient.prefetchQuery({
    queryKey: ["user", "team", "mentoring"],
    queryFn: async () => await getMyMentoringTeam(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryclient)}>
      {children}
    </HydrationBoundary>
  );
};

export default MyMentoringTeamLayout;
