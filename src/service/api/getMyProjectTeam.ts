import { instance } from "@/service/api/instance/axiosInstance";

import ProjectTeam from "@/types/team/project/projectTeam";

const getMyProjectTeam = async (): Promise<ProjectTeam[]> => {
  const response = await instance.get("/user/project");

  return response.data.data;
};

export default getMyProjectTeam;
