import {instance} from "@/service/api/instance/axiosInstance";

export const getTeamInfoData = async (
    page_type: string,
    team_id: string
) => {
  const url = `/${page_type}/${page_type === "project" ? "team" : "teams"}/${team_id}`;
  console.log(url)
  const response = await instance.get(url);
  return response.data.data;
}