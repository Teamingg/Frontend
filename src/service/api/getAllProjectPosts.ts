import { instance } from "@/service/api/instance/axiosInstance";

import ProjectPosts from "@/types/post/project/projectPosts";

export interface getAllProjectPostsProps {
  nextCursor?: number;
}

export const getAllProjectPosts = async ({
  nextCursor,
}: getAllProjectPostsProps): Promise<ProjectPosts> => {
  const response = await instance.get(
    nextCursor ? `/project/posts?cursor=${nextCursor}` : "/project/posts"
  );
  return response.data.data;
};
