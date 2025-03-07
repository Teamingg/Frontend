import {client} from "@/service/api/instance/client";

export const getTeamMembers = async (
    type: string,
    id: string
) => {
  const { data } = await client.get(`/${type}/teams/${id}/status`);
  console.log('getTeamMembers');
  console.log(data);
  return data.data;
}