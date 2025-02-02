import MentoringPosts from "@/types/post/mentoring/mentoringPosts";
import { client } from "../../instance/client/client";

export interface getAllMentoringPostsProps {
  nextCursor?: number;
}

export const getAllMentoringPosts = async ({
  nextCursor,
}: getAllMentoringPostsProps): Promise<MentoringPosts> => {
  const response = await client.get(
    nextCursor ? `/mentoring/posts?cursor=${nextCursor}` : "/mentoring/posts"
    // nextCursor
    //   ? `mock/mentoring/posts?cursor=${nextCursor}`
    //   : "mock/mentoring/posts"
  );

  return response.data.data;
};
