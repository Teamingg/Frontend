import { client } from "../instance/client";

type FetchType = "info" | "posts" | "member";

export const fetchTeamPageData = async <T>(
  page_type: string,
  team_id: string,
  type: FetchType
): Promise<T> => {
  const isProject = page_type === "project";
  const path = {
    info: {
      base: isProject ? "team" : "teams",
      end: "",
    },
    member: {
      base: isProject ? "team" : "teams",
      end: isProject ? "/member" : "/status",
    },
    posts: {
      base: isProject ? "posts" : "teams",
      end: isProject ? "" : "/posts",
    },
  };

  const url = `/${page_type}/${path[type].base}/${team_id}${path[type].end}`;
  const response = await client.get(url);
  return response.data.data as T;
};
