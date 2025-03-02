import { client } from "../instance/client";

// /mentoring/teams/{team_id}/status
// /project/team/{team_id}
export const getTeamInfo = async () => {
  // const [, type, id] = queryKey;
  const { data } = await client.get(`/project/team/19`);
  console.log('getTeamInfo');
  console.log(data);
  return data.data;
}