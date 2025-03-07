import {client} from "@/service/api/instance/client";
import {createServerInstance} from "@/service/api/instance/server";
import {handleServerError} from "@/service/handleServerError";

export const getTeamMembers = async (
    type: string,
    id: string
) => {
  try {
    const { data } = await client.get(`/${type}/teams/${id}/status`);
    console.log('getTeamMembers 응답 데이터:', data);
    return data.data;
  } catch (error) {
    return handleServerError(error, "getTeamMembers 함수 오류");
  }
}

export const getServerTeamMembers = async (
  type: string,
  id: string
) => {
  try {
    const server = await createServerInstance();
    const { data } = await server.get(`/${type}/teams/${id}/status`);
    console.log('getServerTeamMembers 응답 데이터:', data);
    return data.data;
  } catch (error) {
    return handleServerError(error, "getTeamMembers 함수 오류");
  }
}