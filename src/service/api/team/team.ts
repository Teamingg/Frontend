import { client } from "../instance/client";
import { createServerInstance } from "../instance/server";

// 테스트 용으로 데이터가 존재하는 엔드포인트로 호출했습니다.
// 추후 변경 예정
export const getTeamInfo = async (id: number) => {
  const { data } = await client.get(`/mentoring/teams/${id}`);
  console.log('getTeamInfo');
  console.log(data);
  return data.data;
}

export const getProjectInfo = async (id: number) => {
  const { data } = await client.get(`/project/teams/${id}`);
  console.log('getTeamInfo');
  console.log(data);
  return data.data;
}

// project/teams/teamid/members
// 프로젝트 팀원을 조회한다.
// 탈퇴하거나 강퇴된 팀원들도 조회되며 이는 is_delete 또는 is_export 값이 true로 설정된다.
export const getProjectMembers = async (id: number) => {
  const server = await createServerInstance();
  const { data } = await server.get(`/project/teams/${id}/members`);
  console.log('getProjectMembers');
  console.log(data);
  return data.data;
}