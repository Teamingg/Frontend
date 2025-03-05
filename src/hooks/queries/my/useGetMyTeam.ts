import { useQuery } from "@tanstack/react-query";

import getMyProjectTeam from "@/service/api/my/getMyProjectTeam";
import { getMyMentoringTeam } from "@/service/api/my";

import TeamCategory from "@/types/teamCategory";
import { TeamType } from "@/types/user/myTeamRes";

import myPageKeys from "./myPageKeys";

const useGetMyTeam = <T extends TeamCategory>(category: T) => {
  return useQuery<TeamType<T>[]>({
    queryKey: myPageKeys.team(category),
    queryFn: async () => {
      let response;

      if (category === "mentoring") {
        response = await getMyMentoringTeam();
      } else {
        response = await getMyProjectTeam();
      }

      return response as TeamType<T>[];
    },
  });
};

export default useGetMyTeam;
