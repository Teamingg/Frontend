import { client } from "../instance/client";

// /mentoring/teams/{team_id}/status
// /project/Team/{team_id}
export const getTeamInfo = async () => {
  // const [, type, id] = queryKey;
  const { data } = await client.get(`/mentoring/teams/1`);
  console.log('getTeamInfo');
  console.log(data);
  return data.data;
}

export const getProjectInfo = async () => {
  // const [, type, id] = queryKey;
  const { data } = await client.get(`/project/team/20`);
  console.log('getTeamInfo');
  console.log(data);
  return data.data;
}