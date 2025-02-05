import ProjectPosts from "@/types/post/project/projectPosts";
import { client } from "../instance/client";

export interface getAllProjectPostsProps {
  nextCursor?: number;
}

export const getAllProjectPosts = async ({
  nextCursor,
}: getAllProjectPostsProps): Promise<ProjectPosts> => {
  const response = await client.get(
    nextCursor ? `/project/posts?cursor=${nextCursor}` : "/project/posts"
  );
  return response.data.data;
};
