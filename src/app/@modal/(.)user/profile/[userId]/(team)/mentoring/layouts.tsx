import { queryclient } from "@/lib/getQueryClient";
import { client } from "@/service/api/instance/client";
import { getUserMentoringTeam } from "@/service/api/user";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

const UserProfileMentoringTeamLayout = async ({
  params,
  children,
}: {
  params: Promise<{ userId: string }>;
  children: React.ReactNode;
}) => {
  const { userId } = await params;

  await queryclient.prefetchQuery({
    queryKey: [userId, "team", "mentoring"],
    queryFn: async () => await getUserMentoringTeam(userId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryclient)}>
      {children}
    </HydrationBoundary>
  );
};

export default UserProfileMentoringTeamLayout;
