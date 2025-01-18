import {instance} from "@/service/api/instance/axiosInstance";

export const getTeamMember = async (
    page_type: string | string[],
    team_id: string | string[],
) => {
  const isProject = page_type === "project";
  const basePath = isProject ? "team" : "teams";
  const endPath = isProject ? "member" : "status";

  const url = `/${page_type}/${basePath}/${team_id}/${endPath}`;
  const response = await instance.get(url);
  return response.data.data;
}