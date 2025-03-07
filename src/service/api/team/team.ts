import { client } from "../instance/client";
import { createServerInstance } from "../instance/server";
import {handleServerError} from "@/service/handleServerError";

// 팀 정보 조회 (멘토링)
export const getTeamInfo = async (id: string) => {
  try {
    const { data } = await client.get(`/mentoring/teams/${id}`);
    console.log("✅ [getTeamInfo] 응답 데이터:", data);
    return data.data;
  } catch (error) {
    return handleServerError(error, "getTeamInfo");
  }
};

// 프로젝트 정보 조회
export const getProjectInfo = async (id: string) => {
  try {
    const { data } = await client.get(`/project/teams/${id}`);
    console.log("✅ [getProjectInfo] 응답 데이터:", data);
    return data.data;
  } catch (error) {
    return handleServerError(error, "getProjectInfo");
  }
};

export const getServerProjectInfo = async (id: string) => {
  try {
    const server = await createServerInstance();
    const { data } = await server.get(`/project/teams/${id}`);
    console.log("✅ [getServerProjectInfo] 응답 데이터:", data);
    return data.data;
  } catch (error) {
    return handleServerError(error, "getServerProjectInfo");
  }
}

// 프로젝트 팀원 조회
export const getProjectMembers = async (id: string) => {
  try {
    const server = await createServerInstance();
    const { data } = await server.get(`/project/teams/${id}/members`);
    console.log("✅ [getProjectMembers] 응답 데이터:", data);
    return data.data;
  } catch (error) {
    return handleServerError(error, "getProjectMembers");
  }
};

export const getServerMentoringTeam = async (id: string) => {
  try {
    const server = await createServerInstance();
    const { data } = await server.get(`/mentoring/teams/${id}`);
    console.log("✅ [getServerMentoringTeam] 응답 데이터:", data);
    return data.data;
  } catch (error) {
    return handleServerError(error, "getTeamInfo");
  }
};