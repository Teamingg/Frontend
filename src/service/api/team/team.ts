import { client } from "../instance/client";
import { createServerInstance } from "../instance/server";

// 공통 에러 핸들러 함수
const handleApiError = (error: any, functionName: string) => {
  console.error(`🚨 [${functionName}] API 요청 실패:`, error.response?.data || error.message);
  return null;
};

// 팀 정보 조회 (멘토링)
export const getTeamInfo = async (id: string) => {
  try {
    console.log('getTeamInfo id')
    console.log(id)
    const { data } = await client.get(`/mentoring/teams/${id}`);
    console.log("✅ [getTeamInfo] 응답 데이터:", data);
    return data.data;
  } catch (error) {
    return handleApiError(error, "getTeamInfo");
  }
};

// 프로젝트 정보 조회
export const getProjectInfo = async (id: string) => {
  try {
    console.log('getTeamInfo id')
    console.log(id)
    const { data } = await client.get(`/project/teams/${id}`);
    console.log("✅ [getProjectInfo] 응답 데이터:", data);
    return data.data;
  } catch (error) {
    return handleApiError(error, "getProjectInfo");
  }
};

// 프로젝트 팀원 조회
export const getProjectMembers = async (id: string) => {
  try {
    console.log('getTeamInfo id')
    console.log(id)
    const server = await createServerInstance();
    const { data } = await server.get(`/project/teams/${id}/members`);
    console.log("✅ [getProjectMembers] 응답 데이터:", data);
    return data.data;
  } catch (error) {
    return handleApiError(error, "getProjectMembers");
  }
};