import { client } from "./instance/client";

export const getTeamPageData = async ({
  queryKey,
}: {
  queryKey: [string, string, string];
}) => {
  const [, page_type, team_id] = queryKey;

  try {
    const response = await client.get(`/team/${page_type}/${team_id}?info=info`);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch team data:", error);
    throw new Error("Failed to fetch team data");
  }
};
