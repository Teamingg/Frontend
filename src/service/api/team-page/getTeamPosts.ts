import {instance} from "@/service/api/instance/axiosInstance";

export const getTeamPosts = async () => {
  const response = await instance.get("/project/posts/1");
  return response.data.data;
}