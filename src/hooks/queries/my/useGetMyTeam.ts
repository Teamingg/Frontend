import { useQuery } from "@tanstack/react-query";

import TeamCategory from "@/types/teamCategory";
import TeamType from "@/types/team/teamType";

import myPageKeys from "./myPageKeys";
import getMyMentoringTeam from "@/service/api/my/getMyMentoringTeam";
import getMyProjectTeam from "@/service/api/my/getMyProjectTeam";

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
