import {client} from "@/service/api/instance/client";

export const getUserInfoById = async (id: string) => {
  const { data } = await client.get(`/users/${id}`);
  return data.data;
}