import MentoringPosts from "@/types/post/mentoringPosts";
import { client } from "../instance/client";

export interface getAllMentoringPostsProps {
  nextCursor?: number;
}

export const getAllMentoringPosts = async ({
  nextCursor,
}: getAllMentoringPostsProps): Promise<MentoringPosts> => {
  const response = await client.get(
    nextCursor ? `/mentoring/posts?cursor=${nextCursor}` : "/mentoring/posts"
  );

  return response.data.data;
};