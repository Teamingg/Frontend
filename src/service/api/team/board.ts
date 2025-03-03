import {client} from "@/service/api/instance/client";

export const getTeamPosts = async (
    type: string,
    id: string
) => {
  const { data } = await client.get(`/${type}/posts/${id}`);
  console.log('getTeamPosts');
  console.log(data);
  return data.data;
}