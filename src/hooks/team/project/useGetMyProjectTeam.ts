import { useQuery } from "@tanstack/react-query";

import ProjectTeam from "@/types/team/project/projectTeam";

import getMyProjectTeam from "@/service/api/project/team/getMyProjectTeam";

const useGetMyProjectTeam = () => {
  const {
    data: projectTeam,
    error,
    isError,
  } = useQuery<ProjectTeam[]>({
    queryKey: ["user", "team", "project"],
    queryFn: () => getMyProjectTeam(),
  });
  return {
    projectTeam,
    error,
    isError,
  };
};

export default useGetMyProjectTeam;
