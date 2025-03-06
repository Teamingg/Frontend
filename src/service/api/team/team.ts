import { client } from "../instance/client";

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