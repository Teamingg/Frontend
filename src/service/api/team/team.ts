import { client } from "../instance/client";

// 테스트 용으로 데이터가 존재하는 엔드포인트로 호출했습니다.
// 추후 변경 예정
export const getTeamInfo = async () => {
  const { data } = await client.get(`/mentoring/teams/1`);
  console.log('getTeamInfo');
  console.log(data);
  return data.data;
}

export const getProjectInfo = async () => {
  const { data } = await client.get(`/project/teams/20`);
  console.log('getTeamInfo');
  console.log(data);
  return data.data;
}