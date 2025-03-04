import {client} from "@/service/api/instance/client";

export const getTeamPosts = async (
    type: string,
    id: string
) => {
  const { data } = await client.get(`/${type}/teams/${id}/posts`);
  console.log('getTeamPosts');
  console.log(data);
  return data.data;
}