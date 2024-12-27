import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { queryclient } from "@/lib/getQueryClient";

import getMyMentoringTeam from "@/service/api/getMyMentoringTeam";
import MentoringTeamList from "./_components/MentoringTeamList";

const MyMentoringTeamPage = async () => {
  await queryclient.prefetchQuery({
    queryKey: ["user", "team", "mentoring"],
    queryFn: () => getMyMentoringTeam(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryclient)}>
      <MentoringTeamList />
    </HydrationBoundary>
  );
};

export default MyMentoringTeamPage;
