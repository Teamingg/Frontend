import {instance} from "@/service/api/instance/axiosInstance";

export const getMentoringTeamPost = async () => {
  const response = await instance.get("/mentoring/teams/1/posts");
  return response.data.data;
}