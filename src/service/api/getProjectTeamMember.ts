import {instance} from "@/service/api/instance/axiosInstance";

export const getProjectTeamMember = async () => {
  const response = await instance.get("/project/team/1/member");
  return response.data.data;
}