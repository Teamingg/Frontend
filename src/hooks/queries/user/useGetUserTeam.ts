import { useQuery } from "@tanstack/react-query";

import userKeys from "./userKeys";

import TeamCategory from "@/types/teamCategory";
import TeamType from "@/types/team/teamType";

import getUserMentoringTeam from "@/service/api/user/getUserMentoringTeam";
import getUserProjectTeam from "@/service/api/user/getUserProjectTeam";

interface useGetUserTeamArg<T> {
  userId: string;
  category: T;
}
const useGetUserTeam = <T extends TeamCategory>({
  userId,
  category,
}: useGetUserTeamArg<T>) => {
  return useQuery<TeamType<T>[]>({
    queryKey: userKeys.team(userId, category),
    queryFn: async () => {
      let response;

      if (category === "mentoring") {
        response = await getUserMentoringTeam(userId);
      } else {
        response = await getUserProjectTeam(userId);
      }

      return response as TeamType<T>[];
    },
  });
};

export default useGetUserTeam;
