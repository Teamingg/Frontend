import {instance} from "@/service/api/instance/axiosInstance";

export const getMentoringTeamMembers = async () => {
  const response = await instance.get("/mentoring/teams/1/status");
  return response.data.data;
}