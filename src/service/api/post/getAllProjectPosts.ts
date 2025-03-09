import ProjectPosts from "@/types/post/projectPosts";
import { client } from "../instance/client";
import {createServerInstance} from "@/service/api/instance/server";

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

export const getAllServerProjectPosts = async ({
                                           nextCursor,
                                         }: getAllProjectPostsProps): Promise<ProjectPosts> => {
  const server = await createServerInstance()
  const response = await server.get(
      nextCursor ? `/project/posts?cursor=${nextCursor}` : "/project/posts"
  );
  return response.data.data;
};