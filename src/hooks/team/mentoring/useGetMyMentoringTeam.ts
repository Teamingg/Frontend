import { useQuery } from "@tanstack/react-query";

import MentoringTeam from "@/types/team/mentoring/mentoringTeam";
import getMyMentoringTeam from "@/service/api/mentoring/team/getMyMentoringTeam";

const useGetMyMentoringTeam = () => {
  const {
    data: mentoringTeam,
    error,
    isError,
    isFetching,
  } = useQuery<MentoringTeam[]>({
    queryKey: ["user", "team", "mentoring"],
    queryFn: () => getMyMentoringTeam(),
  });
  return {
    mentoringTeam,
    error,
    isError,
    isFetching,
  };
};

export default useGetMyMentoringTeam;
